import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@/config";
import { env } from "@/lib/env";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false }
);
const BottomNav = dynamic(
  () => import("@/components/BottomNav").then((m) => m.BottomNav),
  { ssr: false }
);
const SearchOverlay = dynamic(
  () => import("@/components/SearchOverlay").then((m) => m.SearchOverlay),
  { ssr: false }
);
const StarryNight = dynamic(() => import("@/components/StarryNight"), {
  ssr: false,
});
const AmbientBackground = dynamic(
  () => import("@/components/AmbientBackground"),
  { ssr: false }
);

// Runs before paint to apply the saved theme and avoid a flash of the wrong mode.
const themeScript = `(function(){try{var t=localStorage.getItem('crochet-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${config.brandName} — Handmade Crochet, Made with Love`,
    template: `%s | ${config.brandName}`,
  },
  description: config.subTagline,
  keywords: [
    "handmade crochet",
    "crochet flowers",
    "crochet bouquet",
    "amigurumi",
    "handmade gifts India",
    "crochet keychains",
  ],
  openGraph: {
    title: `${config.brandName} — Handmade Crochet`,
    description: config.subTagline,
    type: "website",
    locale: "en_IN",
    siteName: config.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.brandName} — Handmade Crochet`,
    description: config.subTagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <StarryNight />
        <AmbientBackground />
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Navbar />
                <main className="relative z-10 pb-16 md:pb-0">{children}</main>
                <Footer />
                <FloatingWhatsApp />
                <CartDrawer />
                <SearchOverlay />
                <BottomNav />
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
