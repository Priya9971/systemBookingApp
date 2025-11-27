import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ await once
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ authenticated: false });
    }

    await dbConnect();
    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json({ authenticated: false, error: "User not found" });
    }

    return NextResponse.json({ authenticated: true, user });


  } catch (err) {
    console.error("auth/me error:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
