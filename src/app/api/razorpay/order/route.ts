import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { isRazorpayConfigured } from "@/lib/env";
import { computeOrder } from "@/lib/order";

export async function POST(request: Request) {
  if (!isRazorpayConfigured) {
    return NextResponse.json(
      { error: "Razorpay configured nahi hai. WhatsApp order use karein." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Amount client se nahi, server-side products se compute hota hai
    const computed = await computeOrder(body.items);
    if ("error" in computed) {
      return NextResponse.json({ error: computed.error }, { status: 400 });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return NextResponse.json(
        { error: "Payment gateway unavailable" },
        { status: 503 }
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(computed.total * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { error: "Order create nahi ho paya" },
      { status: 500 }
    );
  }
}
