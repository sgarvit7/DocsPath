// app/api/sales/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendSalesCardEmails } from '@/utils/email/salesCardEmail';

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const body = await req.json();
     const { fullName, email, phone, company, message } = body;

    if (!email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newSalesCard = await prisma.salesCard.create({
  data: {
     fullName, email, phone, company, message
  },
});


    await sendSalesCardEmails(newSalesCard);

    return NextResponse.json(newSalesCard, { status: 201 });
  } catch (error) {
    console.error('Error creating sales card:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}