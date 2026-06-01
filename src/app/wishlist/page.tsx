"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const items = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="container-px pt-10 pb-20">
      <div className="mb-8">
        <span className="section-eyebrow">Aapki pasand</span>
        <h1 className="mt-2 heading-serif text-4xl">Wishlist</h1>
        <p className="mt-2 text-cocoa/60">
          {items.length > 0
            ? `${items.length} item aapki wishlist mein hai.`
            : "Abhi tak kuch save nahi kiya."}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-4xl bg-sand/50 px-6 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
            <Heart className="h-7 w-7 text-terracotta" />
          </span>
          <p className="mt-5 max-w-sm text-cocoa/70">
            Products par heart icon dabakar apni pasand yahaan save karein.
          </p>
          <Link href="/shop" className="btn-primary mt-6">
            Shop dekho
          </Link>
        </div>
      )}
    </div>
  );
}
