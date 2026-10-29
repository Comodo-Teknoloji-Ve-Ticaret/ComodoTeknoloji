import type { Metadata } from "next";
import { ogImagePath } from "./og";
import { absoluteUrl, site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Tüm sayfalar için tutarlı metadata: canonical, hreflang (tr + gelecekte en/de/ru),
 * Open Graph ve Twitter kartı. OG görseli build sırasında /og/<anahtar>.png olarak üretilir (lib/og.ts).
 */
export function pageMetadata({ title, description, path, noindex, ogType = "website", publishedTime, modifiedTime }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const og = absoluteUrl(ogImagePath(path));
  // Marka adı, toplam 60 karakteri aşmıyorsa başlığa eklenir (NAP tutarlılığı + SERP kırpılmasını önleme)
  const branded = `${title} | ${site.shortName}`;
  const fullTitle = title.includes(site.shortName) || branded.length > 60 ? title : branded;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": url,
        "x-default": url,
        // İleride: "en": absoluteUrl(`/en${path}`), "de": ..., "ru": ...
      },
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
      ...(ogType === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}
