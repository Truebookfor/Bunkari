import { Hand, Sparkles, Truck, HeartHandshake } from "lucide-react";

const items = [
  {
    icon: Hand,
    title: "100% Handmade",
    text: "Har piece haath se buna, machine se nahi.",
  },
  {
    icon: Sparkles,
    title: "Best Quality Yarn",
    text: "Premium cotton yarn — soft aur tikau.",
  },
  {
    icon: Truck,
    title: "All-India Delivery",
    text: "Halke products, har pin code tak.",
  },
  {
    icon: HeartHandshake,
    title: "Fair Pricing",
    text: "Kam margin, seedha artisans ko support.",
  },
];

export function PromiseStrip() {
  return (
    <section className="border-y border-cocoa/10 bg-sand">
      <div className="container-px grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-terracotta">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium text-cocoa">{item.title}</p>
              <p className="text-sm text-cocoa/60">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
