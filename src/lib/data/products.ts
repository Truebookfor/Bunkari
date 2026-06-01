import { supabase } from "@/lib/supabase/client";
import type { DBProduct } from "@/lib/supabase/types";
import {
  products as seedProducts,
  categories as seedCategories,
  type Product,
  type Category,
  type CategoryId,
} from "@/data/products";

// DB row ko UI Product type me badalna
function mapProduct(row: DBProduct): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    oldPrice: row.old_price ?? undefined,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : undefined,
    shortDescription: row.short_description,
    description: row.description,
    material: row.material,
    size: row.size,
    madeToOrder: row.made_to_order,
    tags: row.tags ?? [],
    featured: row.featured,
  };
}

// Supabase configure ho to wahan se, warna seed se.
export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return seedProducts;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return seedProducts;
  return (data as DBProduct[]).map(mapProduct);
}

export async function fetchProductsByCategory(
  category: CategoryId
): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.category === category);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.featured);
}

export async function fetchBestsellers(limit = 4): Promise<Product[]> {
  const all = await fetchProducts();
  const tagged = all.filter((p) => p.tags.includes("bestseller"));
  const list = tagged.length >= limit ? tagged : all;
  return list.slice(0, limit);
}

export async function fetchNewArrivals(limit = 4): Promise<Product[]> {
  const all = await fetchProducts();
  const tagged = all.filter((p) => p.tags.includes("new"));
  const list = tagged.length >= limit ? tagged : all.slice().reverse();
  return list.slice(0, limit);
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (!supabase) return seedProducts.find((p) => p.slug === slug);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) return seedProducts.find((p) => p.slug === slug);
  return mapProduct(data as DBProduct);
}

export async function fetchRelatedProducts(
  product: Product,
  limit = 3
): Promise<Product[]> {
  const all = await fetchProducts();
  return all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export async function fetchCategories(): Promise<Category[]> {
  // Categories abhi static rakhi hain (4 fixed lines)
  return seedCategories;
}

export { type Product, type Category, type CategoryId };
