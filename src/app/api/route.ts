import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true },
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const user = await prisma.user.create({
      data: { name, email },
    });
    console.log(user)
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}