"use client";

import { MessageCircle } from "lucide-react";
import { config, whatsappLink } from "@/config";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(
        `Hi ${config.brandName}! Mujhe order karna hai. 🌸`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110 md:bottom-6 md:right-6 md:h-14 md:w-14"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
