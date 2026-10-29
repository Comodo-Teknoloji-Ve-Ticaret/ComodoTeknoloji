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
    slug: "comodo-print",
    title: "Comodo Print",
    category: "E-ticaret",
    description: "Dijital baskı ve tasarım hizmetleri için online sipariş, tasarım editörü ve baskı fiyat hesaplama içeren e-ticaret platformu.",
    features: ["Online sipariş", "Tasarım editörü", "Baskı hesaplama", "Kargo takibi"],
    url: "https://comodoprint.com/",
    image: "/images/projeler/comodo-print-dijital-baski-e-ticaret.webp",
    alt: "Comodo Print dijital baskı e-ticaret sitesi",
    own: true,
  },
  {
    slug: "comodo-bee",
    title: "Comodo Bee",
    category: "E-ticaret",
    description: "Arıcılık ürünleri için ürün kataloğu, online satış ve arıcılık rehberi içeren e-ticaret platformu.",
    features: ["Ürün kataloğu", "Online satış", "Arıcılık rehberi", "Müşteri desteği"],
    url: "https://comodobee.com/",
    image: "/images/projeler/comodo-bee-aricilik-e-ticaret.webp",
    alt: "Comodo Bee arıcılık ürünleri e-ticaret sitesi",
    own: true,
  },
  {
    slug: "dis-klinigi",
    title: "Diş Kliniği",
    category: "Kurumsal web sitesi",
    description: "Diş kliniği için hizmet tanıtımı, doktor profilleri ve iletişim bilgilerini sunan modern ve güven veren web sitesi tasarımı.",
    features: ["Hizmet tanıtımı", "Doktor profilleri", "İletişim bilgileri", "Mobil uyum"],
    url: "https://comodo-teknoloji-ticaret-ltd-sti.github.io/DentalClinic/",
    image: "/images/projeler/dis-klinigi-web-sitesi.webp",
    alt: "Diş kliniği web sitesi tasarım örneği",
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
