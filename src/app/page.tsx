import { Hero3D } from "@/components/sections/Hero3D";
import { CategoryPills } from "@/components/sections/CategoryPills";
import { ProductRail } from "@/components/sections/ProductRail";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { OfferBanner } from "@/components/sections/OfferBanner";
import {
  fetchProducts,
  fetchBestsellers,
  fetchNewArrivals,
} from "@/lib/data/products";

export default async function HomePage() {
  const [all, bestsellers, newArrivals] = await Promise.all([
    fetchProducts(),
    fetchBestsellers(4),
    fetchNewArrivals(4),
  ]);

  return (
    <>
      <Hero3D />
      <CategoryPills />
      <ProductRail
        eyebrow="Most loved"
        title="Bestsellers"
        products={bestsellers}
        tone="sand"
      />
      <ProductRail
        eyebrow="Fresh drop"
        title="Naye Arrivals"
        products={newArrivals}
      />
      <OfferBanner />
      <ProductGrid
        eyebrow="All products"
        title="Saari Collection"
        products={all}
      />
    </>
  );
}
