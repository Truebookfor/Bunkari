"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, TrendingUp } from "lucide-react";
import { products, categories } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useSearch } from "@/context/SearchContext";

const popular = ["Bouquet", "Bunny", "Keychain", "Gift combo"];

export function SearchOverlay() {
  const { isOpen, close } = useSearch();
  const [query, setQuery] = useState("");

  // Body scroll lock + Esc to close
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Close search"
        onClick={close}
        className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm"
      />
      <div className="absolute inset-x-0 top-0 animate-slide-up bg-cream shadow-lift">
        <div className="container-px py-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-sand px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-cocoa/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kya dhoondh rahe ho? Bouquet, bunny, keychain..."
                className="w-full bg-transparent text-base text-cocoa outline-none placeholder:text-cocoa/40"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear">
                  <X className="h-4 w-4 text-cocoa/50" />
                </button>
              )}
            </div>
            <button
              onClick={close}
              className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-cocoa/70 hover:text-terracotta"
            >
              Cancel
            </button>
          </div>

          <div className="mt-4 max-h-[70vh] overflow-y-auto pb-4">
            {query.trim() === "" ? (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cocoa/50">
                    <TrendingUp className="h-3.5 w-3.5" /> Popular
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button
                        key={p}
                        onClick={() => setQuery(p)}
                        className="rounded-full bg-sand px-4 py-2 text-sm font-medium text-cocoa hover:bg-terracotta hover:text-cream"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cocoa/50">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/shop?category=${c.id}`}
                        onClick={close}
                        className="flex items-center gap-3 rounded-2xl bg-sand p-2 hover:bg-sand/60"
                      >
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                          <Image src={c.image} alt={c.name} fill sizes="48px" className="object-cover" />
                        </span>
                        <span className="text-sm font-medium text-cocoa">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    onClick={close}
                    className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sand"
                  >
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-cocoa">{p.name}</span>
                      <span className="block truncate text-sm text-cocoa/55">{p.shortDescription}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-terracotta">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                ))}
                <Link
                  href={`/shop`}
                  onClick={close}
                  className="mt-2 block rounded-2xl bg-cocoa py-3 text-center text-sm font-semibold text-cream"
                >
                  Saari collection dekho
                </Link>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-cocoa/60">
                  &quot;{query}&quot; ke liye kuch nahi mila.
                </p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="mt-4 inline-block text-sm font-semibold text-terracotta"
                >
                  Poori collection browse karo →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
