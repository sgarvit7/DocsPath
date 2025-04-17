import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const { phone } = await req.json(); // +919876543210

  try {
    const verification = await client.verify.v2
      .services(verifySid) // This tells Twilio you are using the Verify v2 API and specifies your Verify Service ID (verifySid) — a unique identifier for your OTP service.
      .verifications.create({
        to: phone,
        channel: 'sms',
      }); // This method tells Twilio to send an OTP to the given phone using the SMS channel. You could also use 'call' or 'email' if needed, but 'sms' is most common for OTP.

    return NextResponse.json({ status: verification.status }); // "status": "pending" --> means successful.
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
