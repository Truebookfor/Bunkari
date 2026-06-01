import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy/PolicyLayout";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "FAQ — Aksar Pooche Jaane Wale Sawaal",
  description:
    "Crochet products, shipping, payment, customisation aur returns se judi aam sawaalon ke jawab.",
};

const faqs = [
  {
    q: "Products kis cheez se bante hain?",
    a: "Saare products premium 100% cotton yarn se haath se bune jaate hain — soft, safe aur long-lasting.",
  },
  {
    q: "Delivery mein kitna time lagta hai?",
    a: "Ready-to-ship items 2-4 din mein dispatch hote hain. Made-to-order items 3-5 din mein bante hain. Delivery aam taur par 3-7 working days mein ho jaati hai.",
  },
  {
    q: "Kya main customise karwa sakta/sakti hoon?",
    a: "Haan! Colors, size ya personal touch ke liye order karte waqt note add karein ya WhatsApp par humse baat karein.",
  },
  {
    q: "Payment ke kya options hain?",
    a: "Aap online (UPI, card, netbanking) pay kar sakte hain ya WhatsApp par order karke COD choose kar sakte hain.",
  },
  {
    q: "Kya shipping free hai?",
    a: `₹${config.freeShippingThreshold} se zyaada ke order par shipping bilkul free hai. Usse kam par ₹49 flat charge lagta hai.`,
  },
  {
    q: "Product damaged mila to?",
    a: "Delivery ke 48 ghante ke andar photo ke saath WhatsApp par bataayein — hum free replacement ya refund denge.",
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <PolicyLayout title="Aksar Pooche Jaane Wale Sawaal">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-3xl bg-sand/40 p-5 transition-colors hover:bg-sand/60"
            >
              <summary className="cursor-pointer list-none font-medium text-cocoa marker:hidden">
                {f.q}
              </summary>
              <p className="mt-3 leading-relaxed text-cocoa/70">{f.a}</p>
            </details>
          ))}
        </div>
      </PolicyLayout>
    </>
  );
}
