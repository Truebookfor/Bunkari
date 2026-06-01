import { fetchProducts } from "@/lib/data/products";
import { config } from "@/config";
import type { OrderItem } from "@/lib/supabase/types";

export interface IncomingItem {
  slug: string;
  quantity: number;
}

export interface ComputedOrder {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

// Cart items ko server-side product prices se verify + totals compute.
// Client se aaye prices par bharosa nahi karte (tampering rokne ke liye).
export async function computeOrder(
  incoming: IncomingItem[]
): Promise<ComputedOrder | { error: string }> {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return { error: "Cart khaali hai" };
  }

  const products = await fetchProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const items: OrderItem[] = [];
  for (const it of incoming) {
    const product = bySlug.get(String(it.slug));
    if (!product) return { error: `Product nahi mila: ${it.slug}` };
    const qty = Math.max(1, Math.min(99, Math.floor(Number(it.quantity) || 1)));
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

  return { items, subtotal, shipping, total };
}
