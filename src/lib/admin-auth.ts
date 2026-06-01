import crypto from "crypto";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export const ADMIN_COOKIE = "admin_session";

// Password se ek deterministic token banate hain. Cookie me yahi store hota hai.
export function adminToken(): string | null {
  if (!env.adminPassword) return null;
  return crypto
    .createHash("sha256")
    .update(`crochet-admin:${env.adminPassword}`)
    .digest("hex");
}

export function verifyPassword(input: string): boolean {
  if (!env.adminPassword) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(env.adminPassword);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Server component / route me check karna ki admin logged in hai ya nahi.
export function isAdminAuthenticated(): boolean {
  const expected = adminToken();
  if (!expected) return false;
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
