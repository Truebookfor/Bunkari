"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, type Product, type CategoryId } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-low" | "price-high" | "newest";

const filters: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Sab" },
  { id: "flowers", label: "Flowers" },
  { id: "amigurumi", label: "Toys" },
  { id: "keychains", label: "Keychains" },
  { id: "combo", label: "Combos" },
];

export function ShopClient({
  initialCategory = "all",
  products,
}: {
  initialCategory?: CategoryId | "all";
  products: Product[];
}) {
  const [active, setActive] = useState<CategoryId | "all">(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    let list = products.slice();

    if (active !== "all") {
      list = list.filter((p) => p.category === active);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            Number(b.tags.includes("new")) - Number(a.tags.includes("new"))
        );
        break;
      default:
        list.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        );
    }

    return list;
  }, [active, query, sort, products]);

  const activeCategory = categories.find((c) => c.id === active);

  return (
    <div className="container-px py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="heading-serif text-4xl sm:text-5xl">
          {activeCategory ? activeCategory.name : "Saari Collection"}
        </h1>
        <p className="mt-4 text-cocoa/60">
          {activeCategory
            ? activeCategory.description
            : "Haath se bune phool, toys, keychains aur gift combos — sab ek jagah."}
        </p>
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                active === f.id
                  ? "bg-terracotta text-cream shadow-soft"
                  : "bg-sand text-cocoa/70 hover:bg-sand/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 lg:w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-full border border-cocoa/15 bg-sand py-2.5 pl-9 pr-4 text-sm text-cocoa outline-none transition-colors focus:border-terracotta"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-cocoa/15 bg-sand px-4 py-2.5 text-sm text-cocoa outline-none transition-colors focus:border-terracotta"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-20 text-center text-cocoa/50">
          Koi product nahi mila. Doosra search try karo.
        </p>
      )}
    </div>
  );
}
