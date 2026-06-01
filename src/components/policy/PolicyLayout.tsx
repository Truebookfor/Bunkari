import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PolicyLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-10">
      <div className="container-px py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cocoa/60 transition-colors hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          Home par wapas
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <h1 className="heading-serif text-4xl sm:text-5xl">{title}</h1>
          {updated && (
            <p className="mt-2 text-sm text-cocoa/50">
              Last updated: {updated}
            </p>
          )}
          <div className="prose-policy mt-8 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PolicySection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="heading-serif text-2xl text-cocoa">{heading}</h2>
      <div className="space-y-3 leading-relaxed text-cocoa/75">{children}</div>
    </section>
  );
}
