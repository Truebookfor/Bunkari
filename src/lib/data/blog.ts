import { supabase } from "@/lib/supabase/client";
import type { DBBlogPost } from "@/lib/supabase/types";

// E-E-A-T friendly seed posts (Experience, Expertise, Authoritativeness, Trust).
// Supabase configure hone par DB se aayenge, warna yeh dikhenge.
const seedPosts: DBBlogPost[] = [
  {
    id: "seed-1",
    slug: "crochet-flowers-care-guide",
    title: "Crochet Phoolon Ki Dekhbhaal: Saalon Tak Naye Jaise",
    excerpt:
      "Haath se bune crochet phool barson tak taaza dikhein — dhool, dhup aur nami se bachaane ke aasaan tareeke.",
    cover_image:
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=1200&q=80",
    author_name: "Aanchal",
    author_role: "Head Crochet Artisan, 8+ saal ka anubhav",
    tags: ["care", "flowers", "tips"],
    reading_minutes: 5,
    published: true,
    published_at: "2024-11-10T00:00:00.000Z",
    created_at: "2024-11-10T00:00:00.000Z",
    content: `## Crochet phool kyun special hote hain\nAsli phool kuch din mein murjha jaate hain, lekin haath se bune crochet phool barson tak waise hi rehte hain — agar thodi si dekhbhaal ki jaaye. Hamari har kaari premium cotton yarn se banti hai, isliye sahi care se yeh generations tak chal sakti hai.\n\n## Dhool se kaise bachayein\nHafte mein ek baar mulayam, sookhe brush ya makeup brush se halke se dust karein. Zyaada gandagi ho to hair dryer ko "cool" setting par rakh kar door se hawa dein.\n\n## Nami aur dhup se door rakhein\nSeedhi dhup mein rakhne se yarn ke rang halke pad sakte hain. Inhe indoor, hawadaar jagah par rakhein. Monsoon mein nami se bachane ke liye ek silica gel packet paas rakhein.\n\n## Dhone ki zaroorat ho to\nAgar zaroori ho to thande paani mein halka mild detergent daalein, gently dabaakar dhoyein — ragdein nahi. Chhaaya mein sukhaayein, machine mein kabhi nahi.\n\n## Sahej kar rakhein\nLambe samay tak store karna ho to acid-free tissue mein lapet kar ek box mein rakhein. Yeh shape bhi banaye rakhta hai.`,
  },
  {
    id: "seed-2",
    slug: "handmade-gift-ideas-india",
    title: "Har Mauke Ke Liye Handmade Gift Ideas",
    excerpt:
      "Anniversary se lekar baby shower tak — crochet gifts kyun sabse personal aur yaadgaar tohfe hote hain.",
    cover_image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    author_name: "Aanchal",
    author_role: "Head Crochet Artisan",
    tags: ["gifting", "ideas"],
    reading_minutes: 4,
    published: true,
    published_at: "2024-11-25T00:00:00.000Z",
    created_at: "2024-11-25T00:00:00.000Z",
    content: `## Handmade gift hamesha yaad rehta hai\nMarket ka koi bhi gift mil sakta hai, lekin haath se bana tohfa dil se juda hota hai. Har taanka pyaar aur waqt ka nishaan hota hai.\n\n## Anniversary aur Valentine\nForever Rose Bouquet sabse popular hai — kyunki yeh pyaar ki tarah kabhi murjhata nahi. Couple dolls bhi customize karwa sakte hain.\n\n## Baby shower aur new mom\nSoft booties, rattle aur headband ka set naye mehmaan ke liye perfect hai. Cotton yarn skin-friendly hota hai.\n\n## Birthday aur festivals\nAmigurumi toys aur cute keychains chhote-bade sabko pasand aate hain. Gift combo box ready-to-gift hota hai.\n\n## Personal touch jodein\nHar order ke saath ek handwritten note free hai — bas order karte waqt bata dein.`,
  },
  {
    id: "seed-3",
    slug: "behind-the-scenes-village-artisans",
    title: "Hamari Kahani: Gaon Ki Ladkiyon Ke Haathon Ka Hunar",
    excerpt:
      "Har product ke peeche ek mehnat, ek sapna aur ek aatmnirbhar hone ki kahani chhupi hai.",
    cover_image:
      "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=1200&q=80",
    author_name: "Team",
    author_role: "Founder",
    tags: ["story", "behind-the-scenes"],
    reading_minutes: 6,
    published: true,
    published_at: "2024-12-05T00:00:00.000Z",
    created_at: "2024-12-05T00:00:00.000Z",
    content: `## Shuruaat\nYeh sirf ek store nahi, ek movement hai. Hamare gaon ki kai ladkiyan ghar baithe apne hunar se kamaai karti hain, aur aapka har order unhe aatmnirbhar banata hai.\n\n## Quality par koi samjhauta nahi\nHum sirf premium cotton yarn use karte hain. Har product banne ke baad do baar check hota hai — taaki aapke haath tak best hi pahunche.\n\n## Made to order ka matlab\nKai products order milne par banaye jaate hain. Isse waste kam hota hai aur aapko fresh, customised piece milta hai.\n\n## Aapka support, unka future\nJab aap ek crochet phool khareedte hain, aap sirf ek product nahi — ek ladki ki padhai, ek parivaar ki ummeed support karte hain. Dhanyavaad.`,
  },
];

function sortByDate(posts: DBBlogPost[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function fetchBlogPosts(): Promise<DBBlogPost[]> {
  if (!supabase) return sortByDate(seedPosts);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return sortByDate(seedPosts);
  return data as DBBlogPost[];
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<DBBlogPost | undefined> {
  if (!supabase) return seedPosts.find((p) => p.slug === slug);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return seedPosts.find((p) => p.slug === slug);
  return data as DBBlogPost;
}

export { seedPosts };
