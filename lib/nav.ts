import { solutions } from "@/data/solutions";
import { sectors } from "@/data/sectors";

export const tools = [
  {
    slug: "ag-yenileme-hesaplayici",
    name: "Ağ Yenileme Tasarruf Hesaplayıcı",
    short: "Wi-Fi yenilemesinin iş gücü tasarrufunu ve önerilen AP sayısını hesaplayın.",
  },
  {
    slug: "cctv-planlayici",
    name: "CCTV Planlayıcı",
    short: "Kamera sayısı, lens, NVR kapasitesi, depolama ve PoE bütçesini hesaplayın.",
  },
  {
    slug: "5651-risk-testi",
    name: "5651 Risk Skor Kartı",
    short: "10 soruda 5651 loglama uyumluluk riskinizi öğrenin.",
  },
] as const;

export type ToolSlug = (typeof tools)[number]["slug"];

export const mainNav = [
  {
    label: "Çözümler",
    href: "/cozumler/web-tasarim",
    children: solutions.map((s) => ({ label: s.name, href: `/cozumler/${s.slug}`, description: s.excerpt })),
  },
  {
    label: "Sektörler",
    href: "/sektorler/otel-ve-resort",
    children: sectors.map((s) => ({ label: s.name, href: `/sektorler/${s.slug}`, description: s.excerpt })),
  },
  {
    label: "Araçlar",
    href: "/araclar/5651-risk-testi",
    children: tools.map((t) => ({ label: t.name, href: `/araclar/${t.slug}`, description: t.short })),
  },
  { label: "Projeler", href: "/projeler" },
  { label: "Bilgi Bankası", href: "/bilgi-bankasi" },
  { label: "Destek", href: "/bakim-ve-destek" },
];
