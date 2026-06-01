import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export function ProductGrid({
  eyebrow,
  title,
  subtitle,
  products,
  href = "/shop",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="container-px py-16">
      <Reveal className="text-center">
        <span className="section-eyebrow justify-center">{eyebrow}</span>
        <h2 className="mt-2 heading-serif text-3xl sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-2 max-w-md text-cocoa/60">{subtitle}</p>
        )}
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href={href} className="btn-dark px-8 py-3.5">
          Saari collection dekho
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
