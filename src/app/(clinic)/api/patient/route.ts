import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { patient } from "@/types/patient";

export async function GET(request: NextRequest) {
  try {
    const patients : patient[] = await prisma.patient.findMany()
    return NextResponse.json(patients)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error getting doctors from the DB" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
        const patientData : patient[] = await prisma.patient.findMany();
      return NextResponse.json({patients : patientData}, { status: 200 });
    }

    const patientData = await prisma.patient.findUnique({
        where: { email : email }
    });

    if (!patientData) {
      return NextResponse.json({ message: 'Patients not found' }, { status: 404 });
    }

    return NextResponse.json(patientData, { status: 200 });
  } catch (error) {
    console.error('Error in /api/doctor:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

