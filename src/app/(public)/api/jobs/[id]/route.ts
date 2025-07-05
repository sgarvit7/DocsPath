import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req : NextRequest, {params} : { params: Promise<{id: string}>}) {
  console.log((await params).id);
  // console.log(req);
  try {

    const id = (await params).id;
    const job = await prisma.jobDescription.findUnique({
      where: { id : id},
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



