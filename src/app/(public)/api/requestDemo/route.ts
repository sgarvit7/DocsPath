import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendRequestDemoEmails } from "@/utils/email/sendRequestDemoEmail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, org, role, notes } = body;

    // Basic validation
    if (!fullName || !email || !phone || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to database
    const newRequest = await prisma.requestDemo.create({
      data: {
        fullName,
        email,
        phone,
        org,
        role,
        notes,
      },
    });

    // Send emails
    await sendRequestDemoEmails(newRequest);
  
    console.log(NextResponse.json(newRequest));
    return NextResponse.json(newRequest, { status: 201 });
    
  } catch (error) {
    console.error("❌ Error creating request demo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
