"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import {
  formatPrice,
  cn,
  discountPercent,
  productRating,
} from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { StarRating } from "@/components/StarRating";

const tagStyles: Record<string, string> = {
  bestseller: "bg-terracotta text-cream",
  new: "bg-sage text-cream",
  premium: "bg-mustard text-cocoa",
};

const tagLabels: Record<string, string> = {
  bestseller: "Bestseller",
  new: "New",
  premium: "Premium",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);

  const off = discountPercent(product.price, product.oldPrice);
  const { rating, reviews } = productRating(
    product.slug,
    product.rating,
    product.reviews
  );
  const wished = has(product.slug);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function toggleWish(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.slug);
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-cocoa/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <span className="badge-sale">{off}% OFF</span>}
          {product.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm",
                tagStyles[tag]
              )}
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="icon-btn absolute right-3 top-3"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wished && "fill-terracotta text-terracotta"
            )}
          />
        </button>

        {/* Quick add — hover (desktop) / always (mobile) */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <button
            onClick={quickAdd}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lift transition-colors",
              added
                ? "bg-sage text-cream"
                : "bg-cocoa text-cream hover:bg-terracotta"
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> Quick add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <StarRating rating={rating} reviews={reviews} />
        <h3 className="mt-1.5 line-clamp-1 font-serif text-lg font-semibold text-cocoa transition-colors group-hover:text-terracotta">
          {product.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 flex-1 text-sm text-cocoa/55">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-cocoa">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-cocoa/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {off > 0 && (
            <span className="ml-auto text-xs font-semibold text-sage-dark">
              Save {formatPrice(product.oldPrice! - product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
