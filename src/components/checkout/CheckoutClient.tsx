"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { config, whatsappLink } from "@/config";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: (resp: unknown) => void) => void;
    };
  }
}

const razorpayAvailable = Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

interface Form {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [method, setMethod] = useState<"razorpay" | "whatsapp">(
    razorpayAvailable ? "razorpay" : "whatsapp"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ orderNumber: string } | null>(null);

  const shipping = subtotal >= config.freeShippingThreshold ? 0 : subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping;

  function update(key: keyof Form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Apna naam daalein";
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim()))
      return "Sahi phone number daalein";
    if (items.length === 0) return "Cart khaali hai";
    return null;
  }

  function buildWhatsappMessage(orderNumber: string) {
    const lines = items
      .map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
      .join("\n");
    return `Hi ${config.brandName}! 🧶\n\nOrder #${orderNumber}\n\n${lines}\n\nSubtotal: ${formatPrice(
      subtotal
    )}\nShipping: ${shipping === 0 ? "FREE" : formatPrice(shipping)}\nTotal: ${formatPrice(
      total
    )}\n\nNaam: ${form.name}\nPhone: ${form.phone}${
      form.address ? `\nPata: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}` : ""
    }${form.notes ? `\nNote: ${form.notes}` : ""}`;
  }

  async function saveOrder(extra: Record<string, unknown> = {}) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        pincode: form.pincode || null,
        notes: form.notes || null,
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        payment_method: method,
        ...extra,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Order save nahi hua");
    return data as { orderNumber: string };
  }

  async function handleWhatsappOrder() {
    const data = await saveOrder({ payment_method: "whatsapp" });
    const msg = buildWhatsappMessage(data.orderNumber);
    clearCart();
    setDone({ orderNumber: data.orderNumber });
    window.open(whatsappLink(msg), "_blank");
  }

  async function handleRazorpayOrder() {
    const ok = await loadRazorpayScript();
    if (!ok || !window.Razorpay) {
      throw new Error("Payment gateway load nahi hua. WhatsApp se try karein.");
    }

    // Server-side amount compute
    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
      }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.error || "Payment shuru nahi hua");

    await new Promise<void>((resolve, reject) => {
      const rzp = new window.Razorpay!({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: config.brandName,
        description: "Handmade crochet order",
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#C06B4E" },
        handler: async (resp: unknown) => {
          try {
            const r = resp as {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            };
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(r),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.verified) throw new Error("Payment verify nahi hua");

            const saved = await saveOrder({
              payment_method: "razorpay",
              payment_status: "paid",
              razorpay_order_id: r.razorpay_order_id,
              razorpay_payment_id: r.razorpay_payment_id,
            });
            clearCart();
            setDone({ orderNumber: saved.orderNumber });
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancel ho gaya")),
        },
      });
      rzp.open();
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      if (method === "razorpay" && razorpayAvailable) {
        await handleRazorpayOrder();
      } else {
        await handleWhatsappOrder();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuch galat ho gaya");
    } finally {
      setLoading(false);
    }
  }

  // ---- Success screen ----
  if (done) {
    return (
      <div className="container-px py-20">
        <div className="mx-auto max-w-lg rounded-4xl bg-sand/50 p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto h-16 w-16 text-sage" />
          <h1 className="mt-4 heading-serif text-3xl">Order mil gaya! 🎉</h1>
          <p className="mt-2 text-cocoa/70">
            Aapka order number <strong>#{done.orderNumber}</strong> hai. Hum jald
            hi aapse confirm karne ke liye sampark karenge.
          </p>
          <p className="mt-2 text-sm text-cocoa/55">
            WhatsApp order ke liye chat window khul gaya hoga — bas send kar
            dein.
          </p>
          <Link href="/shop" className="btn-primary mt-6">
            Aur shopping karo
          </Link>
        </div>
      </div>
    );
  }

  // ---- Empty cart ----
  if (items.length === 0) {
    return (
      <div className="container-px py-20">
        <div className="mx-auto max-w-lg text-center">
          <ShoppingBag className="mx-auto h-14 w-14 text-cocoa/20" />
          <h1 className="mt-4 heading-serif text-3xl">Cart khaali hai</h1>
          <p className="mt-2 text-cocoa/60">
            Pehle kuch pyaara sa handmade chuno.
          </p>
          <Link href="/shop" className="btn-primary mt-6">
            Shop dekho
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-px py-10">
      <h1 className="heading-serif text-4xl sm:text-5xl">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]"
      >
        {/* Details */}
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Naam *" value={form.name} onChange={(v) => update("name", v)} />
            <Field
              label="Phone *"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              type="tel"
            />
          </div>
          <Field
            label="Email (optional)"
            value={form.email}
            onChange={(v) => update("email", v)}
            type="email"
          />
          <Field
            label="Pata (optional)"
            value={form.address}
            onChange={(v) => update("address", v)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Sheher" value={form.city} onChange={(v) => update("city", v)} />
            <Field label="State" value={form.state} onChange={(v) => update("state", v)} />
            <Field
              label="Pincode"
              value={form.pincode}
              onChange={(v) => update("pincode", v)}
            />
          </div>
          <Field
            label="Koi note? (optional)"
            value={form.notes}
            onChange={(v) => update("notes", v)}
          />

          {/* Payment method */}
          <div>
            <p className="mb-3 text-sm font-medium text-cocoa">Payment method</p>
            <div className="space-y-3">
              {razorpayAvailable && (
                <PaymentOption
                  active={method === "razorpay"}
                  onClick={() => setMethod("razorpay")}
                  icon={<CreditCard className="h-5 w-5" />}
                  title="Online payment"
                  desc="UPI, card, netbanking — secure Razorpay se"
                />
              )}
              <PaymentOption
                active={method === "whatsapp"}
                onClick={() => setMethod("whatsapp")}
                icon={<MessageCircle className="h-5 w-5" />}
                title="WhatsApp pe order (COD)"
                desc="Order WhatsApp pe bhejein, payment baad mein"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-4xl bg-sand/40 p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="heading-serif text-2xl">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.slug} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
                  <Image
                    src={i.image}
                    alt={i.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium text-cocoa">{i.name}</p>
                  <p className="text-cocoa/55">Qty {i.quantity}</p>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(i.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-cocoa/10 pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "FREE" : formatPrice(shipping)}
            />
            <div className="flex justify-between border-t border-cocoa/10 pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-2xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-5 w-full ${
              method === "whatsapp" ? "btn-whatsapp" : "btn-primary"
            } disabled:opacity-60`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Process ho raha hai...
              </>
            ) : method === "whatsapp" ? (
              <>
                <MessageCircle className="h-5 w-5" />
                WhatsApp pe order bhejo
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                {formatPrice(total)} pay karo
              </>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-cocoa/45">
            Order karne par aap hamari{" "}
            <Link href="/policies/terms" className="underline">
              terms
            </Link>{" "}
            se sehmat hain.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-cocoa/80">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-sand bg-cream px-4 py-3 text-cocoa outline-none transition-colors focus:border-terracotta"
      />
    </label>
  );
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
        active
          ? "border-terracotta bg-terracotta/5"
          : "border-sand hover:border-cocoa/20"
      }`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          active ? "bg-terracotta text-cream" : "bg-sand text-cocoa/60"
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block font-medium text-cocoa">{title}</span>
        <span className="block text-xs text-cocoa/55">{desc}</span>
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-cocoa/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
