import { NextResponse } from 'next/server';
import axios from 'axios';

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;

export async function POST(req: Request) {
  try {
    const { phoneNumber, otp } = await req.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 });
    }

    const fullPhoneNumber = `91${phoneNumber}`;

    // Verify OTP using MSG91 API
    const response = await axios.get(
      `https://api.msg91.com/api/v5/otp/verify?mobile=${fullPhoneNumber}&otp=${otp}`,
      {
        headers: {
          'authkey': MSG91_AUTH_KEY,
        },
      }
    );

    if (response.data.type === 'success') {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error || error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
