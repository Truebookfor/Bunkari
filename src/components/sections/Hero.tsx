"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=1400&q=80",
    title: "Forever Flowers",
    subtitle: "Jo kabhi murjhate nahi",
    href: "/shop?category=flowers",
  },
  {
    image: "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=1400&q=80",
    title: "Amigurumi Toys",
    subtitle: "Soft, pyaare, handmade",
    href: "/shop?category=amigurumi",
  },
  {
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1400&q=80",
    title: "Gift Combos",
    subtitle: "Ready-to-gift sets",
    href: "/shop?category=combo",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % banners.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const b = banners[active];

  return (
    <section className="container-px pt-3 pb-2">
      <Link href={b.href} className="group relative block overflow-hidden rounded-2xl">
        <div className="relative aspect-[2.4/1] sm:aspect-[3/1]">
          {banners.map((banner, i) => (
            <Image
              key={i}
              src={banner.image}
              alt={banner.title}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1200px"
              className={`object-cover transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-cocoa/20 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/80">
            {b.subtitle}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-cream sm:text-3xl">
            {b.title}
          </h2>
        </div>
      </Link>
      {/* Dots */}
      <div className="mt-2.5 flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Banner ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-terracotta" : "w-1.5 bg-cocoa/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
