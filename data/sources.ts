/**
 * KAYNAKLAR VE ATIFLAR
 * İçeriklerde atıf yapılan yetkili kaynakların tek kaydı. Sayfalar kaynakları id ile çağırır;
 * hem görünür "Kaynaklar" bölümünde hem JSON-LD "citation" alanında kullanılır.
 * Yeni kaynak eklerken yalnızca resmi kurum, standart kuruluşu, üretici dokümantasyonu
 * veya hakemli yayın kullanın. URL'si doğrulanmamış kaynaklarda url alanını boş bırakın.
 */
export type Source = {
  title: string;
  publisher: string;
  url?: string;
  /** Yayın / sürüm yılı (biliniyorsa) */
  year?: string;
};

export const sources = {
  // Web, SEO, GEO
  "google-seo-starter": {
    title: "Arama Motoru Optimizasyonu (SEO) Başlangıç Rehberi",
    publisher: "Google Search Central",
    url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=tr",
  },
  "google-structured-data": {
    title: "Yapılandırılmış veri işaretlemesinin işleyiş şekline giriş",
    publisher: "Google Search Central",
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=tr",
  },
  "web-vitals": {
    title: "Core Web Vitals (Önemli Web Verileri)",
    publisher: "web.dev (Google)",
    url: "https://web.dev/articles/vitals?hl=tr",
  },
  "gbp-local-ranking": {
    title: "Google'da yerel sıralamanızı iyileştirme ipuçları",
    publisher: "Google İşletme Profili Yardım",
    url: "https://support.google.com/business/answer/7091?hl=tr",
  },
  "geo-paper": {
    title: "GEO: Generative Engine Optimization (Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande)",
    publisher: "KDD 2024 / arXiv:2311.09735",
    url: "https://arxiv.org/abs/2311.09735",
    year: "2024",
  },
  "llms-txt": {
    title: "The /llms.txt file — yapay zekâ sistemleri için site özeti önerisi",
    publisher: "llmstxt.org",
    url: "https://llmstxt.org/",
  },
  "schema-localbusiness": {
    title: "LocalBusiness şema türü",
    publisher: "Schema.org",
    url: "https://schema.org/LocalBusiness",
  },
  // Web güvenliği
  "owasp-secure-headers": {
    title: "OWASP Secure Headers Project",
    publisher: "OWASP Foundation",
    url: "https://owasp.org/www-project-secure-headers/",
  },
  "owasp-top10": {
    title: "OWASP Top 10 — en kritik web uygulaması güvenlik riskleri",
    publisher: "OWASP Foundation",
    url: "https://owasp.org/www-project-top-ten/",
  },
  "owasp-asvs": {
    title: "Application Security Verification Standard (ASVS)",
    publisher: "OWASP Foundation",
    url: "https://owasp.org/www-project-application-security-verification-standard/",
  },
  "mdn-csp": {
    title: "Content Security Policy (CSP)",
    publisher: "MDN Web Docs (Mozilla)",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
  },
  // Reklam ve ölçüm
  "google-ads-conversions": {
    title: "Dönüşüm izleme hakkında",
    publisher: "Google Ads Yardım",
    url: "https://support.google.com/google-ads/answer/1722022?hl=tr",
  },
  "google-consent-mode": {
    title: "Consent Mode (izin modu) kurulumu",
    publisher: "Google for Developers",
    url: "https://developers.google.com/tag-platform/security/guides/consent?hl=tr",
  },
  // Mevzuat
  "kvkk-6698": {
    title: "6698 sayılı Kişisel Verilerin Korunması Kanunu",
    publisher: "Mevzuat Bilgi Sistemi (T.C. Cumhurbaşkanlığı)",
    url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5",
    year: "2016",
  },
  "kvkk-kurum": {
    title: "Kişisel Verileri Koruma Kurumu",
    publisher: "KVKK",
    url: "https://www.kvkk.gov.tr/",
  },
  "kanun-5651": {
    title: "5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun",
    publisher: "Mevzuat Bilgi Sistemi (T.C. Cumhurbaşkanlığı)",
    url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5651&MevzuatTur=1&MevzuatTertip=5",
    year: "2007",
  },
  "yonetmelik-toplu-kullanim": {
    title: "İnternet Toplu Kullanım Sağlayıcıları Hakkında Yönetmelik",
    publisher: "Resmî Gazete",
  },
  btk: {
    title: "Bilgi Teknolojileri ve İletişim Kurumu",
    publisher: "BTK",
    url: "https://www.btk.gov.tr/",
  },
  // Güvenlik kamerası
  "iec-62676-4": {
    title: "IEC 62676-4: Video surveillance systems for use in security applications — Part 4: Application guidelines (DORI piksel yoğunlukları)",
    publisher: "International Electrotechnical Commission (IEC)",
    year: "2014",
  },
  // Network ve kablolama
  "wifi-7": {
    title: "Wi-Fi CERTIFIED 7",
    publisher: "Wi-Fi Alliance",
    url: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-7",
  },
  "ieee-80211": {
    title: "IEEE 802.11 Wireless LAN Working Group",
    publisher: "IEEE",
    url: "https://www.ieee802.org/11/",
  },
  "tia-568": {
    title: "ANSI/TIA-568 Commercial Building Telecommunications Cabling Standard serisi",
    publisher: "Telecommunications Industry Association (TIA)",
  },
  "iso-11801": {
    title: "ISO/IEC 11801-1: Information technology — Generic cabling for customer premises",
    publisher: "ISO / IEC",
    year: "2017",
  },
  // Siber güvenlik
  "nist-csf": {
    title: "NIST Cybersecurity Framework",
    publisher: "National Institute of Standards and Technology (NIST)",
    url: "https://www.nist.gov/cyberframework",
  },
  "cisa-ransomware": {
    title: "#StopRansomware — fidye yazılımı rehberi ve kaynakları",
    publisher: "CISA (ABD Siber Güvenlik ve Altyapı Güvenliği Ajansı)",
    url: "https://www.cisa.gov/stopransomware",
  },
  usom: {
    title: "Ulusal Siber Olaylara Müdahale Merkezi",
    publisher: "USOM (BTK)",
    url: "https://www.usom.gov.tr/",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

/** Çözüm sayfası → kaynaklar */
export const solutionSources: Record<string, SourceId[]> = {
  "web-tasarim": ["google-seo-starter", "google-structured-data", "web-vitals", "geo-paper", "llms-txt", "owasp-secure-headers", "kvkk-6698"],
  "guvenlik-kameralari": ["iec-62676-4", "kvkk-6698", "kvkk-kurum", "ieee-80211"],
  yazilim: ["owasp-asvs", "owasp-top10", "kvkk-6698"],
  "dijital-reklam": ["gbp-local-ranking", "google-ads-conversions", "google-consent-mode", "google-seo-starter", "kvkk-6698"],
  "bilisim-danismanligi": ["nist-csf", "kvkk-6698", "kvkk-kurum", "iec-62676-4", "iso-11801"],
  "kurumsal-network": ["wifi-7", "ieee-80211", "btk"],
  "zayif-akim": ["tia-568", "iso-11801"],
  "siber-guvenlik": ["nist-csf", "cisa-ransomware", "usom", "kvkk-6698"],
  "5651-loglama-hotspot": ["kanun-5651", "yonetmelik-toplu-kullanim", "btk", "kvkk-6698"],
  "plaka-tanima-sistemi": ["kvkk-6698", "kvkk-kurum", "iec-62676-4"],
};

export const getSources = (ids: readonly string[] = []) =>
  ids.flatMap((id) => (id in sources ? [{ id, ...sources[id as SourceId] } as Source & { id: string }] : []));
