import { NextRequest, NextResponse } from "next/server";

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "YOUR_MSG91_AUTH_KEY";
// const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || "YOUR_TEMPLATE_ID"; // Optional, if using custom template

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authkey": MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        mobile: phoneNumber,
        otp_length: 6,
        otp_expiry: 5,
        // template_id: MSG91_TEMPLATE_ID, // Optional
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send OTP", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      data,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
