import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { config, whatsappLink } from "@/config";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="container-px py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-terracotta px-8 py-16 text-center text-cream shadow-lift sm:px-16">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cream/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cocoa/20 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
            Apna pasandeeda handmade aaj order karo
          </h2>
          <p className="mt-5 text-lg text-cream/85">
            Custom orders, bulk gifting ya koi sawaal — WhatsApp par seedha baat
            karo. Hum khushi se madad karenge.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink(
                `Hi ${config.brandName}! Mujhe order karna hai. 🌸`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-cream text-cocoa hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp par order karo
            </a>
            <Link
              href="/shop"
              className="btn border border-cream/40 text-cream hover:bg-cream/10"
            >
              Browse collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
