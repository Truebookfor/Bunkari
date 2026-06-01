import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import { fetchBlogPosts } from "@/lib/data/blog";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog — Crochet Tips, Gifting Ideas & Stories",
  description:
    "Haath se bune crochet products ki dekhbhaal, gifting ideas aur hamare artisans ki kahaaniyan. Crochet care guide aur handmade gift inspiration.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pt-10">
      <div className="container-px py-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip bg-sand text-cocoa/70">Hamara blog</span>
            <h1 className="mt-4 heading-serif text-4xl sm:text-5xl">
              Crochet ki duniya
            </h1>
            <p className="mt-4 text-cocoa/60">
              Care tips, gifting ideas aur hamare artisans ki kahaaniyan —
              sab kuch ek jagah.
            </p>
          </div>
        </Reveal>

        {featured && (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-12 grid gap-6 overflow-hidden rounded-4xl bg-sand/40 shadow-soft md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={featured.cover_image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
                <span className="chip w-fit bg-cream text-cocoa/70">
                  Featured
                </span>
                <h2 className="heading-serif text-3xl">{featured.title}</h2>
                <p className="text-cocoa/65">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-cocoa/50">
                  <span>{formatDate(featured.published_at)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featured.reading_minutes} min read
                  </span>
                </div>
                <span className="mt-2 inline-flex items-center gap-2 font-medium text-terracotta">
                  Padho
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-4xl bg-cream shadow-soft ring-1 ring-sand transition-shadow hover:shadow-lift"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="heading-serif text-xl">{post.title}</h3>
                  <p className="text-sm text-cocoa/60">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-cocoa/50">
                    <span>{formatDate(post.published_at)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.reading_minutes} min
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
