import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/server";
import { fetchProducts } from "@/lib/data/products";
import { config } from "@/config";
import type { OrderItem } from "@/lib/supabase/types";

interface IncomingItem {
  slug: string;
  quantity: number;
}

function genOrderNumber() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ---- Boundary validation ----
    const name = String(body.customer_name || "").trim();
    const phone = String(body.customer_phone || "").trim();
    const email = body.customer_email ? String(body.customer_email).trim() : null;
    const address = body.address ? String(body.address).trim() : null;
    const city = body.city ? String(body.city).trim() : null;
    const state = body.state ? String(body.state).trim() : null;
    const pincode = body.pincode ? String(body.pincode).trim() : null;
    const paymentMethod = ["whatsapp", "razorpay", "cod"].includes(
      body.payment_method
    )
      ? body.payment_method
      : "whatsapp";
    const incoming: IncomingItem[] = Array.isArray(body.items) ? body.items : [];

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Naam zaroori hai" }, { status: 400 });
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Sahi phone number daalein" },
        { status: 400 }
      );
    }
    if (incoming.length === 0) {
      return NextResponse.json({ error: "Cart khaali hai" }, { status: 400 });
    }

    // ---- Prices ko server-side products se verify karna (tampering rokne ke liye) ----
    const products = await fetchProducts();
    const bySlug = new Map(products.map((p) => [p.slug, p]));

    const items: OrderItem[] = [];
    for (const it of incoming) {
      const product = bySlug.get(String(it.slug));
      const qty = Math.max(1, Math.min(99, Math.floor(Number(it.quantity) || 1)));
      if (!product) {
        return NextResponse.json(
          { error: `Product nahi mila: ${it.slug}` },
          { status: 400 }
        );
      }
      items.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.image,
      });
    }

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= config.freeShippingThreshold ? 0 : 49;
    const total = subtotal + shipping;

    const orderNumber = genOrderNumber();

    const orderRow = {
      order_number: orderNumber,
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      address,
      city,
      state,
      pincode,
      items,
      subtotal,
      shipping,
      total,
      payment_method: paymentMethod,
      payment_status:
        paymentMethod === "razorpay" && body.payment_status === "paid"
          ? "paid"
          : "pending",
      razorpay_order_id: body.razorpay_order_id || null,
      razorpay_payment_id: body.razorpay_payment_id || null,
      status: "new",
      notes: body.notes ? String(body.notes).slice(0, 500) : null,
    };

    // ---- Supabase me save (configure ho to) ----
    const admin = getAdminClient();
    if (admin) {
      const { error } = await admin.from("orders").insert(orderRow);
      if (error) {
        console.error("Order insert error:", error);
        // DB fail ho to bhi order number return karo (WhatsApp fallback)
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      subtotal,
      shipping,
      total,
    });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Order process nahi ho paya" },
      { status: 500 }
    );
  }
}
