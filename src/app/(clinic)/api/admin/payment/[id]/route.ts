// app/api/payment/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Payment } from '@/types/payment';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment', details: error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  try {
    const body : Payment = await req.json();

    const updated = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to update payment', details: error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const {id} = await params;
  try {
    await prisma.payment.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Payment deleted' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to delete payment', details: error },
      { status: 500 }
    );
  }
}
