import Link from "next/link";
import { config } from "@/config";
import Vine from "@/components/Vine";

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-cocoa/8 bg-sand/50">
      {/* climbing bel — feminine accent on the corners */}
      <Vine className="absolute -left-1 bottom-0 h-32 w-12 opacity-70" />
      <Vine flip className="absolute -right-1 bottom-0 h-32 w-12 opacity-70" />

      <div className="container-px flex flex-col items-center gap-2 py-10 text-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-serif text-base font-semibold text-cream">
            {config.brandInitial}
          </span>
          <span className="font-serif text-2xl font-semibold text-cocoa">
            {config.brandName}
          </span>
        </Link>

        <p className="max-w-xs text-sm text-cocoa/60">
          Gaon ki kushal mahilaon ke haathon se bana, dil se diya —{" "}
          <span className="text-terracotta">made in India</span>.
        </p>

        <p className="mt-2 text-xs text-cocoa/40">
          © {new Date().getFullYear()} {config.brandName}
        </p>
      </div>
    </footer>
  );
}
