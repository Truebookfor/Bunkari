"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { CartButton } from "@/components/cart/CartButton";
import ThemeToggle from "@/components/ThemeToggle";
import { useSearch } from "@/context/SearchContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { open: openSearch } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-card" : ""
      )}
    >
      {/* Desktop: nav links row */}
      <div className="hidden border-b border-cocoa/6 md:block">
        <nav className="container-px flex items-center py-2">
          <div className="flex flex-1 items-center justify-center gap-8">
            {config.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-wide text-cocoa/70 transition-colors hover:text-terracotta"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main bar: search | centered logo | cart */}
      <div className="container-px flex h-14 items-center justify-between">
        <button
          onClick={openSearch}
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cocoa transition-colors hover:text-terracotta"
        >
          <Search className="h-5 w-5" />
        </button>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta font-serif text-base font-semibold text-cream">
            {config.brandInitial}
          </span>
          <span className="font-serif text-xl font-semibold text-cocoa">
            {config.brandName}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <CartButton className="text-cocoa" />
        </div>
      </div>
    </header>
  );
}
