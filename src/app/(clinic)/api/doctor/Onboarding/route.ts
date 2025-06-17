// Doctor API Route - route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "../../../../../../cloudinary/uploadImageToCloudinary";
import { Doctor, DoctorDB } from "@/types/doctor";

// Use /tmp/uploads on Vercel, and local folder in development
const UPLOAD_DIR =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "uploads")
    : path.join(process.cwd(), "/tmp/uploads");

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch (error) {
    console.log(error);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Helper function to save a file from the form data, upload to Cloudinary, and delete local file
async function processFile(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Save file locally first
  await fs.writeFile(filePath, fileBuffer);

  // Upload to Cloudinary
  const cloudinaryUrl = await uploadFileToCloudinary(filePath);

  // Delete local file after successful upload
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error deleting local file:", error);
  }

  if (!cloudinaryUrl) {
    throw new Error("Failed to upload file to Cloudinary");
  }

  return cloudinaryUrl;
}

// Interface for document information
interface DocumentInfo {
  profilePhotoUrl?: string;
  governmentIdUrl?: string;
  medicalDegreeUrl?: string;
  registrationCertUrl?: string;
  experienceCertUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Doctor Onboarding Data Received ===");

    // Ensure upload directory exists
    await ensureUploadDir();

    // Parse the FormData
    const formData = await request.formData();

    // Extract basic form data
    const doctorData = {
      fullName: (formData.get("fullName") as string) || "",
      emailAddress: (formData.get("emailAddress") as string) || "",
      phoneNumber: (formData.get("phoneNumber") as string) || "",
      dateOfBirth: (formData.get("dateOfBirth") as string) || "",
      gender: (formData.get("gender") as string) || "",
      medicalLicenseNumber:
        (formData.get("medicalLicenseNumber") as string) || "",
      specialization: (formData.get("specialization") as string) || "",
      yearsOfExperience: (formData.get("yearsOfExperience") as string) || "",
      associatedClinicHospitalName:
        (formData.get("associatedClinicHospitalName") as string) || "",
      consultationType: (formData.get("consultationType") as string) || "",
      availableConsultationHours:
        (formData.get("availableConsultationHours") as string) || "",
      preferredModeOfConsultation:
        (formData.get("preferredModeOfConsultation") as string) || "",
      languageSpoken: (formData.get("languageSpoken") as string) || "",
      additionalInformation:
        (formData.get("additionalInformation") as string) || "",
      emergencyContactDetails:
        (formData.get("emergencyContactDetails") as string) || "",
      personalBio: (formData.get("personalBio") as string) || "",
    };

    // Handle file uploads and store metadata
    const documents: DocumentInfo = {};

    // Process profile photo
    const profilePhoto = formData.get("profilePhoto") as File | null;
    if (profilePhoto && profilePhoto instanceof File && profilePhoto.size > 0) {
      console.log("Processing profile photo...");
      const cloudinaryUrl = await processFile(profilePhoto);
      documents.profilePhotoUrl = cloudinaryUrl;
    }

    // Process government issued ID
    const governmentId = formData.get("governmentIssuedId") as File | null;
    if (governmentId && governmentId instanceof File && governmentId.size > 0) {
      console.log("Processing government ID...");
      const cloudinaryUrl = await processFile(governmentId);
      documents.governmentIdUrl = cloudinaryUrl;
    }

    // Process medical degree certificate
    const medicalDegree = formData.get(
      "medicalDegreeCertificate"
    ) as File | null;
    if (
      medicalDegree &&
      medicalDegree instanceof File &&
      medicalDegree.size > 0
    ) {
      console.log("Processing medical degree certificate...");
      const cloudinaryUrl = await processFile(medicalDegree);
      documents.medicalDegreeUrl = cloudinaryUrl;
    }

    // Process medical council registration certificate
    const registrationCert = formData.get(
      "medicalCouncilRegistrationCertificate"
    ) as File | null;
    if (
      registrationCert &&
      registrationCert instanceof File &&
      registrationCert.size > 0
    ) {
      console.log("Processing medical council registration certificate...");
      const cloudinaryUrl = await processFile(registrationCert);
      documents.registrationCertUrl = cloudinaryUrl;
    }

    // Process experience certificate
    const experienceCert = formData.get("experienceCertificate") as File | null;
    if (
      experienceCert &&
      experienceCert instanceof File &&
      experienceCert.size > 0
    ) {
      console.log("Processing experience certificate...");
      const cloudinaryUrl = await processFile(experienceCert);
      documents.experienceCertUrl = cloudinaryUrl;
    }

