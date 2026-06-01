import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase/server";
import { isSupabaseAdminConfigured } from "@/lib/env";
import { fetchProducts } from "@/lib/data/products";
import { fetchBlogPosts } from "@/lib/data/blog";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { DBOrder } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminAuthenticated()) {
    return (
      <div className="pt-8">
        <AdminLogin />
      </div>
    );
  }

  let orders: DBOrder[] = [];
  const admin = getAdminClient();
  if (admin) {
    const { data } = await admin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) orders = data as DBOrder[];
  }

  const [products, posts] = await Promise.all([
    fetchProducts(),
    fetchBlogPosts(),
  ]);

  return (
    <div className="pt-8">
      <AdminDashboard
        orders={orders}
        productCount={products.length}
        postCount={posts.length}
        supabaseReady={isSupabaseAdminConfigured}
      />
    </div>
  );
}
