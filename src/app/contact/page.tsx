import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Clock,
  Package,
} from "lucide-react";
import { config, whatsappLink } from "@/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Order, custom request ya koi sawaal — humse WhatsApp, email ya Instagram par judo.",
};

export default function ContactPage() {
  return (
    <div className="pt-10">
      <section className="container-px py-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip bg-sand text-cocoa/70">Get in touch</span>
          <h1 className="mt-4 heading-serif text-5xl sm:text-6xl">
            Aaiye, baat karte hain
          </h1>
          <p className="mt-4 text-cocoa/60">
            Order, bulk gifting, custom design ya koi sawaal — hum yahin hain.
            Sabse jaldi jawaab WhatsApp par milega.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Contact cards */}
          <a
            href={whatsappLink(`Hi ${config.brandName}! Mujhe ek sawaal hai.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-4xl bg-sand p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
              WhatsApp
            </h3>
            <p className="mt-1 text-sm text-cocoa/60">
              Sabse fast — order aur queries ke liye.
            </p>
            <p className="mt-3 text-sm font-medium text-terracotta">
              Chat shuru karo →
            </p>
          </a>

          <a
            href={`mailto:${config.email}`}
            className="group rounded-4xl bg-sand p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Mail className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
              Email
            </h3>
            <p className="mt-1 text-sm text-cocoa/60">
              Detailed ya bulk enquiries ke liye.
            </p>
            <p className="mt-3 text-sm font-medium text-terracotta">
              {config.email}
            </p>
          </a>

          <a
            href={config.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-4xl bg-sand p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Instagram className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
              Instagram
            </h3>
            <p className="mt-1 text-sm text-cocoa/60">
              Naye products aur behind-the-scenes dekho.
            </p>
            <p className="mt-3 text-sm font-medium text-terracotta">
              Follow karo →
            </p>
          </a>

          <div className="rounded-4xl bg-sand/60 p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cocoa/10 text-cocoa">
              <MapPin className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
              {config.location}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-cocoa/60">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-terracotta" />
                Mon–Sat, 10am – 7pm
              </li>
              <li className="flex items-center gap-2">
                <Package className="h-4 w-4 text-terracotta" />
                All-India shipping · Free above ₹{config.freeShippingThreshold}
              </li>
            </ul>
          </div>
        </div>

        {/* Big CTA */}
        <div className="mx-auto mt-14 max-w-4xl rounded-[2.5rem] bg-terracotta px-8 py-12 text-center text-cream sm:px-16">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Custom order chahiye?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cream/85">
            Naam, colour ya design — apni pasand ke hisaab se banwa sakte ho.
            WhatsApp par apna idea bhejo, baaki hum sambhal lenge.
          </p>
          <a
            href={whatsappLink(
              `Hi ${config.brandName}! Mujhe ek custom order ke baare mein baat karni hai.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-7 bg-cream text-cocoa hover:bg-sand"
          >
            <MessageCircle className="h-4 w-4" />
            Custom order shuru karo
          </a>
        </div>
      </section>
    </div>
  );
}
