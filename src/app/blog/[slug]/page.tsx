import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { fetchBlogPosts, fetchBlogPostBySlug } from "@/lib/data/blog";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.cover_image],
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-10">
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <div className="container-px py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-cocoa/60 transition-colors hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          Blog par wapas
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="chip bg-sand capitalize text-cocoa/70">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 heading-serif text-4xl sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-cocoa/55">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.reading_minutes} min read
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-4xl bg-sand shadow-soft">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="mt-10">
            <ArticleContent content={post.content} />
          </div>

          {/* Author E-E-A-T box */}
          <div className="mt-12 flex items-start gap-4 rounded-3xl bg-sand/50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-lg font-semibold text-cream">
              {post.author_name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-cocoa">{post.author_name}</p>
              <p className="text-sm text-cocoa/60">{post.author_role}</p>
              <p className="mt-2 text-sm text-cocoa/65">
                Hamare artisans saalon se crochet ka kaam karte hain — har tip
                asli anubhav se aati hai.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-terracotta/10 p-6 text-center">
            <p className="heading-serif text-2xl text-cocoa">
              Handmade crochet pasand aaya?
            </p>
            <p className="mt-2 text-cocoa/65">
              Hamari poori collection dekho aur apna favourite chuno.
            </p>
            <Link href="/shop" className="btn-primary mt-4">
              Shop dekho
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
