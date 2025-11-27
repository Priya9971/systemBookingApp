import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
  try {
    const body = await req.json();
    let { phone } = body || {};

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
        { status: 400 }
      );
    }

    // Ensure E.164 format (example: +91xxxxxxxxxx for India)
    if (!phone.startsWith("+")) {
      phone = "+91" + phone; // 👈 auto prepend India code (adjust if needed)
    }

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: phone, channel: "sms" });

    return new Response(
      JSON.stringify({
        success: true,
        status: verification.status,
        to: verification.to,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Twilio Verify error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to send OTP" }),
      { status: 500 }
    );
  }
}
