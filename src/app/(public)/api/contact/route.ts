import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ use singleton
import { sendContactEmail } from "@/utils/email/sendContactEmail";

export async function POST(req: NextRequest) {
  try {
    console.log("API started");

    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (
      !name?.trim() ||
      !email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    console.log("DB write complete");

    try {
      await sendContactEmail({ name, email, phone, subject, message });
      console.log("Email sent");
    } catch (emailErr) {
      console.error("Email error", emailErr);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("API error ▶", err);
    return NextResponse.json(
      { error: "Internal Server Error from contact route" },
      { status: 500 }
    );
  }
}
