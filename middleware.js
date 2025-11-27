import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("session")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