    // Create the structured data object for logging
    const doctorOnboardingData = {
      personalInfo: {
        ...doctorData,
        profilePhotoUrl: documents.profilePhotoUrl,
      },
      verificationDocuments: {
        governmentIdUrl: documents.governmentIdUrl,
        medicalDegreeUrl: documents.medicalDegreeUrl,
        registrationCertUrl: documents.registrationCertUrl,
        experienceCertUrl: documents.experienceCertUrl,
      },
      uploadedFiles: {
        profilePhoto: documents.profilePhotoUrl
          ? "Uploaded successfully"
          : "Not provided",
        governmentId: documents.governmentIdUrl
          ? "Uploaded successfully"
          : "Not provided",
        medicalDegree: documents.medicalDegreeUrl
          ? "Uploaded successfully"
          : "Not provided",
        registrationCert: documents.registrationCertUrl
          ? "Uploaded successfully"
          : "Not provided",
        experienceCert: documents.experienceCertUrl
          ? "Uploaded successfully"
          : "Not provided",
      },
    };

    // Print the complete data object
    // console.log('Doctor Onboarding Data with Cloudinary URLs:');
    // console.log(JSON.stringify(doctorOnboardingData, null, 2));

    // Save to database using Prisma
    const savedDoctor = await prisma.doctor.create({
      data: {
        // Personal Information
        fullName: doctorData.fullName,
        emailAddress: doctorData.emailAddress,
        phoneNumber: doctorData.phoneNumber,
        dateOfBirth: doctorData.dateOfBirth,
        gender: doctorData.gender,
        profilePhoto: documents.profilePhotoUrl, // Store Cloudinary URL

        // Professional Details
        medicalLicenseNumber: doctorData.medicalLicenseNumber,
        specialization: doctorData.specialization,
        yearsOfExperience: doctorData.yearsOfExperience,
        associatedClinicHospitalName: doctorData.associatedClinicHospitalName,
        consultationType: doctorData.consultationType,

        // Verification Documents - Store Cloudinary URLs
        governmentIssuedId: documents.governmentIdUrl,
        medicalDegreeCertificate: documents.medicalDegreeUrl,
        medicalCouncilRegistrationCertificate: documents.registrationCertUrl,
        experienceCertificate: documents.experienceCertUrl,

        // Work Schedule Preferences
        availableConsultationHours: doctorData.availableConsultationHours,
        preferredModeOfConsultation: doctorData.preferredModeOfConsultation,
        languageSpoken: doctorData.languageSpoken,
        additionalInformation: doctorData.additionalInformation,
        emergencyContactDetails: doctorData.emergencyContactDetails,
        personalBio: doctorData.personalBio,
      },
    });

    console.log("Doctor saved to database with ID:", savedDoctor.id);

    // Return success response with the structured data
    return NextResponse.json(
      {
        success: true,
        message:
          "Doctor onboarding data received, files uploaded to Cloudinary, and saved successfully",
        data: doctorOnboardingData,
        doctorId: savedDoctor.id,
        uploadedFiles: {
          profilePhoto: documents.profilePhotoUrl,
          governmentId: documents.governmentIdUrl,
          medicalDegree: documents.medicalDegreeUrl,
          registrationCert: documents.registrationCertUrl,
          experienceCert: documents.experienceCertUrl,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing doctor onboarding data:", error);

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      // Check for unique constraint violation (duplicate email)
      if (error.message.includes("Unique constraint failed")) {
        return NextResponse.json(
          {
            success: false,
            message: "A doctor with this email address already exists",
            error: "DUPLICATE_EMAIL",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error processing onboarding data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}



const formatDoctorDetails = (data: DoctorDB): Doctor => ({
  id: data.id,
  personalInfo: {
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    phoneNumber: data.phoneNumber,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    profilePhoto: data.profilePhoto ?? undefined,
  },
  professionalDetails: {
    medicalLicenseNumber: data.medicalLicenseNumber,
    specialization: data.specialization,
    yearsOfExperience: data.yearsOfExperience,
    associatedClinicHospitalName: data.associatedClinicHospitalName,
    consultationType: data.consultationType,
  },
  verificationDocument: {
    governmentIssuedId: data.governmentIssuedId ?? undefined,
    medicalDegreeCertificate: data.medicalDegreeCertificate ?? undefined,
    medicalCouncilRegistrationCertificate:
      data.medicalCouncilRegistrationCertificate ?? undefined,
    experienceCertificate: data.experienceCertificate ?? undefined,
  },
  workSchedulePreferences: {
    availableConsultationHours: data.availableConsultationHours,
    preferredModeOfConsultation: data.preferredModeOfConsultation,
    languageSpoken: data.languageSpoken,
    additionalInformation: data.additionalInformation ?? undefined,
    emergencyContactDetails: data.emergencyContactDetails,
    personalBio: data.personalBio ?? undefined,
  },
  createdAt: data.createdAt ?? undefined,
  updatedAt: data.updatedAt ?? undefined,
});

export async function GET() {
  try {
    const data = await prisma.doctor.findMany();
    if (data.length) {
      const doctors = data.map((item) => formatDoctorDetails(item));
      return NextResponse.json(doctors);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error getting doctors from the DB" });
  }
}
