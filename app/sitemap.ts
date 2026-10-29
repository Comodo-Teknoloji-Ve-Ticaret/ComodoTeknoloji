import type { MetadataRoute } from "next";
import { publishedProducts } from "@/data/products";
import { publishedProjects } from "@/data/projects";
import { regions } from "@/data/regions";
import { sectors } from "@/data/sectors";
import { solutions } from "@/data/solutions";
import { publishedPosts } from "@/lib/content";
import { tools } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site";

const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Statik dışa aktarmada build sırasında dosyaya yazılır */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const e = (path: string, lastModified = BUILD_DATE, priority = 0.7): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
    alternates: { languages: { "tr-TR": absoluteUrl(path) } },
  });

  return [
    e("/", BUILD_DATE, 1),
    e("/ucretsiz-kesif", BUILD_DATE, 0.9),
    ...solutions.map((s) => e(`/cozumler/${s.slug}`, s.updatedAt, 0.9)),
    ...sectors.map((s) => e(`/sektorler/${s.slug}`, s.updatedAt, 0.8)),
    ...regions.map((r) => e(`/bolgeler/${r.slug}`, r.updatedAt, 0.8)),
    ...publishedProducts().map((p) => e(`/urunler/${p.slug}`, p.updatedAt, 0.8)),
    ...tools.map((t) => e(`/araclar/${t.slug}`, BUILD_DATE, 0.8)),
    e("/projeler"),
    ...publishedProjects().map((p) => e(`/projeler/${p.slug}`, p.updatedAt)),
    e("/bilgi-bankasi"),
    ...publishedPosts().map((p) => e(`/bilgi-bankasi/${p.slug}`, p.updated)),
    e("/bakim-ve-destek"),
    e("/hakkimizda", BUILD_DATE, 0.5),
    e("/iletisim", BUILD_DATE, 0.6),
    e("/kvkk", BUILD_DATE, 0.2),
    e("/cerez-politikasi", BUILD_DATE, 0.2),
  ];
}
