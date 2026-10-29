/**
 * FİRMA BİLGİLERİ — TEK DOĞRULUK KAYNAĞI (NAP)
 * Ad, adres ve telefon tüm sayfalarda, JSON-LD'de, llms.txt'de ve dış profillerde
 * birebir aynı olmalıdır. Köşeli parantezli tüm alanları Google İşletme Profili ile
 * aynı olacak şekilde doldurun.
 */
export const TODO = "[DOLDURULACAK]";

export const site = {
  /** Google İşletme Profili'ndeki adla birebir aynı olmalı */
  name: "Comodo Teknoloji",
  /** [DOLDURULACAK: ticaret sicil gazetesindeki unvanla birebir doğrulayın] */
  legalName: "Comodo Teknoloji Ticaret Limited Şirketi",
  shortName: "Comodo Teknoloji",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://comodoteknoloji.com").replace(/\/$/, ""),
  description:
    "Antalya merkezli teknoloji firması: kurumsal web sitesi, güvenlik kamerası, yazılım, bilişim altyapısı (network, zayıf akım, 5651) ve danışmanlık hizmetlerini işletmelere tek elden sunar.",
  slogan: "Ağınızın bekçisi. Tek muhatap, sıfır kesinti.",
  locale: "tr_TR",
  address: {
    /** [DOLDURULACAK: kapı numarası varsa ekleyin — Google İşletme Profili ile birebir aynı olmalı] */
    street: "Kızılsaray, Şarampol Cd Burak Apt",
    district: "Muratpaşa",
    postalCode: "07000",
    city: "Antalya",
    region: "Antalya",
    country: "TR",
  },
  geo: { lat: null as number | null, lng: null as number | null },
  phone: "0507 850 52 87",
  /** E.164 biçimi (şema ve tel: linkleri için) */
  phoneE164: "+905078505287",
  /** Sadece rakam, ülke kodu dahil: 905xxxxxxxxx */
  whatsapp: "905078505287",
  emergencyPhone: "0507 850 52 87",
  /** Not: kurumsal alan adlı bir adres (info@comodoteknoloji.com) güven ve teslim edilebilirlik için önerilir */
  email: "comodoteknoloji@gmail.com",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
  ],
  openingHoursText: "Pzt–Cmt 09:00–18:00 · 7/24 acil destek hattı",
  priceRange: "₺₺–₺₺₺",
  foundingYear: null as number | null,
  sameAs: [
    // "https://www.linkedin.com/company/...",
    // "https://www.instagram.com/...",
    // "https://x.com/...",
    // "https://maps.google.com/?cid=...",
    // "Ticaret Odası kayıt sayfası URL'si",
  ] as string[],
  /** Google İşletme Profili'nin kısa linki (maps.app.goo.gl/...) varsa bununla değiştirin */
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Kızılsaray, Şarampol Cd Burak Apt, 07000 Muratpaşa/Antalya"),
  googleMapsEmbed: "https://www.google.com/maps?q=" + encodeURIComponent("Şarampol Cd Burak Apt, Kızılsaray, 07000 Muratpaşa/Antalya") + "&output=embed",
  /** Gerçek Google puanı. Boş bırakılırsa sitede gösterilmez. */
  googleRating: null as { value: number; count: number } | null,
  /** Ücretsiz keşif sonrası müdahale/geri dönüş taahhütleri */
  responseTimeText: "24 saat içinde dönüş yapıyoruz",
} as const;

export const serviceAreas = [
  { slug: "antalya-merkez", name: "Antalya Merkez" },
  { slug: "muratpasa", name: "Muratpaşa" },
  { slug: "kepez", name: "Kepez" },
  { slug: "konyaalti", name: "Konyaaltı" },
  { slug: "lara", name: "Lara" },
  { slug: "belek", name: "Belek" },
  { slug: "serik", name: "Serik" },
  { slug: "manavgat", name: "Manavgat" },
  { slug: "side", name: "Side" },
  { slug: "alanya", name: "Alanya" },
  { slug: "kemer", name: "Kemer" },
  { slug: "kas", name: "Kaş" },
  { slug: "kumluca", name: "Kumluca" },
] as const;

/**
 * Sayaç istatistikleri. Değeri null olanlar sitede "[DOLDURULACAK]" olarak görünür;
 * gerçek proje verilerinizle doldurun ve kaynağını not edin. Uydurma rakam yazmayın.
 */
export const stats: { value: number | null; display?: string; prefix?: string; suffix?: string; label: string; source?: string }[] = [
  // [DOLDURULACAK: doğrulayın] Kaynak: comodoteknoloji.com eski sitedeki beyan ("6+ yıllık deneyim")
  { value: 6, suffix: "+", label: "yıllık deneyim", source: "eski site beyanı" },
  // [DOLDURULACAK: doğrulayın] Kaynak: comodoteknoloji.com eski sitedeki beyan ("200+ Başarılı Proje")
  { value: 200, suffix: "+", label: "tamamlanan proje", source: "eski site beyanı" },
  { value: null, display: "7/24", label: "destek ve izleme" },
  { value: 13, label: "ilçede yerinde hizmet" },
];

export function whatsappLink(text = "Merhaba, ücretsiz keşif hakkında bilgi almak istiyorum.") {
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string = site.phoneE164) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Kullanıcının verdiği biçimle birebir: "Kızılsaray, Şarampol Cd Burak Apt, 07000 Muratpaşa/Antalya" */
export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.district}/${site.address.city}`;
