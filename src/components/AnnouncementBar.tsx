"use client";

import { useState } from "react";
import { X } from "lucide-react";

const messages = [
  "✨ ₹500+ ke order par FREE shipping",
  "🧶 100% handmade · premium cotton yarn",
  "💝 Festive offer — bestsellers par flat discount",
  "🚚 All-India delivery · made-to-order options",
  "⭐ 1000+ khush customers",
];

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  // do baar repeat — seamless marquee
  const loop = [...messages, ...messages];

  return (
    <div className="relative z-[55] flex items-center bg-cocoa text-cream">
      <div className="mask-fade-r flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 py-2 pr-10">
          {loop.map((m, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-xs font-medium tracking-wide text-cream/90"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream/70 hover:bg-cream/10 hover:text-cream"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
