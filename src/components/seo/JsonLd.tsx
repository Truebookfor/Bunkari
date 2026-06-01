import { config } from "@/config";
import { env } from "@/lib/env";
import type { Product } from "@/data/products";
import type { DBBlogPost } from "@/lib/supabase/types";

const site = env.siteUrl;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: config.brandName,
        url: site,
        description: config.subTagline,
        email: config.email,
        sameAs: [
          config.social.instagram,
          config.social.facebook,
          config.social.youtube,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["Hindi", "English"],
        },
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.brandName,
        url: site,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: product.image,
        category: product.category,
        brand: { "@type": "Brand", name: config.brandName },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `${site}/product/${product.slug}`,
        },
      }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: DBBlogPost }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.cover_image,
        datePublished: post.published_at,
        author: {
          "@type": "Person",
          name: post.author_name,
          jobTitle: post.author_role,
        },
        publisher: {
          "@type": "Organization",
          name: config.brandName,
        },
        mainEntityOfPage: `${site}/blog/${post.slug}`,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site}${item.href}`,
        })),
      }}
    />
  );
}
