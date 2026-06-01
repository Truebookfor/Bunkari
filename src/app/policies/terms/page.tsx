import type { Metadata } from "next";
import { PolicyLayout, PolicySection } from "@/components/policy/PolicyLayout";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Hamari website use karne aur order karne ki terms & conditions.",
};

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service">
      <PolicySection heading="Products">
        <p>
          Saare products handmade hain, isliye har piece mein halka sa farq ho
          sakta hai — yahi handmade ki khoobsurti hai. Colors screen ke hisaab se
          thode alag dikh sakte hain.
        </p>
      </PolicySection>
      <PolicySection heading="Pricing aur payment">
        <p>
          Saare daam INR (₹) mein hain. Order confirm tabhi hota hai jab payment
          successful ho (online) ya WhatsApp par confirm ho (COD).
        </p>
      </PolicySection>
      <PolicySection heading="Order cancellation">
        <p>
          Ready-to-ship orders dispatch hone se pehle cancel ho sakte hain.
          Made-to-order items banna shuru hone ke baad cancel nahi ho sakte.
        </p>
      </PolicySection>
      <PolicySection heading="Sampark">
        <p>
          In terms se judi koi baat ho to{" "}
          <a href={`mailto:${config.email}`} className="text-terracotta underline">
            {config.email}
          </a>{" "}
          par likhein.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
