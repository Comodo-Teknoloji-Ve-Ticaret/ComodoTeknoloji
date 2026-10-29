import type { Product } from "./types";

/**
 * ÜRÜN VERİLERİ
 * Yeni ürün eklemek için bu diziye bir obje eklemeniz yeterli.
 * Özellik ve fiyat bilgilerini YALNIZCA resmi üretici/distribütör kaynaklarından alın;
 * kaynakları `sources` alanına yazın. Bilinmeyen alanlar "[DOLDURULACAK]" kalmalı.
 * status: "draft" olan ürünler noindex'tir, sitemap ve llms.txt'ye girmez.
 */
const T = "[DOLDURULACAK]";

export const products: Product[] = [
  {
    slug: "comodo-xcitium",
    status: "draft",
    name: "[DOLDURULACAK: Comodo / Xcitium ürün adı]",
    brand: "Xcitium (Comodo)",
    category: "Uç nokta güvenliği (EDR)",
    kind: "SoftwareApplication",
    operatingSystem: "[DOLDURULACAK: desteklenen işletim sistemleri]",
    metaTitle: "Comodo / Xcitium Uç Nokta Güvenliği | Antalya",
    metaDescription:
      "Comodo / Xcitium uç nokta güvenliği lisansı, kurulumu ve Türkçe destek. Antalya'da yerinde kurulum ve yönetim. Demo ve teklif isteyin.",
    oneLiner:
      "[DOLDURULACAK: Ürün adı], bilgisayar ve sunucu kullanan işletmeler için bilinmeyen dosyaları izole ederek fidye yazılımı ve zararlılara karşı koruma sağlayan bir uç nokta güvenliği (EDR) çözümüdür.",
    audience: ["Oteller", "Fabrikalar", "Ofisler ve muhasebe büroları", "Klinikler"],
    problems: [
      { title: "Bilinmeyen dosyalar", text: "İmzası henüz bilinmeyen zararlılar klasik antivirüsü atlatabilir." },
      { title: "Fidye yazılımı riski", text: "Tek bir kullanıcının açtığı ek, paylaşılan tüm dosyaları kilitleyebilir." },
      { title: "Dağınık yönetim", text: "Her bilgisayarda farklı sürüm ve ayar, merkezi görünürlüğü yok eder." },
    ],
    features: {
      caption: "Özellikler (kaynak: üretici dokümantasyonu — doğrulanacak)",
      head: ["Özellik", "Açıklama"],
      rows: [
        ["Otomatik izolasyon (containment)", `${T}: üretici datasheet'inden doğrulayın`],
        ["EDR / olay kaydı", T],
        ["Merkezi yönetim konsolu", T],
        ["Desteklenen işletim sistemleri", T],
        ["Bulut / yerel kurulum seçenekleri", T],
      ],
    },
    comparison: {
      caption: "Paketler arası farklar",
      head: ["Özellik", `${T}: Paket 1`, `${T}: Paket 2`],
      rows: [
        ["Antivirüs / zararlı koruma", T, T],
        ["Containment", T, T],
        ["EDR", T, T],
        ["Yönetilen hizmet (MDR)", T, T],
      ],
    },
    pricing: {
      model: "[DOLDURULACAK: lisans modeli, örn. cihaz başı yıllık abonelik]",
      startingPrice: null,
      priceRange: null,
      factors: ["Korunacak cihaz (uç nokta) sayısı", "Paket seviyesi", "Lisans süresi", "Kurulum ve yönetim hizmeti kapsamı"],
    },
    setupSteps: [
      { title: "Envanter", text: "Korunacak bilgisayar ve sunucuların listesi çıkarılır." },
      { title: "Konsol kurulumu", text: "Yönetim konsolu hazırlanır, politika şablonları işletmenize göre ayarlanır." },
      { title: "Ajan dağıtımı", text: "Ajan cihazlara uzaktan veya yerinde kurulur; eski antivirüs kaldırılır." },
      { title: "Test ve ince ayar", text: "İş uygulamalarınızın yanlış pozitif vermediği doğrulanır." },
      { title: "Devir ve izleme", text: "Raporlama ve alarm akışı devreye alınır, ekibinize kısa eğitim verilir." },
    ],
    whyUs: [
      "Antalya'da yerinde kurulum ve müdahale",
      "Türkçe destek ve yerel faturalandırma",
      "Firewall ve yedekleme ile birlikte katmanlı güvenlik kurgusu",
    ],
    faqs: [
      { q: "Mevcut antivirüsümüzü kaldırmamız gerekir mi?", a: "Genellikle iki uç nokta güvenlik ürünü birlikte çalıştırılmaz; geçiş sırasında eski ürün kontrollü olarak kaldırılır." },
      { q: "Lisans süresi ne kadar?", a: "[DOLDURULACAK: lisans süreleri]" },
      { q: "Demo sürümü var mı?", a: "[DOLDURULACAK: deneme/demo koşulları]" },
    ],
    sources: [
      { label: "Xcitium resmi sitesi", url: "https://www.xcitium.com" },
      { label: "Comodo resmi sitesi", url: "https://www.comodo.com" },
    ],
    relatedSolutions: ["siber-guvenlik"],
    updatedAt: "2026-10-24",
  },
  {
    slug: "ejder-3",
    status: "draft",
    name: "Ejder 3",
    brand: "[DOLDURULACAK: üretici]",
    category: "[DOLDURULACAK: ürün kategorisi]",
    kind: "Product",
    metaTitle: "Ejder 3 Satış, Kurulum ve Destek | Antalya",
    metaDescription:
      "Ejder 3 satış, kurulum ve teknik destek. Antalya'da yerinde kurulum, Türkçe destek. Demo ve teklif isteyin.",
    oneLiner: "Ejder 3, [DOLDURULACAK: hedef kitle] için [DOLDURULACAK: ana işlev] sağlayan [DOLDURULACAK: kategori] çözümüdür.",
    audience: [T],
    problems: [
      { title: T, text: T },
      { title: T, text: T },
      { title: T, text: T },
    ],
    features: {
      caption: "Özellikler (kaynak: üretici dokümantasyonu)",
      head: ["Özellik", "Açıklama"],
      rows: [
        [T, T],
        [T, T],
        [T, T],
      ],
    },
    comparison: {
      caption: "Ejder 3 ve alternatifler",
      head: ["Özellik", "Ejder 3", `${T}: Alternatif`],
      rows: [
        [T, T, T],
        [T, T, T],
      ],
    },
    pricing: {
      model: T,
      startingPrice: null,
      priceRange: null,
      factors: [T],
    },
    setupSteps: [
      { title: "Keşif", text: "İhtiyaç ve mevcut altyapı incelenir." },
      { title: "Kurulum", text: T },
      { title: "Test ve devir", text: T },
    ],
    whyUs: ["Antalya'da yerinde kurulum ve müdahale", "Türkçe destek", "Diğer sistemlerinizle entegre kurulum"],
    faqs: [
      { q: "Ejder 3 nedir?", a: T },
      { q: "Ejder 3 kurulumu ne kadar sürer?", a: T },
      { q: "Ejder 3 fiyatı neye göre belirlenir?", a: T },
    ],
    sources: [{ label: "[DOLDURULACAK: üretici resmi sayfası]", url: "" }],
    relatedSolutions: ["5651-loglama-hotspot"],
    updatedAt: "2026-10-24",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const publishedProducts = () => products.filter((p) => p.status === "published");
