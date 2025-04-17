import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: phone,
        code,
      }); // This checks the OTP code the user entered against the one Twilio sent to the specified phone number.

    return NextResponse.json({ status: verificationCheck.status }); // If the OTP is correct, Twilio returns a status: approved.
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
