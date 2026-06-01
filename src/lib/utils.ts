export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Discount % nikalna (oldPrice ke against)
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

// Stable hash (slug se deterministic number)
function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Rating na ho to slug se ek consistent, real-jaisa rating (4.6–5.0) generate
export function productRating(
  slug: string,
  rating?: number,
  reviews?: number
): { rating: number; reviews: number } {
  const h = hashString(slug);
  const r = rating ?? 4.6 + (h % 5) / 10; // 4.6 - 5.0
  const rv = reviews ?? 18 + (h % 180); // 18 - 197
  return { rating: Math.min(5, Number(r.toFixed(1))), reviews: rv };
}

