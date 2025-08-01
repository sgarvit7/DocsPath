import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

// let otpStore: Record<string, string> = {}; // This must be same as in send-otp (better use DB/Redis)

// If you want shared state, move otpStore to a separate file and import it in both routes.

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    if (otpStore[email] && otpStore[email] === otp) {
      delete otpStore[email]; // clear OTP after verification
      return NextResponse.json({ success: true, message: "OTP verified successfully!" });
    }

    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
