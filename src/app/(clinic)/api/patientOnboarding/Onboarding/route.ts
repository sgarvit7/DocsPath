// Doctor API Route - route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users', details: error }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newUser = await prisma.user.create({
      data: {
        ...body,
        allergies: body.allergies || [],
        medications: body.medications || [],
        chronicDiseases: body.chronicDiseases || [],
        injuries: body.injuries || [],
        surgeries: body.surgeries || [],
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
  }
}