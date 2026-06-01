import Razorpay from "razorpay";
import { env, isRazorpayConfigured } from "@/lib/env";

// Server-side Razorpay instance. Keys na hone par null.
export function getRazorpay() {
  if (!isRazorpayConfigured) return null;
  return new Razorpay({
    key_id: env.razorpayKeyId!,
    key_secret: env.razorpayKeySecret!,
  });
}
