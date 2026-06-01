import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";
import { CategoryId } from "@/data/products";
import { fetchProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Haath se bune crochet phool, amigurumi toys, keychains aur gift combos — best quality, fair price, all-India delivery.",
};

const validCategories: (CategoryId | "all")[] = [
  "all",
  "flowers",
  "amigurumi",
  "keychains",
  "combo",
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const raw = searchParams.category;
  const initial = (
    raw && validCategories.includes(raw as CategoryId)
      ? raw
      : "all"
  ) as CategoryId | "all";

  const products = await fetchProducts();

  return (
    <div className="pt-8">
      <Suspense>
        <ShopClient initialCategory={initial} products={products} />
      </Suspense>
    </div>
  );
}
