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
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BottomNav } from "@/components/BottomNav";
import { SearchOverlay } from "@/components/SearchOverlay";
import StarryNight from "@/components/StarryNight";
import AmbientBackground from "@/components/AmbientBackground";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

// Runs before paint to apply the saved theme and avoid a flash of the wrong mode.
const themeScript = `(function(){try{var t=localStorage.getItem('crochet-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
