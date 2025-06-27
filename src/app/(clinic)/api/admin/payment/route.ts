// app/api/payment/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { Payment } from '@/types/payment';

export async function GET() {
  try {
    const payments = await prisma.payment.findMany();
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments', details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body : Payment = await req.json();

    const payment = await prisma.payment.create({ data: body });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment', details: error },
      { status: 500 }
    );
  }
}
