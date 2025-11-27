import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import twilio from "twilio";

// Normalize phone to E.164
function formatPhone(phone) {
  if (!phone.startsWith("+")) {
    return `+91${phone}`; // 👈 default India, change if needed
  }
  return phone;
}

export async function POST(req) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone and code required" },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhone(phone);

    // ✅ Verify OTP with Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: formattedPhone, code });

    if (check.status !== "approved") {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // ✅ Ensure DB connection
    await dbConnect();

    // ✅ Check if user exists
    let user = await User.findOne({ phone: formattedPhone });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await User.create({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        maritalStatus: "",
        anniversaryDate: "",
        city: "",
        state: "",
        phone: formattedPhone,
        email: "",
      });
    }

    // ✅ Create JWT with correct field
    const token = signToken({ id: user._id, phone: user.mobileNumber });

    // ✅ Store session in HttpOnly cookie
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: isNewUser
        ? "User created & login successful"
        : "Login successful",
      user,
    });
  } catch (err) {
    console.error("verify-otp error:", err.message, err.stack);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
