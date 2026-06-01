import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  MessageCircle,
  Check,
  Ruler,
  Sparkles,
  Truck,
  Package,
} from "lucide-react";
import {
  products,
} from "@/data/products";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
} from "@/lib/data/products";
import { config, whatsappLink } from "@/config";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const related = await fetchRelatedProducts(product);
  const orderMessage = `Hi ${config.brandName}! Mujhe yeh order karna hai:\n\n🧶 ${product.name}\n💰 ${formatPrice(
    product.price
  )}\n\nKya yeh available hai?`;

  return (
    <div className="pt-10">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
      />
      <div className="container-px py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-cocoa/60 transition-colors hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          Shop par wapas
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-sand shadow-soft">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product.oldPrice && (
              <span className="absolute right-4 top-4 chip bg-cocoa text-cream">
                Save {formatPrice(product.oldPrice - product.price)}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="chip bg-sand capitalize text-cocoa/70">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 heading-serif text-4xl sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-semibold text-cocoa">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-cocoa/40 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-cocoa/70">
              {product.description}
            </p>

            <dl className="mt-8 space-y-4 rounded-3xl bg-sand/60 p-6">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <dt className="text-sm font-medium text-cocoa">Material</dt>
                  <dd className="text-sm text-cocoa/60">{product.material}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Ruler className="h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <dt className="text-sm font-medium text-cocoa">Size</dt>
                  <dd className="text-sm text-cocoa/60">{product.size}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Package className="h-5 w-5 shrink-0 text-terracotta" />
                <div>
                  <dt className="text-sm font-medium text-cocoa">
                    Availability
                  </dt>
                  <dd className="text-sm text-cocoa/60">
                    {product.madeToOrder
                      ? "Made to order · 3-5 din mein taiyaar"
                      : "Ready to ship"}
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={whatsappLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-8 w-full text-base"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp par order karo
            </a>

            <AddToCartButton product={product} className="mt-3 w-full text-base" />

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-2 text-sm text-cocoa/70">
                <Check className="h-4 w-4 text-sage" />
                100% handmade quality
              </li>
              <li className="flex items-center gap-2 text-sm text-cocoa/70">
                <Truck className="h-4 w-4 text-sage" />
                All-India delivery
              </li>
              <li className="flex items-center gap-2 text-sm text-cocoa/70">
                <Check className="h-4 w-4 text-sage" />
                Premium cotton yarn
              </li>
              <li className="flex items-center gap-2 text-sm text-cocoa/70">
                <Check className="h-4 w-4 text-sage" />
                Free shipping above ₹{config.freeShippingThreshold}
              </li>
            </ul>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="heading-serif text-3xl">Aapko yeh bhi pasand aayega</h2>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
