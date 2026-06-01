"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { config } from "@/config";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeItem,
    count,
  } = useCart();

  const remaining = config.freeShippingThreshold - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-cocoa/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="flex items-center gap-2 heading-serif text-2xl">
            <ShoppingBag className="h-5 w-5 text-terracotta" />
            Aapka bag ({count})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-cocoa/60 transition-colors hover:bg-sand hover:text-cocoa"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-cocoa/20" />
            <p className="text-cocoa/60">Aapka bag abhi khaali hai.</p>
            <Link href="/shop" onClick={closeCart} className="btn-primary">
              Shopping shuru karo
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {remaining > 0 && (
                <p className="mb-4 rounded-2xl bg-sage/15 px-4 py-3 text-sm text-cocoa/70">
                  Bas <strong>{formatPrice(remaining)}</strong> aur — free
                  shipping unlock ho jaayegi! 🚚
                </p>
              )}

              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-cocoa">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.slug)}
                          aria-label="Remove item"
                          className="text-cocoa/40 transition-colors hover:text-terracotta"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-cocoa/60">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-sand">
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="p-1.5 text-cocoa/60 hover:text-cocoa"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="p-1.5 text-cocoa/60 hover:text-cocoa"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-cocoa">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-sand px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-cocoa/60">Subtotal</span>
                <span className="text-lg font-semibold text-cocoa">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full"
              >
                Checkout karo
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full text-center text-sm text-cocoa/50 hover:text-cocoa"
              >
                Aur shopping karo
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
