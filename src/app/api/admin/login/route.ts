import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminToken,
  verifyPassword,
} from "@/lib/admin-auth";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  if (!env.adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD set nahi hai. .env.local me daalein." },
      { status: 503 }
    );
  }

  const { password } = await request.json();
  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "Galat password" }, { status: 401 });
  }

  const token = adminToken();
  if (!token) {
    return NextResponse.json({ error: "Auth unavailable" }, { status: 503 });
  }

  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 ghante
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  cookies().delete(ADMIN_COOKIE);
  return NextResponse.json({ success: true });
}
