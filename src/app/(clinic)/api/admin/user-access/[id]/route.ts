// app/api/user-access/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserAccess } from '@/types/userAccess';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;
    const user = await prisma.userAccess.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user', details: error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body : UserAccess = await req.json();

    const updatedUser = await prisma.userAccess.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Prisma: Record not found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to update user', details: error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  try {
    await prisma.userAccess.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to delete user', details: error },
      { status: 500 }
    );
  }
}
