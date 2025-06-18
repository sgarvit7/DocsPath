import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Fetch admin by email from your DB
    const admin = await prisma.admin.findFirst({ where: { email } });

    return Response.json({ success: true, admin });
  } catch (error) {
    console.error("Error in admin POST handler:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


