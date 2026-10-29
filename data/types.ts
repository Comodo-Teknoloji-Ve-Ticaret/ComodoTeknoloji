import type { IconName } from "@/lib/icons";

export type Faq = { q: string; a: string };

export type DataTableT = {
  caption: string;
  head: string[];
  rows: string[][];
};

/** Soru formatında H2 + ilk cümlesi doğrudan cevap olan içerik bloğu (GEO) */
export type QaSection = {
  h2: string;
  answer: string;
  body?: string;
  bullets?: string[];
  table?: DataTableT;
};

export type Solution = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  icon: IconName;
  excerpt: string;
  /** 40–60 kelimelik, bağlamından koparılsa da anlamlı tanım */
  definition: string;
  serviceType: string;
  audience: string[];
  problems: { title: string; text: string }[];
  sections: QaSection[];
  /** Scroll'a bağlı süreç akışı (isteğe bağlı) */
  process?: { title: string; steps: { title: string; text: string }[] };
  comparison: DataTableT;
  priceFactors: DataTableT;
  faqs: Faq[];
  relatedSectors: string[];
  relatedTools: string[];
  relatedRegions: string[];
  relatedProducts?: string[];
  updatedAt: string;
};

export type Sector = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  icon: IconName;
  excerpt: string;
  definition: string;
  pains: { title: string; text: string }[];
  solutions: string[];
  sections: QaSection[];
  objections: Faq[];
  faqs: Faq[];
  relatedTools: string[];
  relatedRegions: string[];
  updatedAt: string;
};

export type Region = {
  slug: string;
  name: string;
  /** Bulunma hâli: "Belek'te", "Manavgat'ta", "Konyaaltı'nda" */
  locative: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  definition: string;
  profile: string;
  typicalBusinesses: string[];
  needs: { title: string; text: string }[];
  solutions: string[];
  sectors: string[];
  /** Gerçek müdahale süresi taahhüdünüz, örn. "Acil arızada en geç 4 saat içinde sahada" */
  responseTime: string;
  faqs: Faq[];
  nearby: string[];
  updatedAt: string;
};

export type Product = {
  slug: string;
  /** published olmayan ürünler noindex olur, sitemap ve llms.txt'ye girmez */
  status: "draft" | "published";
  name: string;
  brand: string;
  category: string;
  kind: "SoftwareApplication" | "Product";
  operatingSystem?: string;
  metaTitle: string;
  metaDescription: string;
  /** "[Ürün], [hedef kitle] için [ana işlev] sağlayan [kategori] çözümüdür." */
  oneLiner: string;
  audience: string[];
  problems: { title: string; text: string }[];
  features: DataTableT;
  comparison: DataTableT;
  pricing: {
    model: string;
    startingPrice: number | null;
    priceRange?: { min: number; max: number } | null;
    factors: string[];
  };
  setupSteps: { title: string; text: string }[];
  whyUs: string[];
  faqs: Faq[];
  sources: { label: string; url: string }[];
  relatedSolutions: string[];
  updatedAt: string;
};

export type Project = {
  slug: string;
  status: "draft" | "published";
  title: string;
  client: string;
  sector: string;
  region: string;
  summary: string;
  problem: string;
  solution: string;
  scope: { label: string; value: string }[];
  duration: string;
  results: { metric: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
  gallery: { src: string; alt: string }[];
  solutions: string[];
  updatedAt: string;
};
