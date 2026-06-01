// ============================================================================
// BRAND CONFIG — Sab kuch yahaan se control hota hai.
// Brand name final hone par sirf yahaan badlo, poori site update ho jaayegi.
// ============================================================================

export const config = {
  // TODO: Brand name final hone par yahaan badlo
  brandName: "Bunkaari",
  brandInitial: "B",
  tagline: "Haathon se bana, dil se diya",
  subTagline: "Gaon ki ladkiyon ke haathon, best quality cotton yarn se bana crochet.",

  // WhatsApp number (country code ke saath, bina + ke). Apna number daalo.
  whatsappNumber: "919999999999",

  email: "hello@bunkaari.in",
  location: "Made in India",

  freeShippingThreshold: 500,

  // ── 3D / Animation assets ────────────────────────────────────────────────
  // Spline scene URL (spline.design par scene bana ke "Export > Code (React)"
  // se jo .splinecode URL milta hai wo yahaan paste karo). Khaali rakhoge to
  // hero apne aap purane wale par fallback ho jaayega.
  splineSceneUrl: "",
  // Hero videos
  heroVideoUrl: "/artisan-gaze.mp4",
  heroObjectsVideoUrl: "",

  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Combos", href: "/shop?category=combo" },
    { label: "Blog", href: "/blog" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof config;

// WhatsApp order link banane ke liye helper
export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${text}`;
}
