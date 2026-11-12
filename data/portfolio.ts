/**
 * WEB VE YAZILIM PORTFÖYÜ
 * Kaynak: comodoteknoloji.com (eski site) proje listesi.
 * "demo: true" olanlar tasarım örneğidir (GitHub Pages); gerçek müşteri sitesi olarak sunulmaz.
 * Eski sitedeki görüntülenme/puan sayıları doğrulanamadığı için alınmadı.
 */
export type PortfolioItem = {
  slug: string;
  title: string;
  category: "Kurumsal web sitesi" | "E-ticaret" | "Yazılım / SaaS" | "IoT" | "İş zekâsı";
  description: string;
  features: string[];
  url?: string;
  image?: string;
  alt?: string;
  demo?: boolean;
  /** Firmanın kendi markası/ürünü */
  own?: boolean;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "mcraft-antalya",
    title: "MC Raft Antalya",
    category: "Kurumsal web sitesi",
    description: "Antalya'daki rafting işletmesi için üç dil destekli, etkinlik paketlerini ve takvimini sunan interaktif web sitesi.",
    features: ["3 dil desteği", "Etkinlik paketleri", "Etkinlik takvimi", "WhatsApp iletişim"],
    url: "https://mcraftantalya.com/",
    image: "/images/projeler/mcraft-antalya-rafting-web-sitesi.webp",
    alt: "MC Raft Antalya rafting işletmesi web sitesi ana sayfası",
  },

  {
    slug: "rich-garage",
    title: "Rich Garage",
    category: "Kurumsal web sitesi",
    description: "Antalya'daki oto bakım ve detaylandırma stüdyosu için 3D tur, simülatör ve randevu akışı içeren web sitesi.",
    features: ["3D tur", "Simülatör", "Randevu formu", "WhatsApp iletişim"],
    url: "https://richgarage.com.tr/",
    image: "/images/projeler/rich-garage-antalya-web-sitesi.webp",
    alt: "Rich Garage Antalya oto bakım stüdyosu web sitesi ana sayfası",
  },
  {
    slug: "luxury-garage",
    title: "Luxury Garage",
    category: "Kurumsal web sitesi",
    description: "Antalya'daki PPF ve cam filmi uygulama stüdyosu için hizmet tanıtımı, simülatör ve teklif formu içeren web sitesi.",
    features: ["Hizmet sayfaları", "PPF simülatörü", "Teklif formu", "WhatsApp iletişim"],
    url: "https://luxurycarantalya.com.tr/",
    image: "/images/projeler/luxury-garage-antalya-web-sitesi.webp",
    alt: "Luxury Garage Antalya PPF ve cam filmi web sitesi ana sayfası",
  },
  {
    slug: "dis-klinigi",
    title: "Diş Kliniği",
    category: "Kurumsal web sitesi",
    description: "Diş kliniği için hizmet tanıtımı, hekim profilleri, hasta yorumları ve online randevu akışı içeren web sitesi tasarımı.",
    features: ["Hizmet tanıtımı", "Hekim profilleri", "Hasta yorumları", "Online randevu"],
    url: "https://comodo-teknoloji-ve-ticaret.github.io/dental/",
    image: "/images/projeler/dis-klinigi-web-sitesi.webp",
    alt: "Diş kliniği web sitesi tasarım örneği",
    demo: true,
  },
  {
    slug: "luks-emlak",
    title: "Lüks Emlak",
    category: "Kurumsal web sitesi",
    description: "Lüks konut portföyü için filtreli ilan arama, favoriler, danışman profilleri ve kredi hesaplayıcı içeren emlak sitesi tasarımı.",
    features: ["İlan filtreleme", "Favoriler", "Kredi hesaplayıcı", "Danışman profilleri"],
    url: "https://comodo-teknoloji-ve-ticaret.github.io/EMLAK/",
    image: "/images/projeler/comodo-luks-emlak-web-sitesi.webp",
    alt: "Lüks emlak web sitesi tasarım örneği",
    demo: true,
  },
  {
    slug: "diyetisyen",
    title: "Diyetisyen Kliniği",
    category: "Kurumsal web sitesi",
    description: "Beslenme kliniği için hizmet tanıtımı, danışan yorumları, akıllı araçlar ve online randevu içeren web sitesi tasarımı.",
    features: ["Hizmet tanıtımı", "Danışan yorumları", "Akıllı araçlar", "Online randevu"],
    url: "https://comodo-teknoloji-ve-ticaret.github.io/diyetisyen/",
    image: "/images/projeler/diyetisyen-klinigi-web-sitesi.webp",
    alt: "Diyetisyen kliniği web sitesi tasarım örneği",
    demo: true,
  },
  {
    slug: "radyoloji",
    title: "Radyoloji Merkezi",
    category: "Kurumsal web sitesi",
    description: "Radyoloji görüntüleme merkezi için görüntüleme hizmetleri, online randevu ve sonuç takibi akışı içeren web sitesi tasarımı.",
    features: ["Görüntüleme hizmetleri", "Online randevu", "Sonuç takibi", "Doktor kadrosu"],
    url: "https://comodo-teknoloji-ticaret-ltd-sti.github.io/radiology/",
    image: "/images/projeler/radyoloji-merkezi-web-sitesi.webp",
    alt: "Radyoloji merkezi web sitesi tasarım örneği",
    demo: true,
  },
  {
    slug: "hukuk-burosu",
    title: "Hukuk Bürosu",
    category: "Kurumsal web sitesi",
    description: "Hukuk bürosu için çalışma alanlarını, avukat profillerini ve iletişim formunu sunan modern ve profesyonel web sitesi tasarımı.",
    features: ["Hukuk alanları", "Avukat profilleri", "İletişim formu", "Responsive tasarım"],
    url: "https://comodo-teknoloji-ticaret-ltd-sti.github.io/attorney/",
    image: "/images/projeler/hukuk-burosu-web-sitesi.webp",
    alt: "Hukuk bürosu web sitesi tasarım örneği",
    demo: true,
  },
  {
    slug: "hotalyze",
    title: "Hotalyze",
    category: "Yazılım / SaaS",
    description: "Otel yorumlarını yapay zekâyla duygu, departman ve platform bazında analiz ederek raporlayan analiz platformu.",
    features: ["Duygu analizi", "Departman bazlı raporlar", "Platform karşılaştırması", "Zaman serisi"],
    url: "https://hotalyze.com/",
    own: true,
  },
  {
    slug: "uzaktan-sayac-okuma",
    title: "Uzaktan Elektrik Sayacı Okuma",
    category: "IoT",
    description: "IoT tabanlı elektrik sayacı okuma ve tüketim izleme sistemi.",
    features: ["Uzaktan okuma", "Tüketim izleme", "Raporlama"],
    own: true,
  },
  {
    slug: "enerji-karbon-hesaplama",
    title: "Enerji ve Karbon Ayak İzi Hesaplama",
    category: "Yazılım / SaaS",
    description: "Otel ve işletmeler için enerji tüketimi, misafir başına tüketim ve karbon ayak izi hesaplama aracı.",
    features: ["Tüketim girişi", "Misafir başına enerji", "Enerji türü dağılımı"],
    own: true,
  },
  {
    slug: "musteri-anket-sistemi",
    title: "Müşteri Anket Sistemi",
    category: "İş zekâsı",
    description: "Detaylı iş zekâsı (BI) raporlamalı müşteri memnuniyeti anket ve analiz sistemi.",
    features: ["Anket oluşturma", "BI raporları", "Memnuniyet analizi"],
    url: "https://comodo-teknoloji-ticaret-ltd-sti.github.io/Anket/",
    demo: true,
    own: true,
  },
];
