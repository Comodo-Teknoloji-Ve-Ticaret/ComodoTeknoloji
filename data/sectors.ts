import type { Sector } from "./types";

const UPDATED = "2026-10-24";

export const sectors: Sector[] = [
  {
    slug: "otel-ve-resort",
    name: "Otel ve Resort",
    h1: "Antalya Otelleri İçin Wi-Fi, Kamera ve 5651 Altyapısı",
    metaTitle: "Otel ve Resort Bilişim Altyapısı | Antalya",
    metaDescription:
      "Antalya otelleri için sezon öncesi Wi-Fi yenileme, CCTV, 5651 loglama, IPTV ve zayıf akım. Operasyonu durdurmadan, blok blok kurulum.",
    icon: "hotel",
    excerpt: "Wi-Fi şikayetlerini sezon öncesi bitirin; kamera, 5651 ve zayıf akım tek muhatapta.",
    definition:
      "Otel bilişim altyapısı; misafir Wi-Fi'si, personel ağı, PMS ve POS bağlantıları, güvenlik kameraları, IPTV ve 5651 loglamanın tek bir planla kurulup yönetilmesidir. Antalya'daki şehir otellerinden Belek ve Side'deki büyük resortlara kadar bu altyapıyı sezon takvimine göre projelendiriyoruz.",
    pains: [
      { title: "TripAdvisor'da Wi-Fi yorumları", text: "Odalarda zayıf bağlantı, misafir memnuniyeti ve puanları doğrudan düşürür." },
      { title: "Sezon ortasında arıza", text: "Doluluk %100'ken çıkan bir switch arızası resepsiyonu, POS'u ve kameraları aynı anda durdurur." },
      { title: "5651 ve KVKK baskısı", text: "Misafir bağlantılarının kişiyle eşleşmemesi denetimde ciddi risk yaratır." },
      { title: "Her sisteme ayrı firma", text: "Kamera, Wi-Fi ve IPTV için ayrı tedarikçi; arızada herkes birbirini işaret eder." },
    ],
    solutions: ["kurumsal-network", "5651-loglama-hotspot", "guvenlik-kameralari", "zayif-akim", "siber-guvenlik", "yazilim"],
    sections: [
      {
        h2: "Otel Wi-Fi'si ne zaman yenilenmeli?",
        answer:
          "İdeal yenileme zamanı sezon kapanışından sonraki kış dönemidir; keşif ve projelendirme sonbaharda tamamlanırsa kurulum Mart'tan önce bitirilebilir.",
      },
      {
        h2: "Otelde hangi ağlar birbirinden ayrılmalı?",
        answer:
          "Misafir, personel, PMS/POS, kamera, IPTV ve yönetim trafiği ayrı VLAN'larda tutulmalı ve aralarındaki erişim firewall kurallarıyla sınırlandırılmalıdır.",
      },
    ],
    objections: [
      { q: "Sezon ortasında kurulum yaparsak operasyonunuz durur mu?", a: "Durmaz. Kurulumu blok blok, düşük doluluk saatlerinde yapıyor, eski ve yeni sistemi geçiş anına kadar paralel çalıştırıyoruz." },
      { q: "Bütçemiz sınırlı, her şeyi bir anda yenilemek zorunda mıyız?", a: "Hayır. Öncelikli alanlardan başlayan, yıllara yayılmış fazlı bir yenileme planı hazırlıyoruz." },
      { q: "Mevcut cihazlarımız çöpe mi gidecek?", a: "Keşifte kullanılabilir cihazları tespit ediyor, yeni sisteme dahil ediyoruz." },
    ],
    faqs: [
      { q: "Otel için kaç access point gerekir?", a: "Betonarme otellerde genellikle her 2–4 odaya bir AP gerekir; kesin sayı site survey ile belirlenir. Ağ Yenileme Hesaplayıcımız ilk tahmini verir." },
      { q: "Misafir Wi-Fi'si PMS ile entegre olabilir mi?", a: "Evet, misafirler oda numarası ve soyadlarıyla giriş yapar; check-out ile erişim sona erer." },
      { q: "IPTV altyapısı kuruyor musunuz?", a: "[DOLDURULACAK: IPTV hizmet kapsamı]" },
      { q: "Zincir otellerde merkezi yönetim mümkün mü?", a: "Evet, bulut yönetimli ağ ve merkezi 5651 loglama ile tüm tesisleri tek panelden izlemek mümkündür." },
    ],
    relatedTools: ["ag-yenileme-hesaplayici", "5651-risk-testi"],
    relatedRegions: ["belek", "alanya", "manavgat", "kemer"],
    updatedAt: UPDATED,
  },
  {
    slug: "fabrika-ve-osb",
    name: "Fabrika ve OSB",
    h1: "Fabrikalar ve OSB Tesisleri İçin Endüstriyel Network ve Güvenlik",
    metaTitle: "Fabrika ve OSB Network ve Kamera Sistemleri | Antalya",
    metaDescription:
      "Fabrikalar için fiber omurga, endüstriyel switch, termal kamera, plaka tanıma ve siber güvenlik. Üretimi durdurmadan kurulum.",
    icon: "factory",
    excerpt: "Fiber omurga, endüstriyel switch, çevre güvenliği ve üretim ağlarının korunması.",
    definition:
      "Fabrika bilişim altyapısı; üretim hatları, ofisler, depolar ve güvenlik noktalarını birbirine bağlayan fiber omurga, endüstriyel ağ cihazları, çevre güvenliği kameraları ve üretim ağını ofis ağından ayıran siber güvenlik katmanlarından oluşur. Antalya ve çevresindeki sanayi tesisleri için bu altyapıyı üretimi durdurmadan kuruyoruz.",
    pains: [
      { title: "Bloklar arası kopan bağlantı", text: "Uzun bakır hatlar ve topraklama farkları depoların ve üretim binalarının bağlantısını düşürür." },
      { title: "Geniş çevre, az kamera", text: "Uzun çit hatları ve karanlık alanlar klasik kameralarla etkin izlenemez." },
      { title: "Üretim ağı ofisle aynı", text: "Ofisteki bir fidye yazılımı üretim hattındaki sistemlere sıçrayabilir." },
      { title: "Kamyon ve personel girişi kontrolsüz", text: "Kantar, yükleme ve personel girişlerinde kayıt eksikliği." },
    ],
    solutions: ["zayif-akim", "kurumsal-network", "guvenlik-kameralari", "plaka-tanima-sistemi", "siber-guvenlik"],
    sections: [
      {
        h2: "Fabrikada fiber mi bakır mı kullanılmalı?",
        answer:
          "Binalar arası ve 90 metreyi aşan tüm bağlantılarda fiber kullanılmalı; bakır kablo yalnızca aynı bina içindeki kısa uç nokta bağlantılarında tercih edilmelidir.",
      },
      {
        h2: "Fabrika çevre güvenliği için hangi kamera seçilmeli?",
        answer:
          "Uzun çit hatları ve karanlık alanlarda termal kameralar, video analitikle birlikte kullanıldığında ışık koşullarından bağımsız ihlal tespiti sağlar.",
      },
    ],
    objections: [
      { q: "Kurulum sırasında üretim durur mu?", a: "Hayır. Kritik hatlarda geçişleri vardiya aralarına veya planlı duruşlara denk getiriyoruz." },
      { q: "Endüstriyel ortamda cihazlar dayanır mı?", a: "Toz, nem ve sıcaklık koşullarına uygun endüstriyel sınıf switch ve dış mekan kabinleri kullanıyoruz." },
      { q: "IT ekibimiz var, sizi neden çağıralım?", a: "Projelendirme, saha kurulumu ve test yükünü üstleniyoruz; IT ekibiniz dokümantasyonu eksiksiz devralıyor." },
    ],
    faqs: [
      { q: "Endüstriyel switch ile normal switch arasındaki fark nedir?", a: "Endüstriyel switchler geniş sıcaklık aralığı, DIN ray montajı, yedekli enerji girişi ve titreşim dayanımıyla zorlu ortamlar için tasarlanır." },
      { q: "Kantar ve kamyon girişinde plaka tanıma kullanılabilir mi?", a: "Evet, plaka tanıma kayıtları kantar ve sevkiyat yazılımlarıyla entegre edilebilir." },
      { q: "OT (üretim) ağını nasıl koruyorsunuz?", a: "Üretim ağını ayrı segmentte tutuyor, ofis ağıyla arasındaki trafiği firewall kurallarıyla sınırlıyoruz." },
      { q: "Depo Wi-Fi'si el terminalleri için uygun olur mu?", a: "Raf yükseklikleri ve malzeme yoğunluğu dikkate alınarak yapılan site survey ile kesintisiz dolaşım sağlanır." },
    ],
    relatedTools: ["cctv-planlayici", "ag-yenileme-hesaplayici"],
    relatedRegions: ["kepez"],
    updatedAt: UPDATED,
  },
  {
    slug: "avm-ve-site-yonetimi",
    name: "AVM ve Site Yönetimi",
    h1: "AVM'ler ve Konut Siteleri İçin Plaka Tanıma, Kamera ve Network",
    metaTitle: "AVM ve Site Yönetimi Güvenlik Sistemleri | Antalya",
    metaDescription:
      "Konut siteleri ve AVM'ler için plaka tanıma, bariyer, CCTV, ortak alan Wi-Fi ve zayıf akım altyapısı. Tek muhatap, raporlanabilir güvenlik.",
    icon: "mall",
    excerpt: "Plaka tanıma, bariyer, CCTV ve ortak alan Wi-Fi'si ile raporlanabilir güvenlik.",
    definition:
      "Site ve AVM güvenlik altyapısı; araç ve yaya girişlerini kontrol eden plaka tanıma ve bariyer sistemleri, ortak alanları izleyen kameralar, ortak alan Wi-Fi'si ve bunları taşıyan zayıf akım altyapısından oluşur. Antalya'daki konut siteleri, rezidanslar ve AVM'ler için bu sistemleri tek projede kuruyoruz.",
    pains: [
      { title: "Kumanda ve kart karmaşası", text: "Kaybolan kumandalar ve yetkisiz araç girişleri yönetimin sürekli gündemi olur." },
      { title: "Olay sonrası kayıt bulunamıyor", text: "Yetersiz depolama ve kötü kamera konumu nedeniyle olay görüntüsü yoktur." },
      { title: "Ortak alanlarda bağlantı yok", text: "Havuz, spor salonu ve otopark gibi alanlarda Wi-Fi ve kamera altyapısı eksiktir." },
    ],
    solutions: ["plaka-tanima-sistemi", "guvenlik-kameralari", "zayif-akim", "kurumsal-network", "yazilim"],
    sections: [
      {
        h2: "Sitelerde plaka tanıma sistemi ne kazandırır?",
        answer:
          "Plaka tanıma sistemi kumanda dağıtımını ortadan kaldırır, misafir araçları süreli tanımlanır ve tüm giriş-çıkışlar fotoğraflı olarak raporlanır.",
      },
    ],
    objections: [
      { q: "Yönetim kurulu bütçe onayı için ne sunabiliriz?", a: "Keşif sonrası kalem kalem teklif, alternatif paketler ve fazlı uygulama planı hazırlıyoruz." },
      { q: "Daire sakinleri sistemi kullanabilecek mi?", a: "Misafir tanımlama gibi işlemler basit bir mobil arayüzle yapılır; ilk kurulumda yönetime eğitim veriyoruz." },
    ],
    faqs: [
      { q: "Mevcut bariyerimize plaka tanıma eklenebilir mi?", a: "Çoğu bariyer kuru kontakla kontrol edilebildiği için mevcut sisteme plaka tanıma eklenebilir." },
      { q: "Kamera kayıtlarını yönetim dışında kimler görebilir?", a: "Erişim yetkileri kullanıcı bazlı tanımlanır; KVKK gereği kimin hangi kayda eriştiği loglanır." },
      { q: "AVM otoparkında doluluk takibi yapılabilir mi?", a: "Giriş-çıkış sayımıyla anlık doluluk hesaplanabilir; detaylı otopark yönlendirme sistemleri için ayrıca projelendirme yapılır." },
    ],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["konyaalti", "alanya", "muratpasa"],
    updatedAt: UPDATED,
  },
  {
    slug: "restoran-ve-kafe",
    name: "Restoran ve Kafe",
    h1: "Restoran ve Kafeler İçin 5651 Uyumlu Wi-Fi ve Kamera Sistemleri",
    metaTitle: "Restoran ve Kafe Wi-Fi, 5651 ve Kamera | Antalya",
    metaDescription:
      "Kafe ve restoranlar için 5651 uyumlu misafir Wi-Fi, hotspot, POS ağı güvenliği ve güvenlik kamerası. Hızlı kurulum, uygun paketler.",
    icon: "restaurant",
    excerpt: "5651 uyumlu misafir Wi-Fi, ayrılmış POS ağı ve kasa/mutfak kameraları.",
    definition:
      "Restoran ve kafe bilişim altyapısı; müşterilere sunulan 5651 uyumlu misafir Wi-Fi'si, POS ve sipariş sistemlerini koruyan ayrılmış personel ağı ve kasa, mutfak ve salon kameralarından oluşur. Antalya'daki restoran ve kafeler için bu altyapıyı hızlı ve işletmeyi kapatmadan kuruyoruz.",
    pains: [
      { title: "Müşteri Wi-Fi'si POS ile aynı ağda", text: "Ayrılmamış ağda müşteri cihazları ödeme sistemlerine erişebilir." },
      { title: "5651 cezası riski", text: "Şifreyi masaya yazmak, bağlantıyı kişiyle eşleştirmez." },
      { title: "Kasa farkları ve mutfak hijyeni", text: "Kasa ve mutfak alanları net görüntülenmediğinde anlaşmazlıklar çözülemez." },
    ],
    solutions: ["5651-loglama-hotspot", "kurumsal-network", "guvenlik-kameralari"],
    sections: [
      {
        h2: "Kafede müşteri Wi-Fi'si için şifre yeterli mi?",
        answer:
          "Hayır; ortak şifre bağlantıyı bir kişiyle eşleştirmediği için 5651 yükümlülüğünü karşılamaz, SMS doğrulamalı hotspot ve zaman damgalı loglama gerekir.",
      },
    ],
    objections: [
      { q: "Kurulum için işletmeyi kapatmamız gerekir mi?", a: "Hayır. Kurulum genellikle kapanış sonrası veya sakin saatlerde tamamlanır." },
      { q: "Küçük bir işletme için maliyetli olmaz mı?", a: "Tek lokasyonlu işletmeler için bulut tabanlı, düşük başlangıç maliyetli paketler sunuyoruz." },
    ],
    faqs: [
      { q: "Hotspot sayfasında kendi logomuz olabilir mi?", a: "Evet, karşılama sayfası işletmenizin logosu ve renkleriyle tasarlanır; kampanya duyurusu da eklenebilir." },
      { q: "Müşterilerin internet kullanımı sınırlanabilir mi?", a: "Kişi başı süre ve hız limitleri tanımlanabilir." },
      { q: "Şubelerimizi tek yerden yönetebilir miyiz?", a: "Evet, bulut yönetimiyle tüm şubelerin ağ ve loglama durumunu tek panelden izleyebilirsiniz." },
    ],
    relatedTools: ["5651-risk-testi"],
    relatedRegions: ["konyaalti", "muratpasa", "kas"],
    updatedAt: UPDATED,
  },
  {
    slug: "klinik-ve-ofis",
    name: "Klinik, Hukuk Bürosu ve Ofis",
    h1: "Antalya Klinik, Hukuk Bürosu ve Ofisler İçin Web Sitesi, Kamera ve Siber Güvenlik",
    metaTitle: "Klinik ve Ofisler İçin Web Sitesi ve Güvenlik",
    metaDescription:
      "Antalya'daki diş klinikleri, sağlık merkezleri, hukuk ve muhasebe büroları için web sitesi, güvenlik kamerası, siber güvenlik ve KVKK teknik tedbirleri.",
    icon: "clinic",
    excerpt: "Güven veren web sitesi, randevu, güvenlik kamerası ve hasta/müvekkil verisi için siber güvenlik.",
    definition:
      "Klinik ve ofis bilişim altyapısı; hasta veya müvekkillerin işletmeyi bulduğu güven veren bir web sitesi, randevu ve iletişim kanalları, giriş ve bekleme alanlarını izleyen güvenlik kameraları ve hassas verileri koruyan siber güvenlik katmanlarından oluşur. Antalya'daki klinik, hukuk ve muhasebe bürolarına bu altyapıyı tek elden kuruyoruz.",
    pains: [
      { title: "Google'da rakip klinik çıkıyor", text: "\"Muratpaşa diş kliniği\" arayan hasta, güncel bir web sitesi ve işletme profili olmayan kliniği bulamaz." },
      { title: "Hassas veriler korumasız", text: "Hasta ve müvekkil dosyaları yedeksiz, şifresiz bilgisayarlarda tutulduğunda tek bir fidye yazılımı işi durdurur." },
      { title: "Kamera var ama KVKK belirsiz", text: "Bekleme salonu kayıtları için aydınlatma, saklama süresi ve erişim yetkisi tanımlanmamıştır." },
    ],
    solutions: ["web-tasarim", "dijital-reklam", "siber-guvenlik", "guvenlik-kameralari", "bilisim-danismanligi"],
    sections: [
      {
        h2: "Bir klinik veya hukuk bürosu için web sitesi neden önemli?",
        answer:
          "Hasta ve müvekkiller hizmet almadan önce uzmanı, adresi ve yorumları internette araştırır; güncel, hızlı ve güven veren bir web sitesi bu araştırmanın sonunda arama veya randevuya dönüşen tek noktadır.",
        body:
          "Sağlık ve hukuk alanlarında tanıtım ve reklam kuralları meslek düzenlemeleriyle sınırlandırılmıştır. İçerikleri bilgilendirici, abartısız ve meslek kurallarına uygun dille hazırlıyor, son onayı her zaman size bırakıyoruz.",
      },
      {
        h2: "Klinik ve ofislerde hasta/müvekkil verisi nasıl korunur?",
        answer:
          "Veriler; cihaz şifreleme, uç nokta güvenliği (EDR), rol bazlı erişim, çok faktörlü kimlik doğrulama ve ağdan ayrılmış düzenli yedeklerle korunmalıdır.",
      },
    ],
    objections: [
      { q: "Küçük bir muayenehane için bu kadar sistem gerekli mi?", a: "Hayır, ihtiyacınız kadarını kuruyoruz. Çoğu muayenehane için web sitesi, işletme profili, yedekleme ve temel uç nokta güvenliği yeterli bir başlangıçtır." },
      { q: "Web sitesinde hangi bilgileri paylaşabiliriz?", a: "Meslek kuralları ve reklam yasakları kapsamında yalnızca bilgilendirici içerik yayınlıyoruz; metinlerin son onayı sizdedir." },
    ],
    faqs: [
      { q: "Online randevu sistemi kurabilir misiniz?", a: "Evet. Web sitesine entegre randevu formu veya mevcut randevu yazılımınızla bağlantı kurulabilir." },
      { q: "Daha önce klinik siteleri yaptınız mı?", a: "Diş kliniği, radyoloji merkezi ve hukuk bürosu için hazırladığımız tasarım örneklerini Projeler sayfasında inceleyebilirsiniz." },
      { q: "Bekleme salonuna kamera koymak KVKK'ya aykırı mı?", a: "Aydınlatma levhası, makul saklama süresi ve sınırlı erişim yetkisiyle güvenlik amaçlı kamera kullanılabilir; muayene odası gibi özel alanlar kapsam dışında tutulmalıdır. Hukuki değerlendirme için hukuk danışmanınıza başvurun." },
    ],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["muratpasa", "konyaalti", "kepez"],
    updatedAt: "2026-10-25",
  },
];

export function getSector(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
