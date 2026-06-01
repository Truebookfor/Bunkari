import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function CategoryShowcase() {
  const shown = categories.filter((c) => c.id !== "combo");

  return (
    <section className="container-px py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="chip bg-sand text-cocoa/70">Hamari Collections</span>
        <h2 className="mt-4 heading-serif text-4xl sm:text-5xl">
          Teen pyaari ranges
        </h2>
        <p className="mt-4 text-cocoa/60">
          Har category dhage se bani, pyaar se buni — apni pasand chuno.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {shown.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.1}>
            <Link
              href={`/shop?category=${cat.id}`}
              className="group relative block h-96 overflow-hidden rounded-4xl shadow-soft"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <p className="text-sm font-medium text-cream/80">
                  {cat.tagline}
                </p>
                <h3 className="mt-1 flex items-center gap-2 font-serif text-2xl font-semibold">
                  {cat.name}
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
