"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function BottomNav() {
  const pathname = usePathname();
  const { count: cartCount, openCart } = useCart();
  const { count: wishCount } = useWishlist();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const item =
    "relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-cocoa/8 bg-cream/98 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-md items-stretch pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/"
          className={cn(item, isActive("/") ? "text-terracotta" : "text-cocoa/50")}
        >
          <Home className="h-[21px] w-[21px]" />
          Home
        </Link>

        <Link
          href="/shop"
          className={cn(item, isActive("/shop") ? "text-terracotta" : "text-cocoa/50")}
        >
          <LayoutGrid className="h-[21px] w-[21px]" />
          Shop
        </Link>

        <Link
          href="/wishlist"
          className={cn(item, isActive("/wishlist") ? "text-terracotta" : "text-cocoa/50")}
        >
          <span className="relative">
            <Heart className="h-[21px] w-[21px]" />
            {wishCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-terracotta px-0.5 text-[8px] font-semibold text-cream">
                {wishCount}
              </span>
            )}
          </span>
          Wishlist
        </Link>

        <button onClick={openCart} className={cn(item, "text-cocoa/50")}>
          <span className="relative">
            <ShoppingBag className="h-[21px] w-[21px]" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-terracotta px-0.5 text-[8px] font-semibold text-cream">
                {cartCount}
              </span>
            )}
          </span>
          Bag
        </button>

        <Link
          href="/account"
          className={cn(item, isActive("/account") ? "text-terracotta" : "text-cocoa/50")}
        >
          <User className="h-[21px] w-[21px]" />
          Menu
        </Link>
      </div>
    </nav>
  );
}
