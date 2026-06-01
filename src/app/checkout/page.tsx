import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Apna handmade crochet order complete karein.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="pt-10">
      <CheckoutClient />
    </div>
  );
}
