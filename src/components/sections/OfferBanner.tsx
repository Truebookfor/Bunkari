import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Vine from "@/components/Vine";

export function OfferBanner() {
  return (
    <section className="container-px py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-5xl bg-cocoa text-cream">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=1400&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-terracotta/40 blur-3xl" />

          {/* climbing bel on the door/window edges */}
          <Vine className="absolute -left-2 bottom-0 h-48 w-16 opacity-80" />
          <Vine flip className="absolute -right-2 bottom-0 h-48 w-16 opacity-80" />

          <div className="relative grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                <BadgePercent className="h-3.5 w-3.5" />
                Limited time
              </span>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Gift combos par
                <br />
                special savings
              </h2>
              <p className="mt-4 max-w-md text-cream/75">
                Soch-samajh kar banaye gift sets — anniversary, baby shower aur
                festivals ke liye ready-to-gift. Abhi order karein.
              </p>
              <Link
                href="/shop?category=combo"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 text-sm font-semibold text-cocoa transition-transform hover:scale-[1.02]"
              >
                Combos dekho
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
