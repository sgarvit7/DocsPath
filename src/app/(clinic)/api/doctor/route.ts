import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transformDoctorDBToDoctor } from '@/utils/unflattenDoctorDB'; // adjust path if needed
import { Doctor } from '@/types/doctor'; // optional if you want to annotate type

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string | undefined = body.email;

    if (!email) {
      const doctorDBList = await prisma.doctor.findMany();
      const doctors: Doctor[] = doctorDBList.map(transformDoctorDBToDoctor);

      return NextResponse.json({ doctors }, { status: 200 });
    }

    const doctorDB = await prisma.doctor.findUnique({
      where: { emailAddress: email },
    });

    if (!doctorDB) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
    }

    const doctor: Doctor = transformDoctorDBToDoctor(doctorDB);

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/doctor:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
