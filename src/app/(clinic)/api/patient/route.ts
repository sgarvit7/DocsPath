import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const patients = await prisma.patient.findMany()
    return NextResponse.json(patients)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error getting doctors from the DB" });
  }
}
