// lib/cookies.js
import { serialize } from "cookie";

const COOKIE_NAME = "session";

export function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  res.setHeader("Set-Cookie", serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }));
}

export function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  }));
}
