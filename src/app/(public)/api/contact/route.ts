import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { sendContactEmail } from "@/utils/email/sendContactEmail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    /* ------------------ basic validation ---------------- */
    const { name, email, phone, subject, message } = body as {
      name:    string;
      email:   string;
      phone:   string;
      subject: string;
      message: string;
    };

    if (
      !name?.trim() ||
      !email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    /* ------------------ write to DB --------------------- */
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
console.log("writting to db")
    await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact API error ▶", err);
    return NextResponse.json(
      { error: "Internal Server Error from contact route" },
      { status: 500 }
    );
  }
}