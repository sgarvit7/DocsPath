import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Doctor, DoctorDB } from '@/types/doctor';

function expandDoctor(flat: DoctorDB): Doctor {
  return {
    id: flat.id,
    personalInfo: {
      fullName: flat.fullName,
      emailAddress: flat.emailAddress,
      phoneNumber: flat.phoneNumber,
      dateOfBirth: flat.dateOfBirth,
      gender: flat.gender,
      profilePhoto: flat.profilePhoto || null,
    },
    professionalDetails: {
      medicalLicenseNumber: flat.medicalLicenseNumber,
      specialization: flat.specialization,
      yearsOfExperience: flat.yearsOfExperience,
      associatedClinicHospitalName: flat.associatedClinicHospitalName,
      consultationType: flat.consultationType,
    },
    verificationDocument: {
      governmentIssuedId: flat.governmentIssuedId,
      medicalDegreeCertificate: flat.medicalDegreeCertificate,
      medicalCouncilRegistrationCertificate: flat.medicalCouncilRegistrationCertificate,
      experienceCertificate: flat.experienceCertificate,
    },
    workSchedulePreferences: {
      availableConsultationHours: flat.availableConsultationHours,
      preferredModeOfConsultation: flat.preferredModeOfConsultation,
      languageSpoken: flat.languageSpoken,
      additionalInformation: flat.additionalInformation,
      emergencyContactDetails: flat.emergencyContactDetails,
      personalBio: flat.personalBio,
    },
    createdAt: flat.createdAt,
    updatedAt: flat.updatedAt,
  };
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const flatDoctor = await prisma.doctor.findUnique({
      where: { emailAddress: email },
    });

    if (!flatDoctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const doctor = expandDoctor(flatDoctor);
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("GET /api/doctor error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
