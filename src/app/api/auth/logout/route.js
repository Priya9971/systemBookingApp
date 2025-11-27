import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Clear the cookie by setting it to empty with an expired date
    response.cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // expire immediately
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
