"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label="Open cart"
      className={`relative rounded-full p-2 transition-colors hover:bg-sand ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
