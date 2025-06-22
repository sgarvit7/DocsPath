import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const doctors = await req.json();

  if (!doctors?.data || !Array.isArray(doctors.data)) {
    return NextResponse.json(
      { error: "Invalid request: 'data' must be an array" },
      { status: 400 }
    );
  }

  try {
    const bulk = await prisma.doctor.createMany({
      data: doctors.data,
      skipDuplicates: true,
    });

    return NextResponse.json(bulk);
  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { error: "Error during bulk insert" },
      { status: 500 }
    );
  }
}
