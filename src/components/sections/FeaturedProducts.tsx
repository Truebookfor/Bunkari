import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export async function FeaturedProducts() {
  const featured = await fetchFeaturedProducts();

  return (
    <section className="bg-sand/50 py-20">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="chip bg-cream text-cocoa/70">Sabse pasand</span>
            <h2 className="mt-4 heading-serif text-4xl sm:text-5xl">
              Featured handmade
            </h2>
          </Reveal>
          <Reveal>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark"
            >
              Saare products dekho
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
