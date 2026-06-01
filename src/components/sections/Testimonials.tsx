import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    name: "Priya S.",
    city: "Bengaluru",
    text: "Bouquet itna pyaara hai ki yakeen nahi hota haath se bana hai. Mummy ko gift kiya, woh khush ho gayi!",
  },
  {
    name: "Ankit M.",
    city: "Delhi",
    text: "Quality top-notch hai aur price bilkul fair. Bunny toy meri beti ki favourite ban gaya.",
  },
  {
    name: "Sneha R.",
    city: "Pune",
    text: "Packaging bahut sundar thi, saath mein handwritten note. Yeh chhoti baatein dil jeet leti hain.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cocoa py-20 text-cream">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip bg-cream/10 text-cream/80">Pyaar mila</span>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
            Hamare customers kya kehte hain
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-4xl bg-cream/5 p-7 ring-1 ring-cream/10">
                <Quote className="h-8 w-8 text-mustard" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-cream/85">
                  “{t.text}”
                </blockquote>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <figcaption className="font-medium">{t.name}</figcaption>
                    <p className="text-sm text-cream/60">{t.city}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-mustard text-mustard"
                      />
                    ))}
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
