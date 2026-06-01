import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function CategoryPills() {
  return (
    <section className="container-px pt-8">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <span className="section-eyebrow">Shop by category</span>
          <h2 className="mt-1 heading-serif text-2xl sm:text-4xl">
            Aapko kya chahiye?
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden shrink-0 text-sm font-semibold text-terracotta hover:text-terracotta-dark sm:block"
        >
          Sab dekho →
        </Link>
      </Reveal>

      <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.06}>
            <Link
              href={`/shop?category=${cat.id}`}
              className="group flex w-20 shrink-0 flex-col items-center gap-2 sm:w-auto"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-sand transition-all duration-300 group-hover:ring-terracotta sm:h-auto sm:w-full sm:rounded-3xl sm:pb-[100%]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 80px, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-center text-sm font-semibold text-cocoa group-hover:text-terracotta">
                {cat.name}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
