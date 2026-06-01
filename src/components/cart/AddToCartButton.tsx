"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Pick<Product, "slug" | "name" | "price" | "image">;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-primary ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Bag mein add ho gaya
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          Bag mein daalo
        </>
      )}
    </button>
  );
}
