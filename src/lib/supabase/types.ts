export type CategoryId = "flowers" | "amigurumi" | "keychains" | "combo";

export type ProductTag = "bestseller" | "new" | "premium";

export interface DBProduct {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  old_price: number | null;
  image: string;
  gallery: string[];
  short_description: string;
  description: string;
  material: string;
  size: string;
  made_to_order: boolean;
  tags: ProductTag[];
  featured: boolean;
  active: boolean;
  created_at: string;
}

export interface DBBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  author_role: string;
  tags: string[];
  reading_minutes: number;
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface DBOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: "whatsapp" | "razorpay" | "cod";
  payment_status: "pending" | "paid" | "failed";
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: "new" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes: string | null;
  created_at: string;
}
