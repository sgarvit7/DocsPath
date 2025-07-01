import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { JobDescription } from "@/types/jobs"; // Assuming this is your interface

export async function GET() {
  try {
    const rawJobs = await prisma.jobDescription.findMany();

    // Convert Prisma Date objects to ISO strings to match JobDescription interface
    const jobs: JobDescription[] = rawJobs.map((job) => ({
      ...job,
      applicationDeadline: job.applicationDeadline
        ? job.applicationDeadline.toISOString()
        : null,
      postedDate: job.postedDate
        ? job.postedDate.toISOString()
        : null,
    }));

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs from the database" },
      { status: 500 }
    );
  }
}

// POST: Return all jobs or a single job if ID is provided
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const jobs = Array.isArray(body) ? body : [body];

    // Validate minimal required fields
    for (const job of jobs) {
      const required = ["id", "title", "department", "type", "location", "description"];
      for (const key of required) {
        if (!job[key]) {
          return NextResponse.json(
            { message: `Missing required field "${key}"` },
            { status: 400 }
          );
        }
      }
    }

    // Prepare data for Prisma
    const jobData = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description,

      salary: job.salary ?? null,
      responsibilities: job.responsibilities ?? [],
      requirements: job.requirements ?? [],
      benefits: job.benefits ?? [],
      howToApply: job.howToApply ?? [],
      emoluments: job.emoluments ?? [],
      whyJoin: job.whyJoin ?? [],
      applicationDeadline: job.applicationDeadline
        ? new Date(job.applicationDeadline)
        : null,
      postedDate: job.postedDate ? new Date(job.postedDate) : undefined, // use default if not given
      category: job.category ?? null,
      jobType: job.jobType ?? null,
    }));

    if (jobData.length === 1) {
      // Insert single job
      const created = await prisma.jobDescription.create({
        data: jobData[0],
      });
      return NextResponse.json({ message: "Job created", job: created }, { status: 201 });
    } else {
      // Bulk insert jobs
      await prisma.jobDescription.createMany({
        data: jobData,
        skipDuplicates: true,
      });
      return NextResponse.json({ message: "Jobs uploaded", count: jobData.length }, { status: 201 });
    }
  } catch (error) {
    console.error("Error uploading job(s):", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

