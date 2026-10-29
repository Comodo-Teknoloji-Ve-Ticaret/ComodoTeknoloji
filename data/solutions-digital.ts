import type { Solution } from "./types";

const UPDATED = "2026-10-25";

/** Dijital büyüme çözümleri: web sitesi, işletme reklamı / yerel SEO, danışmanlık */
export const digitalSolutions: Solution[] = [
  {
    slug: "web-tasarim",
    name: "Kurumsal Web Sitesi & SEO",
    h1: "Antalya Kurumsal Web Sitesi Tasarımı: Google ve Yapay Zekâ Aramalarına Hazır Siteler",
    metaTitle: "Antalya Web Sitesi Tasarımı ve SEO",
    metaDescription:
      "Antalya'daki işletmeler için hızlı, mobil uyumlu, güvenli ve SEO/GEO altyapılı kurumsal web siteleri ve e-ticaret. Google ve ChatGPT aramalarında bulunun.",
    icon: "globe",
    excerpt: "Hızlı, güvenli, mobil uyumlu; Google ve ChatGPT gibi yapay zekâ aramalarında bulunabilen web siteleri.",
    definition:
      "Kurumsal web sitesi; işletmenin hizmetlerini, iletişim bilgilerini ve güven unsurlarını 7/24 sunan, Google'da ve ChatGPT gibi yapay zekâ asistanlarında bulunabilen dijital vitrinidir. Antalya'daki işletmeler için hızlı, mobil uyumlu, güvenlik başlıkları ve KVKK ayarları yapılmış, teknik SEO ve GEO altyapısıyla teslim edilen web siteleri tasarlıyoruz.",
    serviceType: "Kurumsal web sitesi tasarımı, e-ticaret ve SEO",
    audience: ["Klinik, hukuk bürosu ve ofisler", "Otel, restoran ve turizm işletmeleri", "Üretici ve e-ticaret yapan firmalar", "Yeni kurulan Antalya işletmeleri"],
    problems: [
      { title: "Sadece Instagram hesabı var", text: "Sosyal medya hesabı sizin değil platformun; Google'da hizmetinizi arayan müşteri sizi değil rakibi bulur." },
      { title: "Site var ama telefon çalmıyor", text: "Yavaş açılan, mobilde dağılan ve net bir çağrı butonu olmayan site ziyaretçiyi müşteriye çeviremez." },
      { title: "Yapay zekâ aramalarında yoksunuz", text: "ChatGPT, Perplexity ve Google AI Overviews kaynak gösterirken yapılandırılmış, net bilgi sunan siteleri seçer." },
    ],
    sections: [
      {
        h2: "İşletmeler için web sitesi neden önemli?",
        answer:
          "Web sitesi, müşterinin işletmenizi araştırırken ulaştığı ve kontrolü tamamen sizde olan tek dijital adrestir; sosyal medya hesapları, harita kaydı ve reklamlar trafiği getirir, güveni ve dönüşümü ise web sitesi tamamlar.",
        bullets: [
          "7/24 çalışan satış temsilcisi: hizmetler, fiyatı etkileyen unsurlar ve iletişim her an erişilebilir",
          "Google İşletme Profili ile birlikte yerel aramalarda (\"Antalya güvenlik kamerası\", \"Muratpaşa diş kliniği\") görünürlük",
          "Yapay zekâ asistanlarının işletmenizi kaynak göstermesi için gereken yapılandırılmış veri ve net tanımlar",
          "Google ve Meta reklamlarının yönleneceği ölçülebilir açılış sayfaları",
          "Güven sinyalleri: SSL, KVKK metinleri, referanslar, gerçek fotoğraflar ve adres bilgisi",
          "Veri sahipliği: platform kuralları veya hesap kapanmaları işinizi durdurmaz",
        ],
      },
      {
        h2: "SEO ile GEO arasındaki fark nedir?",
        answer:
          "SEO, sitenin Google gibi arama motorlarında üst sıralarda listelenmesini; GEO (Generative Engine Optimization) ise ChatGPT, Perplexity ve Google AI Overviews gibi yapay zekâ cevap motorlarının sitenizi kaynak olarak göstermesini hedefler.",
        table: {
          caption: "SEO ve GEO karşılaştırması",
          head: ["Konu", "SEO", "GEO"],
          rows: [
            ["Hedef", "Arama sonuçlarında üst sıralar", "Yapay zekâ cevaplarında kaynak gösterilmek"],
            ["İçerik biçimi", "Anahtar kelime odaklı sayfalar", "Soru-cevap, net tanımlar, tablolar"],
            ["Teknik altyapı", "Hız, mobil uyum, site haritası", "Sunucu taraflı içerik, JSON-LD, llms.txt"],
            ["Güven sinyali", "Bağlantılar, yerel kayıtlar", "Tutarlı firma bilgisi, uzman yazarlar, kaynaklar"],
          ],
        },
      },
      {
        h2: "Güvenli bir işletme web sitesi nasıl olmalı?",
        answer:
          "Güvenli bir işletme sitesi HTTPS ve HSTS ile şifreli çalışır, güvenlik başlıkları tanımlıdır, formları bot ve spam korumalıdır, bileşenleri günceldir, düzenli yedeklenir ve KVKK'ya uygun çerez onayı sunar.",
        body:
          "Siber güvenlik ekibimizle birlikte çalıştığımız için siteleri yalnızca tasarlamıyor, saldırı yüzeyini küçülterek teslim ediyoruz. Statik üretim (SSG) kullandığımız sitelerde veri tabanı ve eklenti kaynaklı açıkların büyük kısmı baştan ortadan kalkar.",
      },
      {
        h2: "Web sitesi yaptırmak ne kadar sürer?",
        answer:
          "Süre kapsama bağlıdır: birkaç sayfalık kurumsal tanıtım siteleri genellikle birkaç haftada, e-ticaret ve özel yazılım entegrasyonu içeren projeler daha uzun sürede tamamlanır; kesin takvim keşif görüşmesinin ardından iş planında yazılır.",
      },
    ],
    process: {
      title: "Web sitesi projesi nasıl ilerler?",
      steps: [
        { title: "Keşif ve hedef", text: "İşletmenizi, rakiplerinizi ve müşterilerinizin Google'da ne aradığını birlikte çıkarıyoruz." },
        { title: "Site haritası ve içerik", text: "Her hizmet için ayrı, soru-cevap yapılı, alıntılanabilir içerik planı hazırlanır." },
        { title: "Tasarım", text: "Markanıza özel, mobil öncelikli tasarım; onayınızla geliştirmeye geçilir." },
        { title: "Geliştirme ve güvenlik", text: "Hızlı altyapı, güvenlik başlıkları, form koruması, KVKK ve çerez onayı." },
        { title: "SEO / GEO kurulumu", text: "JSON-LD şemaları, site haritası, llms.txt, Google İşletme Profili ve Search Console bağlantısı." },
        { title: "Yayın ve büyüme", text: "Analitik ve dönüşüm takibi kurulur; içerik ve reklamla büyüme planı devreye alınır." },
      ],
    },
    comparison: {
      caption: "Web sitesi yaptırma seçeneklerinin karşılaştırması",
      head: ["Özellik", "Site kurucu platformlar", "Hazır tema", "Özel geliştirme (Comodo)"],
      rows: [
        ["Hız ve Core Web Vitals", "Platforma bağlı", "Eklentilerle yavaşlayabilir", "Hedefe göre optimize"],
        ["SEO / GEO kontrolü", "Sınırlı", "Eklentilerle kısmi", "Tam (şema, llms.txt, SSR)"],
        ["Güvenlik", "Platformun sorumluluğunda", "Eklenti güncellemelerine bağlı", "Saldırı yüzeyi küçük, başlıklar tanımlı"],
        ["Tasarım özgünlüğü", "Şablon", "Şablon + düzenleme", "Markaya özel"],
        ["Veri ve kod sahipliği", "Platformda", "Sizde", "Sizde"],
      ],
    },
    priceFactors: {
      caption: "Web sitesi fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Sayfa ve içerik sayısı", "Yüksek", "Hizmet, bölge ve blog sayfalarının adedi; içerik yazımının kimde olduğu"],
        ["E-ticaret ve ödeme", "Yüksek", "Ürün sayısı, sanal POS, kargo ve stok entegrasyonları"],
        ["Özel fonksiyonlar", "Orta", "Randevu, teklif hesaplayıcı, çok dil, üye girişi"],
        ["Tasarım kapsamı", "Orta", "Kurumsal kimlik, ikon ve görsel üretimi"],
        ["SEO / GEO ve içerik desteği", "Orta", "Teknik kurulum + aylık içerik ve raporlama"],
        ["Barındırma ve bakım", "Düşük", "Yıllık hosting, alan adı, güvenlik güncellemeleri"],
      ],
    },
    faqs: [
      { q: "Antalya'da web sitesi yaptırmak istiyorum, nereden başlamalıyım?", a: "Önce hangi hizmetler için bulunmak istediğinizi ve müşterilerinizin sizi nasıl aradığını netleştirin. Ücretsiz keşif görüşmesinde bunu birlikte çıkarıp site haritası ve takvim öneriyoruz." },
      { q: "Web sitem ChatGPT gibi yapay zekâ aramalarında çıkar mı?", a: "Garanti verilemez; ancak sunucu taraflı içerik, yapılandırılmış veri (JSON-LD), net tanım paragrafları, soru-cevap başlıkları ve llms.txt gibi GEO teknikleri kaynak gösterilme olasılığını artırır. Tüm sitelerimizi bu altyapıyla teslim ediyoruz." },
      { q: "Siteyi kendim güncelleyebilir miyim?", a: "Evet. İhtiyaca göre yönetim paneli veya basit içerik dosyalarıyla güncelleme imkânı sunuyor, teslimde kısa bir eğitim veriyoruz." },
      { q: "Alan adı ve hosting kimin adına olur?", a: "Alan adı ve barındırma hesabı işletmeniz adına açılır; erişim bilgileri size teslim edilir." },
      { q: "Mevcut sitemi yenilerken Google sıralamalarım düşer mi?", a: "Doğru yönlendirmeler (301), korunan URL yapısı ve Search Console takibiyle geçiş planlandığında sıralama kaybı en aza indirilir." },
      { q: "Daha önce hangi siteleri yaptınız?", a: "Hukuk bürosu, diş kliniği, radyoloji merkezi, rafting işletmesi ve e-ticaret projelerimizi Projeler sayfasında inceleyebilirsiniz." },
    ],
    relatedSectors: ["klinik-ve-ofis", "otel-ve-resort", "restoran-ve-kafe"],
    relatedTools: [],
    relatedRegions: ["muratpasa", "konyaalti", "alanya"],
    updatedAt: UPDATED,
  },
  {
    slug: "dijital-reklam",
    name: "İşletme Reklamı & Yerel SEO",
    h1: "Antalya İşletme Reklamı: Google Ads, Meta Reklamları ve Yerel SEO Yönetimi",
    metaTitle: "Antalya İşletme Reklamı ve Yerel SEO",
    metaDescription:
      "Google Ads, Instagram/Facebook reklamları ve Google İşletme Profili ile Antalya'da doğru müşteriye ulaşın. Güvenli açılış sayfası ve dönüşüm takibiyle.",
    icon: "megaphone",
    excerpt: "Google Ads, Meta reklamları ve Google İşletme Profili; dönüşüm takipli, güvenli açılış sayfalarıyla.",
    definition:
      "Dijital işletme reklamı; Google Ads, Meta (Instagram ve Facebook) reklamları, Google İşletme Profili ve yerel SEO çalışmalarıyla işletmenizi, hizmetinizi arayan Antalya'daki doğru kişilere ölçülebilir bir bütçeyle gösterme işidir. Reklamları dönüşüm takibi kurulmuş, hızlı ve güvenli açılış sayfalarına yönlendirip her harcamayı raporluyoruz.",
    serviceType: "Dijital reklam yönetimi ve yerel SEO",
    audience: ["Hizmet işletmeleri (klinik, avukat, tamirci, kurs)", "Restoran, kafe ve turizm işletmeleri", "B2B firmalar ve üreticiler", "Yeni açılan Antalya işletmeleri"],
    problems: [
      { title: "Reklama para gidiyor, dönüş belli değil", text: "Dönüşüm takibi olmayan reklam hesabı, hangi kampanyanın telefon getirdiğini gösteremez." },
      { title: "Haritada görünmüyorsunuz", text: "Eksik veya tutarsız Google İşletme Profili, \"yakınımdaki\" aramalarda sizi rakiplerin arkasına iter." },
      { title: "Sahte tıklama ve spam form", text: "Korumasız formlar ve takip edilmeyen tıklamalar bütçeyi ve satış ekibinin zamanını tüketir." },
    ],
    sections: [
      {
        h2: "Antalya'da bir işletme hangi reklam kanalını seçmeli?",
        answer:
          "Müşteri hizmetinizi aktif olarak arıyorsa Google Ads ve yerel SEO, ürününüz veya mekânınız görsel olarak ilgi uyandırıyorsa Instagram/Facebook reklamları önceliklidir; çoğu yerel işletme için en verimli başlangıç Google İşletme Profili ile birlikte arama reklamlarıdır.",
      },
      {
        h2: "Google İşletme Profili neden ilk adım?",
        answer:
          "Google İşletme Profili, haritada ve yerel aramalarda ücretsiz görünmenizi sağlar; doğru kategori, tutarlı ad-adres-telefon, gerçek fotoğraflar ve yanıtlanan yorumlar yerel sıralamayı doğrudan etkiler.",
        bullets: [
          "Ad, adres ve telefonun web sitesi ve tüm profillerle birebir aynı olması (NAP tutarlılığı)",
          "Doğru birincil ve ikincil kategoriler",
          "Hizmet bölgeleri ve çalışma saatleri",
          "Düzenli gerçek fotoğraf ve gönderi paylaşımı",
          "Yorumlara hızlı ve profesyonel yanıt",
        ],
      },
      {
        h2: "Güvenlik destekli reklam ne demek?",
        answer:
          "Güvenlik destekli reklam; reklam tıklamalarının yönlendiği sitenin hızlı ve güvenli olması, formların bot ve spam korumalı olması, ölçümün KVKK'ya uygun çerez onayıyla yapılması ve şüpheli trafiğin düzenli izlenmesidir.",
        body:
          "Reklam bütçesi en çok güvensiz ve ölçümsüz sitelerde boşa gider. Bilişim ve siber güvenlik altyapısını bildiğimiz için açılış sayfalarını Turnstile bot koruması, rate limit ve doğru dönüşüm etiketleriyle kuruyoruz.",
      },
      {
        h2: "Reklam bütçesi nasıl belirlenir?",
        answer:
          "Bütçe; hedeflenen ilçe ve hizmetin rekabeti, tıklama maliyetleri ve bir müşterinin işletmenize getirdiği gelire göre belirlenir; küçük bir test bütçesiyle başlayıp dönüşüm verisine göre artırmak en güvenli yoldur.",
      },
    ],
    comparison: {
      caption: "Dijital reklam kanallarının karşılaştırması",
      head: ["Özellik", "Google Ads (arama)", "Meta reklamları", "Yerel SEO + İşletme Profili"],
      rows: [
        ["Kullanıcı niyeti", "Aktif arıyor", "Keşfediyor", "Aktif arıyor (yakınında)"],
        ["Sonuç hızı", "Hemen", "Hemen", "Haftalar–aylar"],
        ["Maliyet modeli", "Tıklama başı", "Gösterim / tıklama", "Emek ve içerik"],
        ["Kalıcılık", "Bütçe bitince durur", "Bütçe bitince durur", "Birikerek kalıcı"],
        ["En uygun", "Acil hizmet, B2B, yüksek değerli iş", "Restoran, turizm, ürün", "Tüm yerel işletmeler"],
      ],
    },
    priceFactors: {
      caption: "Reklam hizmetinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Reklam bütçesi", "Yüksek", "Platformlara doğrudan ödenen tutar; yönetim ücretinden ayrıdır"],
        ["Kanal sayısı", "Orta", "Google, Meta, YouTube, Google İşletme Profili"],
        ["Kreatif üretimi", "Orta", "Görsel, video ve metin üretimi"],
        ["Açılış sayfası", "Orta", "Kampanyaya özel sayfa tasarımı ve hız optimizasyonu"],
        ["Raporlama sıklığı", "Düşük", "Haftalık / aylık rapor ve toplantı"],
      ],
    },
    faqs: [
      { q: "Reklam vermek için web sitesi şart mı?", a: "Zorunlu değil ama verimlilik için kritik. Kendi sitenizde dönüşüm ölçülür, güven sinyalleri sunulur ve platform kurallarından bağımsız kalırsınız." },
      { q: "Google'da ilk sırada çıkmayı garanti ediyor musunuz?", a: "Hayır. Organik sıralamayı kimse garanti edemez; garanti veren tekliflere karşı dikkatli olun. Biz ölçülebilir hedefler (arama görünürlüğü, arama, form) koyup raporluyoruz." },
      { q: "Instagram hesabımı da yönetir misiniz?", a: "[DOLDURULACAK: sosyal medya içerik yönetimi hizmet kapsamı]" },
      { q: "Sonuçları ne zaman görürüm?", a: "Arama reklamlarında ilk tıklamalar yayına alındığı gün gelir; yerel SEO ve organik içerik ise haftalar içinde birikerek etkisini gösterir." },
      { q: "Hangi ilçelerde reklam verebilirim?", a: "Reklamlar ilçe, mahalle veya belirli bir yarıçap bazında hedeflenebilir; örneğin yalnızca Muratpaşa ve Konyaaltı'nda gösterim yapılabilir." },
      { q: "Reklam hesabı kimin adına açılır?", a: "Hesaplar işletmeniz adına açılır, biz yönetici olarak eklenir; hesap ve veri her zaman sizde kalır." },
    ],
    relatedSectors: ["klinik-ve-ofis", "restoran-ve-kafe", "otel-ve-resort"],
    relatedTools: [],
    relatedRegions: ["muratpasa", "konyaalti", "kepez"],
    updatedAt: UPDATED,
  },
  {
    slug: "bilisim-danismanligi",
    name: "Bilişim & Güvenlik Danışmanlığı",
    h1: "Antalya Bilişim Altyapısı ve Güvenlik Danışmanlığı",
    metaTitle: "Antalya Bilişim ve Güvenlik Danışmanlığı",
    metaDescription:
      "Network, güvenlik kamerası, yazılım ve siber güvenlik yatırımlarınız için ihtiyaç analizi, teknik şartname, teklif karşılaştırma ve proje denetimi.",
    icon: "compass",
    excerpt: "Yatırım öncesi ihtiyaç analizi, teknik şartname, teklif karşılaştırma ve kurulum denetimi.",
    definition:
      "Bilişim danışmanlığı; işletmenin network, güvenlik kamerası, yazılım ve siber güvenlik yatırımlarını ihtiyaç analizi, teknik şartname, tedarikçi teklif karşılaştırması ve proje denetimiyle doğru kararlara bağlayan uzmanlık hizmetidir. Antalya'daki işletmelere yatırım öncesi yol haritası, kurulum sırasında denetim ve sonrasında periyodik kontrol sunuyoruz.",
    serviceType: "Bilişim altyapısı ve güvenlik danışmanlığı",
    audience: ["IT ekibi olmayan KOBİ'ler", "Yeni tesis veya renovasyon yapan oteller", "Çok şubeli işletmeler", "Yönetim kurulu kararı bekleyen siteler"],
    problems: [
      { title: "Üç teklif, üç farklı sistem", text: "Farklı marka ve kapsamdaki teklifler karşılaştırılamaz; en ucuz teklif çoğu zaman eksik kapsamdır." },
      { title: "Kurulum bitti, kalite bilinmiyor", text: "Test raporu ve dokümantasyon istenmeyen projelerde sorunlar garanti süresi bittikten sonra çıkar." },
      { title: "KVKK teknik tedbirleri belirsiz", text: "Kamera kayıtları, erişim yetkileri ve loglar için hangi teknik tedbirin gerektiği netleşmemiştir." },
    ],
    sections: [
      {
        h2: "Bilişim danışmanlığı ne zaman gerekir?",
        answer:
          "Bilişim danışmanlığı; yeni tesis veya renovasyon öncesinde, birden fazla teklifin karşılaştırılması gerektiğinde, sık arıza yaşayan bir altyapıda kök neden aranırken ve KVKK ya da siber güvenlik denetimine hazırlanırken gerekir.",
      },
      {
        h2: "Danışmanlık sonunda size ne teslim edilir?",
        answer:
          "Her danışmanlık projesinin sonunda yazılı mevcut durum raporu, önceliklendirilmiş risk listesi, yol haritası ve gerekiyorsa teknik şartname ile teklif karşılaştırma tablosu teslim edilir.",
        bullets: [
          "Mevcut durum ve envanter raporu",
          "Öncelik sıralı risk ve iyileştirme listesi",
          "Bütçe aralıklarıyla fazlı yol haritası",
          "Tedarikçilere gönderilecek teknik şartname",
          "Teklif karşılaştırma tablosu ve öneri",
          "Kurulum sonrası kabul testi kontrol listesi",
        ],
      },
      {
        h2: "Danışmanlık ile kurulum hizmetini aynı firmadan almak doğru mu?",
        answer:
          "İkisi de mümkündür; şeffaflık için danışmanlık raporunu ve şartnameyi marka bağımsız hazırlıyor, kurulumu bizden almak zorunda olmadığınızı baştan belirtiyoruz.",
      },
    ],
    comparison: {
      caption: "Altyapı kararını verme yöntemlerinin karşılaştırması",
      head: ["Özellik", "Tedarikçi önerisiyle", "Kendi ekibinizle", "Danışmanlık ile"],
      rows: [
        ["Teklif karşılaştırılabilirliği", "Düşük", "Orta", "Yüksek (ortak şartname)"],
        ["Marka bağımsızlığı", "Düşük", "Değişken", "Yüksek"],
        ["Zaman yükü", "Düşük", "Yüksek", "Düşük"],
        ["Kurulum kalitesi kontrolü", "Tedarikçinin beyanı", "Ekibin deneyimine bağlı", "Kabul testiyle"],
      ],
    },
    priceFactors: {
      caption: "Danışmanlık ücretini belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Tesis sayısı ve büyüklüğü", "Yüksek", "İncelenecek bina, blok ve şube sayısı"],
        ["Kapsam", "Yüksek", "Network, kamera, yazılım, siber güvenlik başlıklarından hangileri"],
        ["Çalışma modeli", "Orta", "Proje bazlı, saatlik veya aylık danışmanlık"],
        ["Denetim ihtiyacı", "Orta", "Kurulum sırasında saha denetimi ve kabul testi"],
      ],
    },
    faqs: [
      { q: "Danışmanlık için ücret alıyor musunuz?", a: "İlk keşif görüşmesi ücretsizdir. Yazılı rapor, şartname ve denetim içeren danışmanlık projeleri kapsamına göre fiyatlandırılır." },
      { q: "Hangi konularda danışmanlık veriyorsunuz?", a: "Network ve Wi-Fi, zayıf akım, güvenlik kamerası ve plaka tanıma, 5651 loglama, siber güvenlik, yazılım seçimi, web sitesi ve dijital reklam yatırımları." },
      { q: "KVKK danışmanlığı veriyor musunuz?", a: "Hukuki danışmanlık vermiyoruz; KVKK kapsamındaki teknik ve idari tedbirlerin bilişim tarafını (erişim yetkileri, loglama, şifreleme, yedekleme) hukuk danışmanınızla birlikte uyguluyoruz." },
      { q: "Raporu başka bir firmaya kurulum için verebilir miyiz?", a: "Evet. Şartnameler marka bağımsız hazırlanır ve dilediğiniz tedarikçiyle kullanabilirsiniz." },
      { q: "Uzaktan danışmanlık mümkün mü?", a: "Yazılım, web ve dijital reklam konularında evet; altyapı ve kamera konularında saha keşfi gerekir." },
      { q: "Aylık danışmanlık modeliniz var mı?", a: "Evet. IT ekibi olmayan işletmeler için aylık sabit saatli danışmanlık ve periyodik denetim paketleri sunuyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb", "klinik-ve-ofis"],
    relatedTools: ["5651-risk-testi", "cctv-planlayici"],
    relatedRegions: ["muratpasa", "kepez", "belek"],
    updatedAt: UPDATED,
  },
];
