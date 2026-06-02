"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { config } from "@/config";
import { Hero } from "@/components/sections/Hero";

/* ─── Seamless Looping Video ─────────────────────────────────────────────────
   Single video element with loop — simpler, less memory, faster load.
   Uses IntersectionObserver to only load when visible.
   ────────────────────────────────────────────────────────────────────────── */
function SeamlessVideo({
  src,
  className = "",
  videoClassName = "",
  blend = false,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  blend?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  const videoClasses = `absolute inset-0 h-full w-full object-cover ${videoClassName}`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={blend ? { mixBlendMode: "multiply" } : undefined}
    >
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className={videoClasses}
        />
      )}
    </div>
  );
}

/* Floating objects video — alag section ke roop me use karo */
export function FloatingBanner() {
  if (!config.heroObjectsVideoUrl) return null;
  return (
    <section className="container-px py-6">
      <div className="relative overflow-hidden rounded-2xl h-[200px] sm:h-[260px]">
        <SeamlessVideo
          src={config.heroObjectsVideoUrl}
          className="h-full w-full"
          videoClassName="origin-right scale-[1.15]"
        />
      </div>
    </section>
  );
}

export function Hero3D() {
  // No videos? Fallback to old banner
  if (!config.heroVideoUrl) {
    return <Hero />;
  }

  return (
    <section className="container-px pt-3 pb-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand via-cream to-sand">
        <div className="relative grid items-center gap-4 p-6 sm:grid-cols-2 sm:p-10">
          {/* Text side */}
          <div className="relative z-10">
            <p className="section-eyebrow">{config.tagline}</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">
              Haathon se bana,
              <br />
              <span className="text-terracotta">dil se diya</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm text-cocoa/70">
              {config.subTagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Shop karo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/shop?category=combo" className="btn-outline">
                Gift combos
              </Link>
            </div>
          </div>

          {/* Video side — sirf girl */}
          {/* Mobile: vertical portrait | Desktop: full wide, zoomed to hide left-bottom watermark */}
          <div className="relative aspect-[9/14] w-full sm:aspect-auto sm:h-[420px]">
            {/* Video */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <SeamlessVideo
                src={config.heroVideoUrl}
                className="h-full w-full rounded-2xl"
                videoClassName="origin-top-right sm:scale-[1.12]"
              />
            </div>

            {/* Crochet vine frame — charon taraf */}
            {/* Left vine */}
            <svg viewBox="0 0 40 300" className="pointer-events-none absolute -left-3 top-4 h-[85%] w-8 sm:-left-4 sm:w-10" aria-hidden="true">
              <path d="M20 0 C 8 40 32 70 18 110 C 6 150 34 180 20 220 C 8 255 30 275 20 300" fill="none" stroke="rgb(var(--c-sage))" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              <path d="M18 50 C 6 46 2 36 4 28 C 14 30 20 40 18 50Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway"/>
              <path d="M20 120 C 8 116 4 106 6 98 C 16 100 22 110 20 120Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '0.8s'}}/>
              <path d="M18 190 C 6 186 2 176 4 168 C 14 170 20 180 18 190Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '1.5s'}}/>
              <path d="M20 260 C 8 256 4 246 6 238 C 16 240 22 250 20 260Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '2.2s'}}/>
              {/* Tiny flowers */}
              <circle cx="16" cy="80" r="3" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="16" cy="80" r="1.5" fill="rgb(var(--c-mustard))" opacity="0.9"/>
              <circle cx="19" cy="230" r="3" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="19" cy="230" r="1.5" fill="rgb(var(--c-mustard))" opacity="0.9"/>
            </svg>

            {/* Right vine */}
            <svg viewBox="0 0 40 300" className="pointer-events-none absolute -right-3 top-8 h-[80%] w-8 -scale-x-100 sm:-right-4 sm:w-10" aria-hidden="true">
              <path d="M20 0 C 8 35 32 65 18 100 C 6 140 34 170 20 210 C 8 245 30 270 20 300" fill="none" stroke="rgb(var(--c-sage))" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              <path d="M18 40 C 6 36 2 26 4 18 C 14 20 20 30 18 40Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '0.4s'}}/>
              <path d="M20 110 C 8 106 4 96 6 88 C 16 90 22 100 20 110Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '1.2s'}}/>
              <path d="M18 180 C 6 176 2 166 4 158 C 14 160 20 170 18 180Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '1.9s'}}/>
              <path d="M20 250 C 8 246 4 236 6 228 C 16 230 22 240 20 250Z" fill="rgb(var(--c-sage))" opacity="0.6" className="animate-sway" style={{animationDelay: '2.6s'}}/>
              {/* Tiny flowers */}
              <circle cx="18" cy="70" r="3" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="18" cy="70" r="1.5" fill="rgb(var(--c-mustard))" opacity="0.9"/>
              <circle cx="15" cy="210" r="2.5" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="15" cy="210" r="1.2" fill="rgb(var(--c-mustard))" opacity="0.9"/>
            </svg>

            {/* Top vine (horizontal) */}
            <svg viewBox="0 0 300 36" className="pointer-events-none absolute -top-3 left-8 right-8 h-6 w-[80%] mx-auto sm:-top-4 sm:h-8" aria-hidden="true">
              <path d="M0 18 C 40 6 70 30 110 16 C 150 4 180 28 220 14 C 255 4 275 26 300 18" fill="none" stroke="rgb(var(--c-sage))" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <path d="M60 16 C 56 6 46 2 38 4 C 40 12 48 18 60 16Z" fill="rgb(var(--c-sage))" opacity="0.5" className="animate-sway" style={{animationDelay: '0.3s'}}/>
              <path d="M160 14 C 156 4 146 0 138 2 C 140 10 148 16 160 14Z" fill="rgb(var(--c-sage))" opacity="0.5" className="animate-sway" style={{animationDelay: '1.1s'}}/>
              <path d="M250 16 C 246 6 236 2 228 4 C 230 12 238 18 250 16Z" fill="rgb(var(--c-sage))" opacity="0.5" className="animate-sway" style={{animationDelay: '1.8s'}}/>
              <circle cx="110" cy="16" r="2.8" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="110" cy="16" r="1.4" fill="rgb(var(--c-mustard))" opacity="0.9"/>
            </svg>

            {/* Bottom vine (horizontal) */}
            <svg viewBox="0 0 300 36" className="pointer-events-none absolute -bottom-3 left-8 right-8 h-6 w-[80%] mx-auto sm:-bottom-4 sm:h-8" aria-hidden="true">
              <path d="M0 18 C 35 28 65 8 100 20 C 140 30 175 10 210 22 C 245 30 270 12 300 18" fill="none" stroke="rgb(var(--c-sage))" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <path d="M80 20 C 76 28 66 32 58 30 C 60 22 68 18 80 20Z" fill="rgb(var(--c-sage))" opacity="0.5" className="animate-sway" style={{animationDelay: '0.6s'}}/>
              <path d="M190 22 C 186 30 176 34 168 32 C 170 24 178 20 190 22Z" fill="rgb(var(--c-sage))" opacity="0.5" className="animate-sway" style={{animationDelay: '1.4s'}}/>
              <circle cx="140" cy="20" r="2.8" fill="rgb(var(--c-terracotta))" opacity="0.7"/>
              <circle cx="140" cy="20" r="1.4" fill="rgb(var(--c-mustard))" opacity="0.9"/>
              <circle cx="250" cy="19" r="2.5" fill="rgb(var(--c-terracotta))" opacity="0.6"/>
              <circle cx="250" cy="19" r="1.2" fill="rgb(var(--c-mustard))" opacity="0.8"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
