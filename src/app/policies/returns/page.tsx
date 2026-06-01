import type { Metadata } from "next";
import { PolicyLayout, PolicySection } from "@/components/policy/PolicyLayout";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Return, replacement aur refund policy — damaged ya galat product ke liye humse sampark karein.",
};

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout title="Returns & Refunds">
      <PolicySection heading="Hamari soch">
        <p>
          Har product haath se banaya jaata hai aur dispatch se pehle do baar
          check hota hai. Phir bhi agar koi problem ho, hum aapke saath hain.
        </p>
      </PolicySection>
      <PolicySection heading="Damaged ya galat product">
        <p>
          Agar product damaged, defective ya order se alag mile, to delivery ke
          48 ghante ke andar humein WhatsApp par photo ke saath bataayein. Hum free
          replacement ya refund denge.
        </p>
      </PolicySection>
      <PolicySection heading="Made-to-order items">
        <p>
          Customised aur made-to-order items khaas aapke liye banaye jaate hain,
          isliye inpar return tabhi possible hai jab product mein koi defect ho.
        </p>
      </PolicySection>
      <PolicySection heading="Refund process">
        <p>
          Approve hone ke baad refund 5-7 working days mein aapke original payment
          method par wapas aa jaata hai. COD orders ke liye UPI/bank par refund
          hota hai.
        </p>
        <p>
          Kisi bhi madad ke liye{" "}
          <a href={`mailto:${config.email}`} className="text-terracotta underline">
            {config.email}
          </a>{" "}
          par likhein.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
