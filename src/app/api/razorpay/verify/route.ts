import { NextResponse } from "next/server";
import crypto from "crypto";
import { env, isRazorpayConfigured } from "@/lib/env";

export async function POST(request: Request) {
  if (!isRazorpayConfigured) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const expected = crypto
      .createHmac("sha256", env.razorpayKeySecret!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Timing-safe compare
    const valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(razorpay_signature)
      );

    if (!valid) {
      return NextResponse.json(
        { verified: false, error: "Signature mismatch" },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    return NextResponse.json({ error: "Verify failed" }, { status: 500 });
  }
}
