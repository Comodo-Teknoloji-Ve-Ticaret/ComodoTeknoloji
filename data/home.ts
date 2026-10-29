import type { Faq } from "./types";

export const brands = [
  "Cisco",
  "Aruba",
  "Ruijie",
  "TP-Link Omada",
  "MikroTik",
  "FortiGate",
  "Sophos",
  "Hikvision",
  "Dahua",
  "Hanwha",
  "Comodo",
];

export const processSteps = [
  { title: "Keşif", text: "Sahada ölçüm, mevcut altyapı envanteri ve ihtiyaç analizi. Ücretsiz." },
  { title: "Projelendirme", text: "Kat planı üzerinde yerleşim, malzeme listesi ve kalem kalem teklif." },
  { title: "Kurulum", text: "Doluluk ve üretim takviminize göre blok blok, kesintisiz uygulama." },
  { title: "Test ve Raporlama", text: "Fluke testleri, kapsama ölçümleri ve kamera görüş doğrulaması." },
  { title: "Teslim", text: "Etiketli kabinetler, ağ şeması, IP planı ve kullanıcı eğitimi." },
  { title: "7/24 Destek", text: "Merkezi izleme, SLA'lı müdahale ve periyodik bakım." },
];

export const homeObjections: Faq[] = [
  { q: "Sezon ortasında kurulum yaparsak operasyonunuz durur mu?", a: "Hayır. Kurulumu blok blok, düşük doluluk saatlerinde yapıyor; eski ve yeni sistemi geçiş anına kadar paralel çalıştırıyoruz. Geçiş anı sizin onayınızla belirlenir." },
  { q: "Ya kurulumdan sonra sorun çıkarsa?", a: "Her sistemi test raporuyla teslim ediyoruz. Garanti süresince müdahale ücretsizdir; SLA paketlerinde müdahale süresi sözleşmeyle garanti edilir." },
  { q: "Tek firmaya bağlı kalmak risk değil mi?", a: "Tüm şifreler, ağ şemaları ve dokümantasyon size teslim edilir. Kullandığımız ürünler standart ve yaygın markalardır; dilediğiniz an başka bir ekip devralabilir." },
  { q: "Teklifiniz neden diğerlerinden farklı?", a: "Kalem kalem, metraj ve cihaz sayısıyla teklif veriyoruz. Test, etiketleme ve dokümantasyon teklifin içindedir; sonradan ek kalem çıkmaz." },
];

export const homeFaqs: Faq[] = [
  { q: "Comodo Teknoloji hangi hizmetleri veriyor?", a: "Antalya'da kurumsal web sitesi ve e-ticaret, güvenlik kamerası ve plaka tanıma, özel yazılım ve mobil uygulama, network ve zayıf akım altyapısı, 5651 loglama, siber güvenlik, işletme reklamı ve bilişim danışmanlığı hizmetleri veriyoruz." },
  { q: "İşletmeler için web sitesi neden önemli?", a: "Web sitesi, müşterinin işletmenizi araştırırken ulaştığı ve kontrolü tamamen sizde olan tek dijital adrestir. Google ve yapay zekâ aramalarında bulunmanızı, reklamların ölçülebilir olmasını ve sosyal medyanın tek başına veremediği güveni sağlar." },
  { q: "Güvenlik kamerası ve web sitesini aynı firmadan almanın avantajı nedir?", a: "Tek muhatapla çalışırsınız: kamera, network, web sitesi ve reklam aynı ekip tarafından planlandığı için uyumsuzluk, sorumluluk tartışması ve tekrar eden maliyetler ortadan kalkar." },
  { q: "Hangi bölgelerde hizmet veriyorsunuz?", a: "Antalya merkez ve tüm ilçelerde hizmet veriyoruz: Muratpaşa, Kepez, Konyaaltı, Lara, Belek, Serik, Manavgat, Side, Alanya, Kemer, Kaş ve Kumluca." },
  { q: "Ücretsiz keşif neleri kapsıyor?", a: "Sahada mevcut altyapının incelenmesi, ihtiyaç analizi ve sonrasında yazılı öneri ile kalem kalem teklif. Keşif için herhangi bir taahhüt istemiyoruz." },
  { q: "5651 loglama yapmazsam ne olur?", a: "5651 sayılı Kanun kapsamındaki toplu kullanım sağlayıcıların loglama yükümlülüğünü yerine getirmemesi idari yaptırım riskini doğurur. 5651 Risk Testimizle mevcut durumunuzu birkaç dakikada görebilirsiniz." },
  { q: "Tek seferlik kurulum mu yapıyorsunuz, yoksa bakım da veriyor musunuz?", a: "Her ikisi de. Kurulum sonrası SLA'lı bakım ve destek paketleriyle sistemlerinizi 7/24 izliyoruz." },
  { q: "Hangi markalarla çalışıyorsunuz?", a: "Cisco, Aruba, Ruijie, TP-Link Omada, MikroTik, FortiGate, Sophos, Hikvision, Dahua, Hanwha ve Comodo gibi markalarla çalışıyoruz; marka seçimini bütçenize ve ihtiyacınıza göre öneriyoruz." },
  { q: "Teklif ne kadar sürede hazırlanır?", a: "[DOLDURULACAK: keşif sonrası teklif teslim süresi]" },
];

export const slaPackages = [
  {
    name: "Temel",
    description: "Küçük işletmeler ve tek lokasyonlu kafe/restoranlar için.",
    features: ["Mesai içi uzaktan destek", "Aylık uzaktan sağlık kontrolü", "Yıllık yerinde bakım", "E-posta ve telefon ile arıza kaydı"],
    response: "[DOLDURULACAK]",
    price: "[DOLDURULACAK]",
  },
  {
    name: "Profesyonel",
    description: "Oteller, fabrikalar ve siteler için önerilen paket.",
    features: ["7/24 merkezi izleme ve alarm", "Öncelikli uzaktan müdahale", "Üç ayda bir yerinde bakım", "Aylık durum raporu", "Firmware ve güvenlik güncellemeleri"],
    response: "[DOLDURULACAK]",
    price: "[DOLDURULACAK]",
    featured: true,
  },
  {
    name: "Kurumsal",
    description: "Çok lokasyonlu tesisler ve kritik operasyonlar için.",
    features: ["Profesyonel paketteki her şey", "Sezon boyunca yerinde teknisyen seçeneği", "Yedek cihaz stoğu", "Çeyreklik yönetim toplantısı", "Özel SLA ve ceza maddeleri"],
    response: "[DOLDURULACAK]",
    price: "[DOLDURULACAK]",
  },
];
