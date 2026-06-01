import type { Metadata } from "next";
import { PolicyLayout, PolicySection } from "@/components/policy/PolicyLayout";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "All-India delivery, shipping charges, delivery time aur tracking ki poori jaankari.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy">
      <PolicySection heading="Delivery area">
        <p>
          Hum poore India mein delivery karte hain. Aapke pincode tak product
          trusted courier partners ke through bheja jaata hai.
        </p>
      </PolicySection>
      <PolicySection heading="Shipping charges">
        <p>
          ₹{config.freeShippingThreshold} se zyaada ke order par shipping{" "}
          <strong>bilkul FREE</strong> hai. Usse kam ke order par ₹49 ka flat
          shipping charge lagta hai.
        </p>
      </PolicySection>
      <PolicySection heading="Delivery time">
        <p>
          Ready-to-ship products 2-4 din mein dispatch ho jaate hain. Made-to-order
          items banne mein 3-5 din lagte hain, uske baad dispatch hote hain. Delivery
          mein aam taur par 3-7 working days lagte hain.
        </p>
      </PolicySection>
      <PolicySection heading="Order tracking">
        <p>
          Dispatch hone par hum aapko WhatsApp par tracking details bhej dete hain.
          Koi bhi sawaal ho to{" "}
          <a href={`mailto:${config.email}`} className="text-terracotta underline">
            {config.email}
          </a>{" "}
          par sampark karein.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
