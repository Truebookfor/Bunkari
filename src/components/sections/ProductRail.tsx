import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export function ProductRail({
  eyebrow,
  title,
  subtitle,
  products,
  href = "/shop",
  tone = "cream",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
  tone?: "cream" | "sand";
}) {
  if (products.length === 0) return null;

  return (
    <section className={tone === "sand" ? "bg-sand/50 py-16" : "py-16"}>
      <div className="container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="mt-2 heading-serif text-3xl sm:text-4xl">{title}</h2>
            {subtitle && (
              <p className="mt-2 max-w-md text-cocoa/60">{subtitle}</p>
            )}
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
          >
            Saare dekho
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Mobile: horizontal carousel · Desktop: grid */}
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible">
          {products.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className="w-[64vw] shrink-0 snap-start sm:w-[40vw] md:w-auto"
            >
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
