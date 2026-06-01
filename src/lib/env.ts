// Central jagah jahan se pata chalta hai kaunse features configure hue hain.
// Keys na hone par site local seed data + WhatsApp order par gracefully chalti hai.

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
  adminPassword: process.env.ADMIN_PASSWORD,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
);

export const isSupabaseAdminConfigured = Boolean(
  env.supabaseUrl && env.supabaseServiceKey
);

export const isRazorpayConfigured = Boolean(
  env.razorpayKeyId && env.razorpayKeySecret
);
