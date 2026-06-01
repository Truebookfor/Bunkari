-- ============================================================================
-- CROCHET STORE — Supabase Schema
-- Supabase dashboard > SQL Editor me yeh poora paste karke "Run" karo.
-- ============================================================================

-- ---- PRODUCTS ----
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('flowers','amigurumi','keychains','combo')),
  price integer not null,
  old_price integer,
  image text not null,
  gallery text[] default '{}',
  short_description text not null default '',
  description text not null default '',
  material text not null default '',
  size text not null default '',
  made_to_order boolean not null default false,
  tags text[] default '{}',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured);

-- ---- BLOG POSTS ----
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text not null default '',
  author_name text not null default 'Team',
  author_role text not null default 'Crochet Artisan',
  tags text[] default '{}',
  reading_minutes integer not null default 4,
  published boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists blog_published_idx on public.blog_posts (published);

-- ---- ORDERS ----
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  address text,
  city text,
  state text,
  pincode text,
  items jsonb not null default '[]',
  subtotal integer not null default 0,
  shipping integer not null default 0,
  total integer not null default 0,
  payment_method text not null default 'whatsapp' check (payment_method in ('whatsapp','razorpay','cod')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

-- ---- CONTACT MESSAGES ----
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.products enable row level security;
alter table public.blog_posts enable row level security;
alter table public.orders enable row level security;
alter table public.contact_messages enable row level security;

-- Products: sab padh sakte hain (sirf active)
drop policy if exists "public read active products" on public.products;
create policy "public read active products" on public.products
  for select using (active = true);

-- Blog: sab padh sakte hain (sirf published)
drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts" on public.blog_posts
  for select using (published = true);

-- Orders: koi bhi naya order daal sakta hai (checkout), padh nahi sakta
drop policy if exists "anyone can create order" on public.orders;
create policy "anyone can create order" on public.orders
  for insert with check (true);

-- Contact: koi bhi message bhej sakta hai
drop policy if exists "anyone can send message" on public.contact_messages;
create policy "anyone can send message" on public.contact_messages
  for insert with check (true);

-- NOTE: Admin reads/writes service_role key se hote hain jo RLS bypass karti hai.
