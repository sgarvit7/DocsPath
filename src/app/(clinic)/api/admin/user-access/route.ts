// app/api/user-access/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserAccess } from '@/types/userAccess';



export async function GET() {
  try {
    const users = await prisma.userAccess.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body : UserAccess = await req.json();

    const user = await prisma.userAccess.create({
      data: body,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user', details: error },
      { status: 500 }
    );
  }
}
