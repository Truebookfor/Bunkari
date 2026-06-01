export type CategoryId = "flowers" | "amigurumi" | "keychains" | "combo";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  image: string;
  gallery?: string[];
  shortDescription: string;
  description: string;
  material: string;
  size: string;
  madeToOrder: boolean;
  tags: ("bestseller" | "new" | "premium")[];
  featured?: boolean;
  rating?: number;
  reviews?: number;
}

export const categories: Category[] = [
  {
    id: "flowers",
    name: "Flowers & Bouquets",
    tagline: "Jo kabhi murjhate nahi",
    description:
      "Haath se buna har phool — taaza jaisa, hamesha ke liye. Gift, decor ya pyaar ka izhaar.",
    image:
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "amigurumi",
    name: "Amigurumi Toys",
    tagline: "Soft, pyaare, handmade",
    description:
      "Har toy ghante bhar ki mehnat se bana — bachchon aur gifting ke liye perfect.",
    image:
      "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "keychains",
    name: "Keychains & Charms",
    tagline: "Chhote, pyaare, har roz ke saath",
    description:
      "Bag, chaabi ya gift — har jagah jaane wale mini handmade charms.",
    image:
      "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "combo",
    name: "Gift Combos",
    tagline: "Soch-samajh kar banaye gift sets",
    description:
      "Ready-to-gift handmade combos — khaaskar mauke ke liye taiyaar.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products: Product[] = [
  // ---------------- FLOWERS & BOUQUETS ----------------
  {
    slug: "forever-rose-bouquet",
    name: "Forever Rose Bouquet",
    category: "flowers",
    price: 749,
    oldPrice: 999,
    image:
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "7 haath se bune gulab, wrapping ke saath.",
    description:
      "Saat naram crochet gulab, premium cotton yarn se bane, elegant wrapping aur ribbon ke saath. Yeh bouquet kabhi murjhata nahi — saalon tak taaza jaisa dikhega. Anniversary, birthday ya 'I love you' kehne ka sabse pyaara tareeka.",
    material: "100% premium cotton yarn, floral wrap, satin ribbon",
    size: "Approx. 30 cm lamba bouquet",
    madeToOrder: true,
    tags: ["bestseller", "premium"],
    featured: true,
  },
  {
    slug: "single-tulip-stem",
    name: "Single Tulip Stem",
    category: "flowers",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Ek pyaara tulip, gift wrap ke saath.",
    description:
      "Akela crochet tulip stem, soft pastel shades mein. Chhota, pyaara aur budget-friendly gift — ya apne study table ko sajaane ke liye.",
    material: "100% cotton yarn, floral wire stem",
    size: "Approx. 28 cm lambai",
    madeToOrder: false,
    tags: ["new"],
    featured: true,
  },
  {
    slug: "sunflower-trio",
    name: "Sunflower Trio",
    category: "flowers",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Teen chamakte sunflowers ka bunch.",
    description:
      "Teen handmade sunflowers ka khushnuma bunch — kisi bhi kone ko roshan kar de. Mustard aur sage tones ghar ko warm feel dete hain.",
    material: "100% cotton yarn, wired stems",
    size: "Approx. 32 cm lambai",
    madeToOrder: true,
    tags: ["bestseller"],
  },
  {
    slug: "potted-succulent",
    name: "Crochet Potted Succulent",
    category: "flowers",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Mini crochet plant — paani ki zaroorat nahi.",
    description:
      "Ek pyaara crochet succulent, chhote gamle mein. Desk, shelf ya windowsill ke liye perfect — kabhi sookhega nahi, hamesha hara-bhara.",
    material: "Cotton yarn, mini pot, stuffing",
    size: "Approx. 12 cm height",
    madeToOrder: false,
    tags: ["new"],
  },
  {
    slug: "lavender-bunch",
    name: "Lavender Bunch",
    category: "flowers",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Soft lavender stems ka shaant bunch.",
    description:
      "Naram lavender ka handmade bunch — soothing purple tones ke saath. Bedroom ya study ke liye calm, elegant decor.",
    material: "100% cotton yarn, wired stems",
    size: "Approx. 30 cm lambai",
    madeToOrder: true,
    tags: ["premium"],
  },

  // ---------------- AMIGURUMI TOYS ----------------
  {
    slug: "bunny-amigurumi",
    name: "Cuddle Bunny",
    category: "amigurumi",
    price: 549,
    oldPrice: 699,
    image:
      "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Naram, gale lagane wala crochet bunny.",
    description:
      "Pyaara handmade bunny, soft stuffing ke saath — bachchon ke liye safe aur cuddly. Har bunny ghante bhar ki mehnat se banta hai, isliye har ek thoda unique hota hai.",
    material: "Soft acrylic-cotton blend yarn, hypoallergenic fiber fill, safety eyes",
    size: "Approx. 18 cm tall",
    madeToOrder: true,
    tags: ["bestseller", "premium"],
    featured: true,
  },
  {
    slug: "baby-elephant",
    name: "Baby Elephant",
    category: "amigurumi",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Pyaara sa crochet haathi.",
    description:
      "Ek naram baby elephant, sage green tones mein. Nursery decor ya naye mehmaan ke liye sabse pyaara gift.",
    material: "Soft cotton yarn, fiber fill, safety eyes",
    size: "Approx. 16 cm tall",
    madeToOrder: true,
    tags: ["new"],
  },
  {
    slug: "ice-cream-toy",
    name: "Ice Cream Cone Toy",
    category: "amigurumi",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Mithaas wala crochet ice cream.",
    description:
      "Ek khushnuma ice cream cone toy — playtime ya shelf decor ke liye. Chhota, halka aur pyaara.",
    material: "Cotton yarn, fiber fill",
    size: "Approx. 14 cm tall",
    madeToOrder: false,
    tags: ["new"],
  },
  {
    slug: "couple-dolls",
    name: "Couple Dolls Set",
    category: "amigurumi",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Customizable couple doll jodi.",
    description:
      "Do handmade dolls ki pyaari jodi — anniversary ya wedding gift ke liye. Outfit colors customize karwa sakte ho (order par batayein).",
    material: "Cotton yarn, fiber fill, fabric accents",
    size: "Approx. 20 cm each",
    madeToOrder: true,
    tags: ["premium"],
  },

  // ---------------- KEYCHAINS & CHARMS ----------------
  {
    slug: "mini-bear-keychain",
    name: "Mini Bear Keychain",
    category: "keychains",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Chhota teddy charm, bag ke liye.",
    description:
      "Ek mini bear keychain — bag, chaabi ya pencil pouch ke liye pyaara saathi. Sasta, halka aur perfect chhota gift.",
    material: "Cotton yarn, fiber fill, metal keyring",
    size: "Approx. 7 cm",
    madeToOrder: false,
    tags: ["bestseller"],
    featured: true,
  },
  {
    slug: "daisy-keychain",
    name: "Daisy Flower Keychain",
    category: "keychains",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Khushnuma daisy charm.",
    description:
      "Ek pyaari daisy keychain — har roz thodi si dhoop. Bag ya keys par lagao aur muskurao.",
    material: "Cotton yarn, metal keyring",
    size: "Approx. 6 cm",
    madeToOrder: false,
    tags: ["new"],
  },
  {
    slug: "strawberry-charm",
    name: "Strawberry Charm",
    category: "keychains",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Juicy strawberry bag charm.",
    description:
      "Ek pyaara strawberry charm — bag ko thoda fun banao. Halka aur all-India shippable.",
    material: "Cotton yarn, fiber fill, metal clasp",
    size: "Approx. 6 cm",
    madeToOrder: false,
    tags: ["bestseller"],
  },
  {
    slug: "heart-keychain-pair",
    name: "Heart Keychain Pair",
    category: "keychains",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Couple ke liye matching dil.",
    description:
      "Do matching heart keychains ki jodi — best friends ya couple ke liye. Ek tum rakho, ek unhe do.",
    material: "Cotton yarn, fiber fill, metal keyrings",
    size: "Approx. 6 cm each",
    madeToOrder: false,
    tags: ["new"],
  },

  // ---------------- GIFT COMBOS ----------------
  {
    slug: "forever-bouquet-combo",
    name: "Forever Gift Box",
    category: "combo",
    price: 899,
    oldPrice: 1150,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Mini bouquet + keychain + handwritten card.",
    description:
      "Ek mini crochet bouquet, ek matching keychain aur ek handwritten note — sab kuch ek elegant gift box mein. Bilkul ready-to-gift.",
    material: "Cotton yarn items, kraft gift box, card",
    size: "Gift box approx. 22 x 16 cm",
    madeToOrder: true,
    tags: ["bestseller", "premium"],
    featured: true,
  },
  {
    slug: "new-mom-box",
    name: "New Mom Gift Box",
    category: "combo",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Booties + rattle + headband set.",
    description:
      "Naye mehmaan aur maa ke liye ek pyaara set — crochet booties, ek soft rattle aur ek headband. Sab kuch gift box mein.",
    material: "Soft cotton yarn, gift box",
    size: "0-6 months baby sizing",
    madeToOrder: true,
    tags: ["premium"],
  },
];

export function getProductsByCategory(category: CategoryId): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
