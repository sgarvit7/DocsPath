import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Doctor, DoctorDB } from '@/types/doctor';

function unflattenDoctor(flat: DoctorDB): Doctor {
  return {
    id: flat.id,
    personalInfo: {
      fullName: flat.fullName,
      emailAddress: flat.emailAddress,
      phoneNumber: flat.phoneNumber,
      dateOfBirth: flat.dateOfBirth,
      gender: flat.gender,
      profilePhoto: flat.profilePhoto ?? undefined,
    },
    professionalDetails: {
      medicalLicenseNumber: flat.medicalLicenseNumber,
      specialization: flat.specialization,
      yearsOfExperience: flat.yearsOfExperience,
      associatedClinicHospitalName: flat.associatedClinicHospitalName,
      consultationType: flat.consultationType,
    },
    verificationDocument: {
      governmentIssuedId: flat.governmentIssuedId ?? undefined,
      medicalDegreeCertificate: flat.medicalDegreeCertificate ?? undefined,
      medicalCouncilRegistrationCertificate: flat.medicalCouncilRegistrationCertificate ?? undefined,
      experienceCertificate: flat.experienceCertificate ?? undefined,
    },
    workSchedulePreferences: {
      availableConsultationHours: flat.availableConsultationHours,
      preferredModeOfConsultation: flat.preferredModeOfConsultation,
      languageSpoken: flat.languageSpoken,
      additionalInformation: flat.additionalInformation ?? undefined,
      emergencyContactDetails: flat.emergencyContactDetails,
      personalBio: flat.personalBio ?? undefined,
    },
    createdAt: flat.createdAt,
    updatedAt: flat.updatedAt,
  };
}



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      const doctors = await prisma.doctor.findMany();
      return NextResponse.json(doctors, { status: 200 });
    }

    const doctor = await prisma.doctor.findFirst({
      where: {
        emailAddress: email,
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    const flattened = unflattenDoctor(doctor as DoctorDB);
    return NextResponse.json(flattened, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const doctors = await prisma.doctor.findMany();

    if (!doctors) {
      return NextResponse.json({ error: 'Doctors not found' }, { status: 404 });
    }

    const flattened = doctors.map((doctor) => unflattenDoctor(doctor as DoctorDB));
    return NextResponse.json(flattened, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}