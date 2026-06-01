import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="container-px py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-4xl shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan crocheting by hand"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-terracotta px-5 py-4 text-cream shadow-lift sm:block">
            <p className="font-serif text-2xl font-semibold">Gaon ki</p>
            <p className="text-sm">mehnat, aapke ghar</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="chip bg-sand text-cocoa/70">Hamari Kahani</span>
          <h2 className="mt-4 heading-serif text-4xl sm:text-5xl">
            Har dhage mein ek kahani
          </h2>
          <p className="mt-6 leading-relaxed text-cocoa/70">
            Hamare har product ke peeche gaon ki mehnati ladkiyon ki kala hai.
            Ghar baithe, fursat ke palon ko hunar mein badalte hue — woh har
            phool, har toy, har charm ko pyaar se bunti hain.
          </p>
          <p className="mt-4 leading-relaxed text-cocoa/70">
            Hum best quality cotton yarn use karte hain aur kam margin rakhte
            hain — taaki aapko milti hai asli quality, aur unhe milta hai uchit
            haq. Jab aap kuch khareedte ho, toh ek family ko support karte ho.
          </p>
          <Link href="/about" className="btn-outline mt-8">
            Poori kahani padho
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
