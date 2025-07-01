import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // or wherever your Prisma instance is

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = await params.id;

  try {
    const job = await prisma.jobDescription.findUnique({
      where: { id: jobId },
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
