import type { Metadata } from "next";
import { PolicyLayout, PolicySection } from "@/components/policy/PolicyLayout";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Aapka data kaise collect, use aur protect hota hai — hamari privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <PolicySection heading="Hum kya data lete hain">
        <p>
          Order process karne ke liye hum aapka naam, phone number, email aur
          delivery address lete hain. Payment details seedhe secure payment gateway
          (Razorpay) handle karta hai — hum aapke card/UPI details store nahi karte.
        </p>
      </PolicySection>
      <PolicySection heading="Data ka use">
        <p>
          Aapka data sirf order process karne, delivery karne aur aapse sampark
          karne ke liye use hota hai. Hum aapka data kisi ko bechte nahi.
        </p>
      </PolicySection>
      <PolicySection heading="Data security">
        <p>
          Aapki jaankari secure database mein store hoti hai aur sirf authorised
          team access kar sakti hai. Payments PCI-compliant gateway se hote hain.
        </p>
      </PolicySection>
      <PolicySection heading="Aapke adhikaar">
        <p>
          Aap kabhi bhi apna data dekhne, update karne ya delete karwane ke liye{" "}
          <a href={`mailto:${config.email}`} className="text-terracotta underline">
            {config.email}
          </a>{" "}
          par sampark kar sakte hain.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
