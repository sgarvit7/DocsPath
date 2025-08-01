import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "../../../../../../cloudinary/uploadImageToCloudinary";

const UPLOAD_DIR =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "uploads")
    : path.join(process.cwd(), "/tmp/uploads");

async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

async function processFile(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await fs.writeFile(filePath, fileBuffer);
  const cloudinaryUrl = await uploadFileToCloudinary(filePath);
  await fs.unlink(filePath).catch((err) =>
    console.error("Failed to delete file:", err)
  );
  return cloudinaryUrl||" ";
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir();
    const formData = await request.formData();

    // Extract basic fields
    const selfData = {
      fullName: formData.get("fullName") as string,
      emailAddress: formData.get("emailAddress") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : null,
      gender: formData.get("gender") as string,
      clinicName: formData.get("clinicName") as string,
      clinicType: formData.get("clinicType") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      establishmentYear: formData.get("establishmentYear") as string,
      address: (formData.get("address") as string) || null,
      medicalLicenseNumber: formData.get("medicalLicenseNumber") as string,
      specialization: formData.get("specialization") as string,
      yearsOfExperience: parseInt(formData.get("yearsOfExperience") as string),
      associatedClinicHospitalName: formData.get(
        "associatedClinicHospitalName"
      ) as string,
      consultationType: formData.get("consultationType") as string,
      availableConsultationHours: formData.get(
        "availableConsultationHours"
      ) as string,
      preferredModeOfConsultation: formData.get(
        "preferredModeOfConsultation"
      ) as string,
      languageSpoken: formData.get("languageSpoken") as string,
      additionalInformation: (formData.get("additionalInformation") as string) || null,
      emergencyContactDetails: formData.get("emergencyContactDetails") as string,
      personalBio: (formData.get("personalBio") as string) || null,
    };

    const documents: Record<string, string | null> = {
      profilePhoto: null,
      governmentIdPath: null,
      registrationCertificatePath: null,
      accreditationPath: null,
      medicalDegreeCertificate: null,
      medicalCouncilRegistrationCertificate: null,
      experienceCertificate: null,
    };

    const fileFields = [
      { name: "profilePhoto", key: "profilePhoto" },
      { name: "governmentId", key: "governmentIdPath" },
      { name: "registrationCertificate", key: "registrationCertificatePath" },
      { name: "accreditation", key: "accreditationPath" },
      { name: "medicalDegreeCertificate", key: "medicalDegreeCertificate" },
      { name: "medicalCouncilRegistrationCertificate", key: "medicalCouncilRegistrationCertificate" },
      { name: "experienceCertificate", key: "experienceCertificate" },
    ];

    for (const { name, key } of fileFields) {
      const file = formData.get(name) as File | null;
      if (file && file instanceof File && file.size > 0) {
        const cloudinaryUrl = await processFile(file);
        documents[key] = cloudinaryUrl;
      }
    }

    const newSelf = await prisma.self.create({
      data: {
        ...selfData,
        profilePhoto: documents.profilePhoto,
        governmentIdPath: documents.governmentIdPath,
        registrationCertificatePath: documents.registrationCertificatePath,
        accreditationPath: documents.accreditationPath,
        medicalDegreeCertificate: documents.medicalDegreeCertificate,
        medicalCouncilRegistrationCertificate:
          documents.medicalCouncilRegistrationCertificate,
        experienceCertificate: documents.experienceCertificate,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Self onboarding completed successfully",
      selfId: newSelf.id,
    });
  } catch (error) {
    console.error("Error in self-onboarding route:", error);
    return NextResponse.json(
      { success: false, message: "Error during onboarding", error },
      { status: 500 }
    );
  }
}
