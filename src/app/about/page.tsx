import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Leaf, HandHeart, Award, ArrowRight } from "lucide-react";
import { config } from "@/config";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Gaon ki ladkiyon ke haathon bana handmade crochet — best quality, fair price, aur har order ke peeche ek family ki kahani.",
};

const values = [
  {
    icon: HandHeart,
    title: "Women Empowerment",
    text: "Har order seedha gaon ki ladkiyon ko aamdani aur aatmनिर्भरता deta hai.",
  },
  {
    icon: Award,
    title: "Best Quality",
    text: "Sirf premium cotton yarn — soft, tikau aur safe.",
  },
  {
    icon: Leaf,
    title: "Made by Hand",
    text: "Koi machine nahi. Har piece ghante bhar ki mehnat se buna jata hai.",
  },
  {
    icon: Heart,
    title: "Fair Pricing",
    text: "Kam margin — best quality, uchit daam, dono ke liye jeet.",
  },
];

const steps = [
  {
    step: "01",
    title: "Dhaaga chunte hain",
    text: "Best quality cotton yarn carefully select kiya jata hai.",
  },
  {
    step: "02",
    title: "Haath se bunte hain",
    text: "Hamari artisans ghar baithe har piece pyaar se banati hain.",
  },
  {
    step: "03",
    title: "Quality check",
    text: "Har item check hota hai — loose thread, stuffing, finish sab.",
  },
  {
    step: "04",
    title: "Pyaar se pack",
    text: "Handwritten note aur ek chhote gift ke saath aapke ghar.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="container-px py-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="chip bg-sand text-cocoa/70">Hamari Kahani</span>
            <h1 className="mt-4 heading-serif text-5xl sm:text-6xl">
              Gaon se aapke ghar tak
            </h1>
            <p className="mt-6 leading-relaxed text-cocoa/70">
              {config.brandName} ki shuruaat ek simple soch se hui — gaon ki
              gharelu ladkiyan jo ghar par rehti hain, unke hunar ko ek pehchaan
              aur aamdani dena. Fursat ke palon ko hum kala mein badalte hain.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa/70">
              Aaj hamari artisans dhage se phool, toys aur charms banati hain jo
              poore Bharat mein logon ke ghar khushi pahunchate hain. Har order
              ek family ko support karta hai.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan crocheting"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/50 py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-serif text-4xl sm:text-5xl">
              Humare usool
            </h2>
            <p className="mt-4 text-cocoa/60">
              Jo cheezein hum kabhi compromise nahi karte.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-4xl bg-sand p-7 shadow-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-cocoa">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/60">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-px py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-serif text-4xl sm:text-5xl">
            Har product ka safar
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="relative">
              <span className="font-serif text-5xl font-semibold text-terracotta/25">
                {s.step}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-cocoa">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/60">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-20">
        <div className="rounded-[2.5rem] bg-cocoa px-8 py-14 text-center text-cream sm:px-16">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Hamari kahani ka hissa bano
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">
            Jab aap kuch khareedte ho, toh ek family ko support karte ho aur
            apne ghar ek handmade khushi laate ho.
          </p>
          <Link href="/shop" className="btn bg-cream text-cocoa hover:bg-sand mt-8">
            Collection dekho
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
