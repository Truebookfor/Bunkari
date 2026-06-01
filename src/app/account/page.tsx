"use client";

import Link from "next/link";
import {
  Package,
  Heart,
  MessageCircle,
  HelpCircle,
  Truck,
  RotateCcw,
  Shield,
  FileText,
  Info,
  Mail,
  ChevronRight,
} from "lucide-react";
import { config, whatsappLink } from "@/config";

const sections = [
  {
    title: "Orders & Activity",
    items: [
      { icon: Package, label: "My Orders", href: "/checkout" },
      { icon: Heart, label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Help",
    items: [
      {
        icon: MessageCircle,
        label: "Chat on WhatsApp",
        href: whatsappLink(`Hi ${config.brandName}! Mujhe help chahiye.`),
        external: true,
      },
      { icon: HelpCircle, label: "FAQ", href: "/faq" },
      { icon: Mail, label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Policies",
    items: [
      { icon: Truck, label: "Shipping Policy", href: "/policies/shipping" },
      { icon: RotateCcw, label: "Returns & Refunds", href: "/policies/returns" },
      { icon: Shield, label: "Privacy Policy", href: "/policies/privacy" },
      { icon: FileText, label: "Terms of Service", href: "/policies/terms" },
    ],
  },
  {
    title: "More",
    items: [
      { icon: Info, label: "About Us", href: "/about" },
    ],
  },
];

export default function AccountPage() {
  return (
    <div className="container-px pb-20 pt-6">
      <div className="mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta font-serif text-2xl font-semibold text-cream">
          {config.brandInitial}
        </div>
        <h1 className="mt-3 font-serif text-2xl font-semibold text-cocoa">
          {config.brandName}
        </h1>
        <p className="mt-1 text-sm text-cocoa/60">
          Handmade crochet — haathon se bana, dil se diya.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cocoa/40">
              {section.title}
            </p>
            <div className="overflow-hidden rounded-2xl bg-white shadow-card">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                const cls =
                  "flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-cocoa transition-colors hover:bg-sand/50";
                const content = (
                  <>
                    <Icon className="h-5 w-5 text-cocoa/50" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-cocoa/30" />
                  </>
                );

                return (
                  <div key={item.label}>
                    {i > 0 && <div className="ml-12 border-t border-cocoa/6" />}
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={item.href} className={cls}>
                        {content}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
