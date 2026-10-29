import "server-only";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { regions } from "@/data/regions";
import { sectors } from "@/data/sectors";
import { solutions } from "@/data/solutions";
import { getAllPosts } from "./content";
import { tools } from "./nav";

/**
 * Paylaşım (Open Graph) görselleri statik sitede build sırasında dosya olarak üretilir:
 *   /og/<anahtar>.png   (app/og/[key]/route.tsx)
 * Bu liste hem üreticiye hem de sayfa meta etiketlerine (lib/seo.ts) kaynaklık eder.
 */
export const ogKey = (path: string) => (path === "/" ? "ana-sayfa" : path.replace(/^\/|\/$/g, "").replace(/\//g, "--"));

let cache: { key: string; title: string }[] | null = null;

export function ogPages() {
  if (cache) return cache;
  const list: [string, string][] = [
    ["/", "Antalya'da Web Sitesi, Güvenlik Kamerası ve Yazılım"],
    ["/ucretsiz-kesif", "Ücretsiz Keşif ve Saha Denetimi"],
    ["/projeler", "Projeler: Web Sitesi, Yazılım ve Altyapı"],
    ["/bilgi-bankasi", "Bilgi Bankası: Web, Kamera ve Altyapı Rehberleri"],
    ["/bakim-ve-destek", "Bakım ve Destek: SLA Paketleri"],
    ["/hakkimizda", "Hakkımızda: Antalya Teknoloji ve Güvenlik Firması"],
    ["/iletisim", "İletişim: Muratpaşa / Antalya"],
    ["/kvkk", "KVKK Aydınlatma Metni"],
    ["/cerez-politikasi", "Çerez Politikası"],
    ["/tesekkurler", "Talebiniz alındı"],
    ...solutions.map((s): [string, string] => [`/cozumler/${s.slug}`, s.h1]),
    ...sectors.map((s): [string, string] => [`/sektorler/${s.slug}`, s.h1]),
    ...regions.map((r): [string, string] => [`/bolgeler/${r.slug}`, r.h1]),
    ...tools.map((t): [string, string] => [`/araclar/${t.slug}`, t.name]),
    ...products.map((p): [string, string] => [`/urunler/${p.slug}`, p.name]),
    ...projects.map((p): [string, string] => [`/projeler/${p.slug}`, p.title]),
    ...getAllPosts().map((p): [string, string] => [`/bilgi-bankasi/${p.slug}`, p.title]),
  ];
  cache = list.map(([path, title]) => ({ key: ogKey(path), title }));
  return cache;
}

/** Sayfanın OG görsel yolu; listede yoksa ana sayfa görseli */
export function ogImagePath(path: string) {
  const key = ogKey(path);
  return `/og/${ogPages().some((p) => p.key === key) ? key : "ana-sayfa"}.png`;
}
