import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust based on your setup
import { transformDoctorDBToDoctor } from "@/utils/unflattenDoctorDB";
import { Doctor } from "@/types/doctor";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string | null;

    if (!email) {
      const doctorDBList = await prisma.doctor.findMany();
      const doctors: Doctor[] = doctorDBList.map(transformDoctorDBToDoctor);
      return NextResponse.json({ doctors }, { status: 200 });
    }

    const doctorDB = await prisma.doctor.findUnique({
      where: { emailAddress: email },
    });

    if (!doctorDB) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
    }

    const doctor: Doctor = transformDoctorDBToDoctor(doctorDB);
    return NextResponse.json({ doctor }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/doctor:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
