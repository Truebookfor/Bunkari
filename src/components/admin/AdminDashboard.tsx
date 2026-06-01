"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Package, FileText, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { DBOrder } from "@/lib/supabase/types";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
  new: "bg-mustard/20 text-cocoa",
  confirmed: "bg-sage/20 text-cocoa",
  shipped: "bg-terracotta/15 text-terracotta-dark",
  delivered: "bg-sage/30 text-cocoa",
  cancelled: "bg-cocoa/10 text-cocoa/60",
};

export function AdminDashboard({
  orders,
  productCount,
  postCount,
  supabaseReady,
}: {
  orders: DBOrder[];
  productCount: number;
  postCount: number;
  supabaseReady: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState(orders);
  const [busy, setBusy] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  async function updateStatus(id: string, status: string) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: status as DBOrder["status"] } : o))
        );
      }
    } finally {
      setBusy(null);
    }
  }

  const revenue = items
    .filter((o) => o.payment_status === "paid")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="container-px py-10">
      <div className="flex items-center justify-between">
        <h1 className="heading-serif text-4xl">Admin dashboard</h1>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-medium text-cocoa hover:bg-sand/70"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {!supabaseReady && (
        <p className="mt-6 rounded-2xl bg-mustard/15 px-4 py-3 text-sm text-cocoa/70">
          Supabase configured nahi hai — orders database me save nahi ho rahe.
          .env.local me Supabase keys daalkar live karein.
        </p>
      )}

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<ShoppingCart />} label="Total orders" value={String(items.length)} />
        <Stat icon={<Package />} label="Products" value={String(productCount)} />
        <Stat icon={<FileText />} label="Blog posts" value={String(postCount)} />
        <Stat
          icon={<ShoppingCart />}
          label="Paid revenue"
          value={formatPrice(revenue)}
        />
      </div>

      {/* Orders */}
      <h2 className="mt-12 heading-serif text-2xl">Orders</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-cocoa/55">Abhi koi order nahi aaya.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {items.map((o) => (
            <div
              key={o.id}
              className="rounded-3xl bg-sand/40 p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-cocoa">#{o.order_number}</p>
                  <p className="text-sm text-cocoa/60">
                    {o.customer_name} · {o.customer_phone}
                  </p>
                  {o.address && (
                    <p className="text-xs text-cocoa/50">
                      {o.address}, {o.city}, {o.state} - {o.pincode}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cocoa">{formatPrice(o.total)}</p>
                  <p className="text-xs text-cocoa/50">
                    {o.payment_method} · {o.payment_status}
                  </p>
                </div>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-cocoa/65">
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    {it.name} x{it.quantity} — {formatPrice(it.price * it.quantity)}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`chip ${statusColor[o.status] || "bg-sand"}`}
                >
                  {o.status}
                </span>
                <select
                  value={o.status}
                  disabled={busy === o.id}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="rounded-full border border-sand bg-cream px-3 py-1.5 text-sm outline-none focus:border-terracotta"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-cocoa/45">
        Products aur blog posts add/edit karne ke liye Supabase dashboard ka
        Table Editor use karein (products, blog_posts tables).
      </p>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-sand/40 p-5 shadow-soft">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
        {icon}
      </div>
      <p className="mt-3 text-2xl font-semibold text-cocoa">{value}</p>
      <p className="text-sm text-cocoa/55">{label}</p>
    </div>
  );
}
