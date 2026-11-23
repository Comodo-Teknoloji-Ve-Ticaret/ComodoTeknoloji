import type { Solution } from "./types";

const UPDATED = "2026-11-23";

/**
 * RFID, görüntü işleme, büyükbaş takip ve içerik pazarlaması çözümleri.
 * Not: Bu sayfalarda performans, tasarruf oranı veya müşteri sonucu gibi rakamlar yoktur;
 * gerçek proje verileri oluştukça yalnızca doğrulanmış sonuçlar eklenmelidir.
 */
export const rfidAiSolutions: Solution[] = [
  // ───────────────────────── RFID GENEL ─────────────────────────
  {
    slug: "rfid-cozumleri",
    name: "RFID Takip Sistemleri",
    h1: "Antalya RFID Çözümleri: Envanter, Demirbaş, Tekstil ve Personel Takibi",
    metaTitle: "Antalya RFID Çözümleri ve Takip Sistemleri",
    metaDescription:
      "UHF ve HF RFID ile envanter sayımı, demirbaş, tekstil, personel ve araç takibi. Etiket, okuyucu, anten, yazılım ve ERP/PMS entegrasyonu tek elden. Antalya.",
    icon: "rfid",
    excerpt: "UHF/HF RFID ile envanter, demirbaş, tekstil ve personel takibi; etiket, okuyucu, yazılım ve entegrasyon tek elden.",
    definition:
      "RFID (Radyo Frekanslı Tanımlama); bir nesneye yerleştirilen etiketin, görüş hattı gerektirmeden radyo dalgalarıyla okunarak kimliğinin ve konumunun otomatik kaydedilmesidir. Antalya'daki otel, çamaşırhane, fabrika, depo ve perakende işletmelerine etiket seçimi, okuyucu ve anten yerleşimi, takip yazılımı ve ERP/PMS entegrasyonunu kapsayan uçtan uca RFID sistemleri kuruyoruz.",
    serviceType: "RFID takip sistemi projelendirme, kurulum ve yazılım entegrasyonu",
    audience: [
      "Oteller ve resortlar (tekstil, üniforma, demirbaş)",
      "Endüstriyel çamaşırhaneler",
      "Fabrika, depo ve lojistik işletmeleri",
      "Perakende mağazalar ve AVM'ler",
      "Hastane ve klinikler (tekstil, cihaz takibi)",
    ],
    problems: [
      { title: "Sayım günler sürüyor", text: "Barkodu tek tek okutmak veya elle saymak; depo ve tekstil sayımlarını işletmeyi durduran günlere çevirir." },
      { title: "Nerede olduğu bilinmeyen demirbaş", text: "Hangi cihazın, el arabasının veya ekipmanın hangi bölümde olduğu kayıt altında olmadığında kayıp ve mükerrer satın alma artar." },
      { title: "Kayıtla gerçek stok uyuşmuyor", text: "Elle tutulan listeler gerçeği yansıtmaz; yanlış sipariş, eksik ürün ve değer kaybı oluşur." },
    ],
    sections: [
      {
        h2: "RFID nasıl çalışır?",
        answer:
          "RFID sisteminde okuyucu, anten aracılığıyla radyo sinyali yayar; bu alana giren pasif etiket sinyalden aldığı enerjiyle uyanır ve içindeki benzersiz kimlik numarasını okuyucuya geri gönderir, yazılım da bu okumayı yer ve zaman bilgisiyle kaydeder.",
        bullets: [
          "Etiket (tag): çip + anten; nesneye yapıştırılır, dikilir, gömülür veya askı/kart şeklinde takılır",
          "Okuyucu (reader): sabit (kapı, tünel, raf) veya el tipi (mobil sayım)",
          "Anten: okuma alanının şeklini ve menzilini belirler",
          "Ara katman yazılımı: tekrar eden okumaları ayıklar, okumayı olaya çevirir (giriş, çıkış, sayım)",
          "İş yazılımı / entegrasyon: stok, PMS, ERP veya özel panel",
        ],
      },
      {
        h2: "LF, HF, NFC ve UHF RFID arasındaki fark nedir?",
        answer:
          "Fark çalışma frekansı ve dolayısıyla okuma menzili ile toplu okuma kabiliyetidir: LF ve HF birkaç santimetreden yaklaşık bir metreye kadar yakın okuma yaparken, UHF RFID pasif etiketleri metrelerce mesafeden ve aynı anda çok sayıda okuyabilir.",
        table: {
          caption: "RFID frekans bantlarının karşılaştırması",
          head: ["Özellik", "LF (125–134 kHz)", "HF / NFC (13,56 MHz)", "UHF (Avrupa: 865–868 MHz)"],
          rows: [
            ["Tipik okuma mesafesi", "Birkaç cm", "Birkaç cm – ~1 m", "Birkaç metre (ortama bağlı)"],
            ["Toplu okuma", "Sınırlı", "Orta", "Yüksek (çoklu etiket)"],
            ["Metal ve sıvı yakınında", "İyi", "İyi", "Özel etiket gerekir"],
            ["Yaygın standartlar", "ISO 11784/11785 (hayvan)", "ISO 14443, ISO 15693, NFC", "EPC Gen2 / ISO/IEC 18000-63"],
            ["Tipik kullanım", "Hayvan kimliği, eski kartlar", "Kartlı geçiş, otel kapı kartı, kütüphane", "Envanter, tekstil, lojistik, araç"],
          ],
        },
      },
      {
        h2: "RFID mi, barkod mu, QR kod mu?",
        answer:
          "Az sayıda ürünü tek tek okutmak yetiyorsa barkod ve QR kod en ekonomik çözümdür; çok sayıda nesnenin görüş hattı olmadan, toplu ve otomatik sayılması gerekiyorsa RFID tercih edilir.",
        body:
          "Barkod her okutmada etiketin görünmesini ve kişinin okutmasını gerektirir; RFID ise bir arabadaki, koliden veya raftaki birçok etiketi aynı anda okuyabilir. Bu nedenle RFID'nin değeri ürün başına etiket maliyetinden çok, ortadan kalkan elle sayım emeğinde ve kayıp oranındaki düşüşte aranmalıdır. Hangi senaryoda geri dönüş sağlayacağını keşifte, sizin sayım sıklığınız ve kayıp verinizle birlikte hesaplıyoruz.",
      },
      {
        h2: "RFID projesinde en sık yapılan hatalar nelerdir?",
        answer:
          "En sık hatalar; ortam testi yapmadan etiket seçmek, metal ve sıvı etkisini hesaba katmamak, okuyucu alanlarını gereğinden geniş kurup yanlış okumalara yol açmak ve okumayı iş sürecine bağlayan yazılımı planlamadan donanım almaktır.",
        bullets: [
          "Pilot uygulama (PoC) olmadan tüm tesise yayılmak",
          "Etiketin yıkama, ısı, darbe gibi çevre koşullarına uygunluğunu üretici dokümanından doğrulamamak",
          "Kapı geçişlerinde yön tespiti (giriş mi çıkış mı) kurgulamamak",
          "Mevcut ERP, PMS veya stok yazılımıyla entegrasyonu sonraya bırakmak",
          "Etiketleme (ilk kodlama) iş yükünü ve sorumlusunu planlamamak",
        ],
      },
      {
        h2: "RFID kişisel verilerle ilgili mi?",
        answer:
          "Etiket yalnızca bir nesneyi tanımlıyorsa genellikle kişisel veri değildir; ancak personel kartı, üniforma veya araç gibi bir kişiyle eşleşen etiketlerin okumaları kişisel veri sayılabilir ve KVKK kapsamında aydınlatma, yetkilendirme ve saklama süresi kurgusu gerektirir.",
      },
    ],
    process: {
      title: "RFID projesi nasıl ilerler?",
      steps: [
        { title: "Keşif ve süreç analizi", text: "Neyin, nerede, ne sıklıkla sayıldığını ve kayıp noktalarını birlikte çıkarıyoruz." },
        { title: "Ortam ve etiket testi", text: "Gerçek ürünleriniz üzerinde farklı etiket ve anten kombinasyonlarıyla okuma testi yapılır." },
        { title: "Pilot uygulama", text: "Tek bölüm veya tek süreçte sınırlı kurulum; okuma başarısı ve iş akışı doğrulanır." },
        { title: "Yazılım ve entegrasyon", text: "Takip paneli, raporlar ve ERP/PMS/stok entegrasyonu geliştirilir." },
        { title: "Yaygınlaştırma", text: "Etiketleme, okuyucu kurulumu, kablolama ve network tüm alana yayılır." },
        { title: "Eğitim ve destek", text: "Kullanıcı eğitimi, bakım ve yazılım güncellemeleri." },
      ],
    },
    comparison: {
      caption: "Takip yöntemlerinin karşılaştırması: manuel, barkod/QR, BLE ve RFID",
      head: ["Özellik", "Manuel kayıt", "Barkod / QR", "BLE beacon", "UHF RFID"],
      rows: [
        ["Görüş hattı gerekir mi?", "Evet", "Evet", "Hayır", "Hayır"],
        ["Toplu okuma", "Yok", "Tek tek", "Var (pilli)", "Var (pilsiz etiket)"],
        ["Etiket maliyeti", "Yok", "En düşük", "Yüksek (pil + cihaz)", "Düşük–orta"],
        ["Pil / bakım", "Yok", "Yok", "Pil değişimi gerekir", "Pasif etikette yok"],
        ["Konum hassasiyeti", "Kişiye bağlı", "Okutulan nokta", "Oda/bölge seviyesi", "Okuyucu/kapı/bölge seviyesi"],
        ["En uygun kullanım", "Çok küçük envanter", "Düşük hacim, perakende kasa", "Kişi ve yüksek değerli ekipman konumu", "Yüksek hacimli tekstil, stok, demirbaş"],
      ],
    },
    priceFactors: {
      caption: "RFID projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Etiket adedi ve tipi", "Yüksek", "Yıkanabilir tekstil, metal üstü, sert kasa veya kağıt etiket"],
        ["Okuma noktası sayısı", "Yüksek", "Kapı, tünel, raf, masa üstü ve el terminali adedi"],
        ["Yazılım kapsamı", "Orta", "Hazır modül veya özel takip paneli, raporlar, mobil uygulama"],
        ["Entegrasyon", "Orta", "ERP, PMS, stok veya muhasebe sistemleriyle bağlantı"],
        ["Altyapı", "Orta", "Kablolama, PoE switch, Wi-Fi kapsaması"],
        ["İlk etiketleme iş gücü", "Değişken", "Mevcut envanterin kodlanıp sisteme alınması"],
      ],
    },
    faqs: [
      { q: "RFID etiketi kaç metreden okunur?", a: "Frekansa, etiket tipine, okuyucu gücüne ve ortama bağlıdır. LF ve HF etiketler genellikle santimetreler mertebesinde, pasif UHF etiketler ise uygun anten ve ortamda birkaç metreden okunur. Kesin değer ancak sizin ortamınızda yapılan testle belirlenir." },
      { q: "Metal ürünlerde RFID çalışır mı?", a: "Standart UHF etiketler metal yüzeyde verimsiz çalışır; metal üstü (on-metal) için tasarlanmış özel etiketlerle metal demirbaşlar da takip edilebilir." },
      { q: "Mevcut stok programımızla çalışır mı?", a: "Stok, ERP veya PMS yazılımınız API, veri tabanı veya dosya aktarımına izin veriyorsa RFID okumalarını bu sisteme aktaran entegrasyonu geliştiriyoruz." },
      { q: "Önce küçük bir deneme yapabilir miyiz?", a: "Evet, önerdiğimiz yöntem budur. Tek bölüm veya tek süreçte pilot uygulama yapıp okuma başarısını ve iş akışını doğruladıktan sonra yaygınlaştırıyoruz." },
      { q: "RFID etiketleri kopyalanabilir mi?", a: "Basit etiketlerin kimlik numarası okunabilir; güvenlik gereken senaryolarda (kartlı geçiş, ödeme) şifreleme destekleyen kart teknolojileri ve yazılım tarafında doğrulama kullanılır." },
      { q: "RFID sistemi kurmak ne kadar sürer?", a: "Kapsama bağlıdır. Ortam testi ve pilot uygulama genellikle birkaç hafta içinde tamamlanır; tüm tesise yaygınlaştırma takvimi pilot sonuçlarına göre iş planında yazılır." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb", "avm-ve-site-yonetimi"],
    relatedTools: [],
    relatedRegions: ["belek", "kepez", "alanya"],
    updatedAt: UPDATED,
  },

  // ───────────────────────── ÇAMAŞIRHANE RFID ─────────────────────────
  {
    slug: "camasirhane-rfid",
    name: "Çamaşırhane RFID Tekstil Takibi",
    h1: "Çamaşırhane RFID Sistemi: Otel ve Hastane Tekstilinde Yıkama, Sayım ve Kayıp Takibi",
    metaTitle: "Çamaşırhane RFID Tekstil Takip Sistemi",
    metaDescription:
      "Yıkanabilir UHF RFID etiketlerle çarşaf, havlu, nevresim ve üniforma takibi. Tünel okuyucu, kirli-temiz sayım, yıkama döngüsü ve müşteri bazlı raporlama.",
    icon: "laundry",
    excerpt: "Yıkanabilir RFID etiketlerle çarşaf, havlu ve üniforma sayımı; kirli-temiz takibi, yıkama döngüsü ve kayıp raporu.",
    definition:
      "Çamaşırhane RFID sistemi; çarşaf, havlu, nevresim, masa örtüsü ve üniforma gibi tekstil ürünlerine dikilen veya ısıyla yapıştırılan yıkanabilir UHF RFID etiketlerin, araba veya torba içindeyken tünel okuyucularla toplu sayılmasıdır. Endüstriyel çamaşırhanelere ve kendi çamaşırhanesi olan otellere; kirli-temiz teslim kayıtları, yıkama döngüsü, kayıp ve müşteri bazlı raporlama sağlayan sistemler kuruyoruz.",
    serviceType: "Çamaşırhane ve tekstil RFID takip sistemi",
    audience: [
      "Otellere hizmet veren endüstriyel çamaşırhaneler",
      "Kendi çamaşırhanesi olan oteller ve resortlar",
      "Hastaneler ve sağlık kuruluşları",
      "Tekstil kiralama firmaları",
    ],
    problems: [
      { title: "Teslim edilen ile geri gelen tutmuyor", text: "Otel ve çamaşırhane arasında \"kaç parça gönderildi, kaç parça döndü\" tartışması tartılarak veya elle sayılarak çözülemez." },
      { title: "Tekstil kaybı fark edilmiyor", text: "Havlu ve çarşaf kayıpları dönem sonu sayımında toplu fark olarak çıkar; hangi noktada kaybolduğu bilinmez." },
      { title: "Ürün ömrü ölçülmüyor", text: "Bir parçanın kaç kez yıkandığı bilinmediği için yenileme alımı tahminle yapılır." },
    ],
    sections: [
      {
        h2: "Çamaşırhanede RFID nasıl çalışır?",
        answer:
          "Her tekstil parçasına benzersiz numaralı yıkanabilir bir RFID etiketi takılır; kirli kabulde, yıkama sonrası ve sevkiyatta araba veya torba tünel okuyucudan geçirildiğinde içindeki tüm parçalar tek tek açılmadan sayılır ve yazılım her parçanın hareketini kaydeder.",
        bullets: [
          "Kirli kabul: otelden gelen araba tünelden geçer, parça ve tür bazında sayım otomatik çıkar",
          "Yıkama: her parçanın yıkama döngüsü sayacı artar",
          "Ütü / katlama sonrası: temiz stok güncellenir",
          "Sevkiyat: teslim irsaliyesi okumadan otomatik oluşturulur",
          "Raporlama: müşteri, ürün tipi ve dönem bazında kayıp, fire ve stok",
        ],
      },
      {
        h2: "Çamaşırhane RFID etiketleri yıkamaya ve ütüye dayanır mı?",
        answer:
          "Evet; çamaşırhane için üretilen tekstil tipi UHF etiketler endüstriyel yıkama, yüksek sıcaklık, kimyasal, kurutma ve pres ütüye dayanacak biçimde tasarlanır, ancak dayanım değerleri modelden modele değiştiği için seçim üretici teknik dokümanı ve sizin proses koşullarınızla yapılan testle doğrulanmalıdır.",
        body:
          "Etiketin dikilerek mi, ısıyla mı (heat-seal) yoksa cep içine yerleştirilerek mi takılacağı ürün tipine göre belirlenir. Havlu ve bornozda etiket yerinin standart olması, okuma başarısını ve misafirin etiketi fark etmemesini sağlar.",
      },
      {
        h2: "Otel ile çamaşırhane arasında RFID ne değiştirir?",
        answer:
          "RFID, teslim ve iadeyi tartı veya tahmin yerine parça bazında kayda bağlar; böylece hangi parçanın hangi tarihte kime teslim edildiği ve geri dönmediği raporlanabilir, iki tarafın mutabakatı ortak veriye dayanır.",
      },
      {
        h2: "Çamaşırhane RFID sisteminde hangi donanımlar kullanılır?",
        answer:
          "Temel donanımlar; yıkanabilir tekstil etiketleri, tünel veya kabin tipi toplu okuyucular, masa üstü okuyucular, el terminalleri ve bunları yazılıma bağlayan network altyapısıdır.",
        table: {
          caption: "Çamaşırhane RFID donanımları ve kullanım yerleri",
          head: ["Donanım", "Nerede kullanılır", "Ne sağlar"],
          rows: [
            ["Tekstil RFID etiketi", "Her parçada", "Benzersiz kimlik, yıkama sayacı"],
            ["Tünel / kabin okuyucu", "Kirli kabul, sevkiyat", "Araba veya torbanın toplu sayımı"],
            ["Masa üstü okuyucu", "Katlama, paketleme", "Paket içeriği doğrulama"],
            ["El terminali", "Otel katları, depo", "Yerinde sayım ve arama"],
            ["Yazılım + panel", "Yönetim, müşteri", "Stok, kayıp, döngü ve fatura raporu"],
          ],
        },
      },
    ],
    comparison: {
      caption: "Çamaşırhane tekstil takip yöntemlerinin karşılaştırması",
      head: ["Özellik", "Tartı / ağırlıkla", "Elle sayım", "Barkodlu etiket", "UHF RFID"],
      rows: [
        ["Parça bazında kayıt", "Yok", "Yok", "Var", "Var"],
        ["Sayım hızı", "Hızlı ama yaklaşık", "Yavaş", "Yavaş (tek tek)", "Hızlı (toplu)"],
        ["Yıkama döngüsü takibi", "Yok", "Yok", "Okutulursa", "Otomatik"],
        ["Kayıp noktası tespiti", "Yok", "Zor", "Sınırlı", "Parça ve nokta bazında"],
        ["İş gücü", "Düşük", "Yüksek", "Yüksek", "Düşük"],
      ],
    },
    priceFactors: {
      caption: "Çamaşırhane RFID projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Etiketlenecek parça sayısı", "Yüksek", "Toplam tekstil envanteri ve yıllık yenileme adedi"],
        ["Etiket tipi ve takma yöntemi", "Orta", "Dikme, heat-seal, cep; ürün tipine göre"],
        ["Okuma noktası sayısı", "Yüksek", "Tünel, masa üstü ve el terminali adedi"],
        ["Müşteri / otel sayısı", "Orta", "Çok müşterili yapıda müşteri bazlı raporlama ve portal"],
        ["Entegrasyon", "Orta", "Faturalama, ERP veya otel sistemleriyle bağlantı"],
      ],
    },
    faqs: [
      { q: "Mevcut tekstillere etiket takılabilir mi?", a: "Evet. Mevcut envantere dikme veya ısıyla yapıştırma yöntemiyle etiket takılabilir; yeni alımlarda etiketin tedarikçi tarafından üretimde takılması da planlanabilir." },
      { q: "Etiket misafir tarafından fark edilir mi?", a: "Tekstil etiketleri küçük ve yumuşaktır; genellikle dikiş payına veya bakım etiketinin yanına yerleştirilir." },
      { q: "Bir araba dolusu tekstil gerçekten tek seferde sayılır mı?", a: "Tünel okuyucular toplu okuma için tasarlanmıştır; okuma başarısı etiket yerleşimi, yoğunluk ve tünel tasarımına bağlıdır ve pilot uygulamada sizin ürünlerinizle doğrulanır." },
      { q: "Otel tarafının da donanım alması gerekir mi?", a: "Zorunlu değil. Sayım çamaşırhanede yapılıp rapor otele portal veya e-posta ile sunulabilir; otel katlarında sayım istenirse el terminali eklenir." },
      { q: "Hastane tekstili için de uygun mu?", a: "Evet. Hastane tekstilinde de aynı yaklaşım kullanılır; hijyen süreçleri ve bölüm bazlı dağıtım raporları ihtiyaca göre kurgulanır." },
      { q: "RFID etiketinin ömrü ne kadar?", a: "Etiket ömrü modele ve yıkama koşullarına bağlıdır; üretici dokümanında belirtilen yıkama döngüsü değerini sizin proses koşullarınızla karşılaştırarak seçim yapıyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "klinik-ve-ofis"],
    relatedTools: [],
    relatedRegions: ["belek", "manavgat", "alanya", "kemer"],
    updatedAt: UPDATED,
  },

  // ───────────────────────── OTEL RFID ─────────────────────────
  {
    slug: "otel-rfid",
    name: "Otel RFID Çözümleri",
    h1: "Otel RFID Çözümleri: Havlu, Çarşaf, Üniforma, Demirbaş ve Kartlı Geçiş Takibi",
    metaTitle: "Otel RFID Sistemi: Tekstil ve Demirbaş Takibi",
    metaDescription:
      "Oteller için RFID: havuz havlusu, çarşaf ve üniforma takibi, demirbaş sayımı, personel kartlı geçiş ve PMS entegrasyonu. Belek, Kemer, Alanya ve tüm Antalya.",
    icon: "hotel",
    excerpt: "Havuz havlusu, çarşaf ve üniforma takibi, demirbaş sayımı ve personel kartlı geçiş; PMS entegrasyonlu.",
    definition:
      "Otel RFID çözümleri; havuz ve plaj havlusu, çarşaf, nevresim, personel üniforması ve demirbaşların RFID etiketlerle otomatik sayılması, personel ve misafir kartlı geçişlerinin yönetilmesi ve bu verilerin PMS ile ilişkilendirilmesidir. Antalya'daki otel ve resortlar için kat, havuz, çamaşırhane ve depo noktalarında okuma altyapısı, yazılım ve raporlama kuruyoruz.",
    serviceType: "Otel RFID tekstil, demirbaş ve geçiş kontrol sistemi",
    audience: [
      "Her şey dahil resortlar ve büyük oteller",
      "Havuz ve plaj havlusu kaybı yaşayan tesisler",
      "Üniforma dağıtımı yapan insan kaynakları ve housekeeping ekipleri",
      "Çok bloklu tesisler ve otel zincirleri",
    ],
    problems: [
      { title: "Havuz havluları sezon sonunda eksik", text: "Havlu kartı veya elle kayıt, kalabalık havuz başında işlemez; kayıp dönem sonunda fark edilir." },
      { title: "Üniforma dağıtımı kontrolsüz", text: "Hangi personelde kaç parça üniforma olduğu bilinmez; ayrılan personelin iadesi takip edilemez." },
      { title: "Demirbaş sayımı haftalar sürüyor", text: "Oda, mutfak ve teknik servis demirbaşlarının yıllık sayımı yoğun emek ister ve sonuç çabuk eskir." },
    ],
    sections: [
      {
        h2: "Otelde RFID hangi alanlarda kullanılır?",
        answer:
          "Otellerde RFID en çok havuz ve plaj havlusu takibi, oda tekstili ve çamaşırhane mutabakatı, personel üniforma dağıtımı, demirbaş envanteri ve personel ile misafir kartlı geçişlerinde kullanılır.",
        bullets: [
          "Havuz/plaj havlusu: misafir kartı veya oda numarasıyla eşleşen havlu verme ve iade",
          "Oda tekstili: kata çıkan ve dönen çarşaf, nevresim ve havlu sayımı",
          "Üniforma: personel bazında zimmet, yıkama ve iade",
          "Demirbaş: TV, minibar, mobilya, mutfak ve teknik ekipman envanteri",
          "Kartlı geçiş: personel alanları, depo, kasa ve teknik odalar",
          "Otopark: personel ve misafir araçlarında RFID etiket veya plaka tanıma ile geçiş",
        ],
      },
      {
        h2: "Havuz havlusu takibi RFID ile nasıl yapılır?",
        answer:
          "Her havluya yıkanabilir RFID etiketi takılır; havlu verilirken misafirin oda kartı veya bilekliği okutulup havluyla eşleştirilir, iade noktasında okuyucu havluyu otomatik düşer ve gün sonunda iade edilmeyen havlular oda bazında listelenir.",
        body:
          "Bu yaklaşım misafire ek iş çıkarmaz ve havlu kartı dağıtma ihtiyacını ortadan kaldırabilir. İade edilmeyen havlular için uygulanacak politika (hatırlatma, ücretlendirme) otel yönetiminin kararıdır; sistem yalnızca güvenilir veriyi sunar.",
      },
      {
        h2: "Otel RFID sistemi PMS ile entegre olur mu?",
        answer:
          "PMS'iniz API veya arayüz desteği sunuyorsa misafir ve oda bilgisi RFID yazılımına aktarılabilir; böylece havlu ve geçiş kayıtları oda ve konaklama dönemiyle eşleşir.",
      },
      {
        h2: "Otel kapı kartları da RFID midir?",
        answer:
          "Yaygın otel kapı kilidi sistemleri çoğunlukla 13,56 MHz HF RFID/NFC kartlarla çalışır; aynı kart, uyumlu sistemlerde havuz havlusu, personel alanı veya otopark geçişi gibi ek senaryolarda da kullanılabilir.",
        body:
          "Kapı kilidi sisteminizin kart teknolojisini keşifte kontrol ediyoruz. Uyumlu değilse havlu ve geçiş senaryoları için ayrı bileklik veya kart tipi önerilir.",
      },
    ],
    comparison: {
      caption: "Otel havlu ve tekstil takip yöntemlerinin karşılaştırması",
      head: ["Özellik", "Havlu kartı / fiş", "Elle liste", "RFID"],
      rows: [
        ["Misafir başına kayıt", "Kart bazında", "Personele bağlı", "Oda/kart bazında otomatik"],
        ["Yoğun saatlerde hız", "Orta", "Düşük", "Yüksek"],
        ["Kayıp raporu", "Dönem sonunda", "Güvenilir değil", "Günlük, oda bazında"],
        ["Çamaşırhane mutabakatı", "Yok", "Elle", "Parça bazında"],
        ["Personel iş yükü", "Orta", "Yüksek", "Düşük"],
      ],
    },
    priceFactors: {
      caption: "Otel RFID projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Takip edilecek ürün grupları", "Yüksek", "Havlu, oda tekstili, üniforma, demirbaş"],
        ["Etiket adedi", "Yüksek", "Envanter büyüklüğü ve yıllık yenileme"],
        ["Okuma noktaları", "Yüksek", "Havuz, plaj, kat ofisi, çamaşırhane, depo, personel girişi"],
        ["PMS ve kapı kilidi entegrasyonu", "Orta", "Marka ve arayüz desteğine göre"],
        ["Dış mekân altyapısı", "Orta", "Havuz ve plaj noktalarında enerji, network ve koruma kutusu"],
      ],
    },
    faqs: [
      { q: "Mevcut otel kartlarımızla havlu takibi yapılabilir mi?", a: "Kart teknolojisi ve kilit sisteminin izin verdiği ölçüde evet. Keşifte kart tipini kontrol edip mevcut kartla mı yoksa ek bileklikle mi ilerleneceğini netleştiriyoruz." },
      { q: "Havuz başında kurulum hava koşullarına dayanır mı?", a: "Dış mekân noktalarında uygun koruma sınıfında kutular, gölgelik altı yerleşim ve kablolama planlanır; Antalya'nın nemli ve tuzlu kıyı havası ekipman seçiminde dikkate alınır." },
      { q: "Çamaşırhanemiz dış firma; yine de kullanabilir miyiz?", a: "Evet. Otel tarafında çıkış ve dönüş sayımı yapılarak dış çamaşırhaneyle mutabakat raporu oluşturulabilir; çamaşırhane de RFID kullanıyorsa veriler eşleştirilebilir." },
      { q: "Personel üniforma takibi KVKK açısından sorun olur mu?", a: "Üniforma zimmeti kişiyle eşleştiği için kişisel veri işlenir; aydınlatma metni, erişim yetkileri ve saklama süresi hukuk danışmanınızla birlikte belirlenmelidir. Teknik tarafını biz kurgularız." },
      { q: "Sezon başlamadan kurulum yetişir mi?", a: "Pilot ve kurulum takvimi kapsamına göre değişir; sezon öncesi devreye almak için keşfin kış aylarında yapılması önerilir." },
      { q: "Otel Wi-Fi ve network altyapısı yeterli mi?", a: "Okuyucular kablolu network veya Wi-Fi ile çalışır. Mevcut altyapıyı keşifte kontrol ediyor, gerekiyorsa network iyileştirmesini aynı projede planlıyoruz." },
    ],
    relatedSectors: ["otel-ve-resort"],
    relatedTools: ["ag-yenileme-hesaplayici"],
    relatedRegions: ["belek", "kemer", "alanya", "manavgat"],
    updatedAt: UPDATED,
  },

  // ───────────────────────── GÖRÜNTÜ İŞLEME ─────────────────────────
  {
    slug: "goruntu-isleme",
    name: "Görüntü İşleme & Yapay Zekâ",
    h1: "Antalya Görüntü İşleme ve Yapay Zekâ: Sayım, Kalite Kontrol, İSG ve Video Analitiği",
    metaTitle: "Görüntü İşleme ve Yapay Zekâ Video Analitiği",
    metaDescription:
      "Kamera görüntüsünden kişi ve araç sayımı, üretimde hata tespiti, baret/yelek (İSG) kontrolü, doluluk ve ısı haritası. Mevcut kameralarla entegre görüntü işleme.",
    icon: "vision",
    excerpt: "Kameradan kişi/araç sayımı, üretim hata tespiti, İSG ekipman kontrolü, doluluk ve ısı haritası.",
    definition:
      "Görüntü işleme; kamera veya fotoğraf görüntülerinin yapay zekâ ve bilgisayarlı görü algoritmalarıyla analiz edilerek nesne, kişi, araç, hata veya olayın otomatik tespit edilip sayılmasıdır. Antalya'daki fabrika, otel, AVM, tarım ve hayvancılık işletmelerine mevcut kameralarla çalışan, sahada (edge) veya sunucuda koşan, raporları panele ve alarm sistemlerine aktaran özel görüntü işleme çözümleri geliştiriyoruz.",
    serviceType: "Görüntü işleme, bilgisayarlı görü ve video analitiği yazılımı",
    audience: [
      "Üretim tesisleri ve fabrikalar (kalite kontrol, İSG)",
      "AVM, mağaza ve restoranlar (ziyaretçi sayımı, doluluk)",
      "Oteller (havuz, restoran, giriş yoğunluğu)",
      "Tarım ve hayvancılık işletmeleri",
      "Otopark ve site yönetimleri",
    ],
    problems: [
      { title: "Kameralar kaydediyor ama kimse izlemiyor", text: "Yüzlerce saatlik kayıt yalnızca olaydan sonra açılır; anlık uyarı ve ölçülebilir veri üretmez." },
      { title: "Kalite kontrol göze bağlı", text: "Bandın hızında yorulan göz, hatalı ürünü kaçırır; hata oranı ve nedeni kayıt altına alınmaz." },
      { title: "Yoğunluk tahminle yönetiliyor", text: "Kasa, restoran veya giriş yoğunluğu ölçülmediği için personel planı deneyime dayanır." },
    ],
    sections: [
      {
        h2: "Görüntü işleme hangi işlerde kullanılır?",
        answer:
          "Görüntü işleme; kişi ve araç sayımı, alan ihlali ve kalabalık uyarısı, üretim hattında hata ve eksik parça tespiti, baret ve yelek gibi iş güvenliği ekipmanı kontrolü, plaka ve metin okuma (OCR), doluluk ölçümü ve hayvan davranışı takibi gibi işlerde kullanılır.",
        table: {
          caption: "Sektöre göre görüntü işleme kullanım örnekleri",
          head: ["Sektör", "Kullanım", "Çıktı"],
          rows: [
            ["Fabrika", "Hata / eksik parça tespiti, İSG ekipman kontrolü", "Hatalı ürün uyarısı, vardiya raporu"],
            ["AVM / mağaza", "Ziyaretçi sayımı, ısı haritası, kuyruk uzunluğu", "Saatlik trafik ve dönüşüm raporu"],
            ["Otel / restoran", "Havuz, restoran ve lobi doluluğu", "Anlık doluluk, personel planı"],
            ["Otopark / site", "Plaka okuma, boş yer sayımı", "Geçiş kaydı, doluluk bilgisi"],
            ["Hayvancılık", "Hayvan sayımı, hareketlilik, yemlik/suluk ziyareti", "Davranış değişikliği uyarısı"],
          ],
        },
      },
      {
        h2: "Mevcut güvenlik kameralarıyla görüntü işleme yapılabilir mi?",
        answer:
          "Çoğu durumda evet; RTSP/ONVIF görüntü akışı veren IP kameralar analiz yazılımına bağlanabilir, ancak açı, çözünürlük, ışık ve kare hızı analiz için yetersizse ilgili noktaya ek veya farklı kamera önerilir.",
        body:
          "Analizin başarısını en çok kamera yerleşimi belirler. Kalite kontrolde sabit ışık ve sabit mesafe, sayımda tepeden veya çapraz açı, plaka okumada doğru açı ve deklanşör hızı gerekir. Keşifte örnek görüntü alıp analize uygunluğu birlikte değerlendiriyoruz.",
      },
      {
        h2: "Görüntü işleme sahada mı, bulutta mı çalışmalı?",
        answer:
          "Anlık tepki gereken ve görüntünün tesis dışına çıkmaması istenen senaryolarda sahada (edge) çalışan cihazlar; çok noktalı raporlama ve model güncellemesi önemli olan senaryolarda merkezi sunucu veya bulut tercih edilir, çoğu projede ikisi birlikte kullanılır.",
      },
      {
        h2: "Görüntü işleme projeleri nasıl doğrulanır?",
        answer:
          "Her proje sizin gerçek görüntülerinizle yapılan bir pilot ölçümle doğrulanır; modelin doğru ve hatalı tespitleri elle kontrol edilen örneklerle karşılaştırılır ve kabul kriteri baştan yazılı olarak belirlenir.",
        body:
          "Görüntü işlemede genel geçer bir başarı oranı yoktur; aynı model farklı ışık, açı ve ürünlerde farklı sonuç verir. Bu nedenle teklif aşamasında oran vaat etmiyor, pilot sonucunu birlikte ölçüyoruz.",
      },
      {
        h2: "Kamera analitiği KVKK açısından neye dikkat etmeli?",
        answer:
          "Kişi tespiti ve sayımı yapan sistemlerde aydınlatma levhaları, amaçla sınırlı işleme, erişim yetkileri ve saklama süresi belirlenmeli; mümkün olan senaryolarda yüz bulanıklaştırma ve yalnızca sayısal veri saklama tercih edilmelidir. Yüz tanıma gibi biyometrik işleme ise özel nitelikli kişisel veri kapsamındadır ve ayrıca hukuki değerlendirme gerektirir.",
      },
    ],
    process: {
      title: "Görüntü işleme projesi nasıl ilerler?",
      steps: [
        { title: "Kullanım senaryosu", text: "Neyin tespit edileceği, hangi kararın bu veriye bağlanacağı ve başarı kriteri yazılır." },
        { title: "Örnek görüntü toplama", text: "Mevcut veya geçici kameralarla gerçek koşullarda görüntü alınır." },
        { title: "Model ve kural geliştirme", text: "Hazır modeller uyarlanır veya etiketlenen verilerle özel model eğitilir." },
        { title: "Pilot ölçüm", text: "Sonuçlar elle kontrol edilen örneklerle karşılaştırılır; kabul kriteri doğrulanır." },
        { title: "Entegrasyon", text: "Panel, alarm, e-posta/WhatsApp bildirimi ve ERP/MES bağlantısı." },
        { title: "İzleme ve iyileştirme", text: "Mevsim, ürün ve ışık değişimlerine göre model güncellenir." },
      ],
    },
    comparison: {
      caption: "Görüntü işleme çözüm seçeneklerinin karşılaştırması",
      head: ["Özellik", "Kameranın yerleşik analitiği", "Hazır bulut yazılımı", "Özel görüntü işleme (Comodo)"],
      rows: [
        ["Kurulum hızı", "Hızlı", "Hızlı", "Pilot gerektirir"],
        ["Senaryoya özel uyarlama", "Sınırlı", "Sınırlı", "Tam"],
        ["Farklı marka kameralar", "Yalnızca o marka", "Desteklenenler", "RTSP/ONVIF ile geniş"],
        ["Veri nerede kalır", "Kamera / NVR", "Sağlayıcının bulutu", "Sizin sunucunuz veya seçtiğiniz bulut"],
        ["İş sistemlerine entegrasyon", "Alarm çıkışı", "API'ye bağlı", "ERP, PMS, MES, özel panel"],
      ],
    },
    priceFactors: {
      caption: "Görüntü işleme projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Kamera / analiz noktası sayısı", "Yüksek", "Eş zamanlı işlenecek görüntü akışı"],
        ["Model ihtiyacı", "Yüksek", "Hazır model uyarlaması veya özel eğitim ve veri etiketleme"],
        ["İşlem donanımı", "Orta", "Edge cihaz, GPU'lu sunucu veya bulut"],
        ["Entegrasyon ve panel", "Orta", "Raporlama, alarm ve iş sistemleri bağlantısı"],
        ["Ek kamera ve aydınlatma", "Değişken", "Analize uygun açı ve ışık için"],
      ],
    },
    faqs: [
      { q: "Görüntü işleme ile video analitiği aynı şey mi?", a: "Video analitiği, görüntü işlemenin güvenlik ve operasyon kameralarına uygulanmış hâlidir. Görüntü işleme daha geniş bir kavramdır; üretim hattındaki tek kare fotoğraftan dron görüntüsüne kadar her türlü görüntüyü kapsar." },
      { q: "Hangi teknolojileri kullanıyorsunuz?", a: "Projenin ihtiyacına göre güncel nesne algılama ve sınıflandırma modelleri, bilgisayarlı görü kütüphaneleri ve Python tabanlı servisler kullanıyoruz; sonuçları web paneli ve bildirim sistemleriyle sunuyoruz." },
      { q: "Yüz tanıma sistemi kuruyor musunuz?", a: "Yüz tanıma biyometrik veri işlediği için KVKK kapsamında özel nitelikli kişisel veridir ve ancak hukuki dayanağı netleşmiş senaryolarda değerlendirilir. Çoğu operasyonel ihtiyaç (sayım, doluluk, İSG) yüz tanımaya gerek olmadan karşılanabilir." },
      { q: "Gece veya düşük ışıkta çalışır mı?", a: "Kızılötesi aydınlatmalı veya düşük ışık performansı yüksek kameralarla çalışabilir; termal kamera gerektiren senaryolar keşifte belirlenir." },
      { q: "Sonuçları telefondan görebilir miyiz?", a: "Evet. Raporlar web paneli üzerinden mobilde görüntülenir; kritik olaylar e-posta veya WhatsApp bildirimiyle iletilebilir." },
      { q: "Pilot uygulama ücretli mi?", a: "İlk keşif ve senaryo değerlendirmesi ücretsizdir. Pilot ölçümün kapsamı ve ücreti, örnek görüntüler incelendikten sonra yazılı olarak belirlenir." },
    ],
    relatedSectors: ["fabrika-ve-osb", "avm-ve-site-yonetimi", "otel-ve-resort"],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["kepez", "muratpasa", "manavgat"],
    updatedAt: UPDATED,
  },

  // ───────────────────────── BÜYÜKBAŞ / İNEK TAKİP ─────────────────────────
  {
    slug: "buyukbas-hayvan-takip",
    name: "İnek & Büyükbaş Takip Sistemi",
    h1: "İnek ve Büyükbaş Takip Sistemi: RFID Küpe, Kamera ve Görüntü İşleme ile Akıllı Çiftlik",
    metaTitle: "İnek Takip Sistemi: RFID ve Görüntü İşleme",
    metaDescription:
      "Büyükbaş çiftlikleri için RFID küpe okuma, ahır kamerası, görüntü işleme ile hareketlilik, yemlik/suluk ziyareti ve doğum takibi. Sürü yönetim paneli ve bildirimler.",
    icon: "livestock",
    excerpt: "RFID küpe okuma, ahır kamerası ve görüntü işleme ile hayvan kimliği, hareketlilik ve davranış takibi.",
    definition:
      "Büyükbaş takip sistemi; ineklerin RFID kulak küpesi veya boyun tasmasıyla tanımlanması, ahır ve padok kameralarının görüntü işlemeyle analiz edilmesi ve hareketlilik, yemlik-suluk ziyareti, doğum yaklaşması gibi davranış değişikliklerinin sürü yönetim panelinde izlenmesidir. Antalya ve çevresindeki çiftliklere kamera, RFID, network ve yazılımı birlikte kuruyoruz.",
    serviceType: "Akıllı çiftlik: büyükbaş RFID, kamera ve görüntü işleme takip sistemi",
    audience: [
      "Süt sığırcılığı işletmeleri",
      "Besi çiftlikleri",
      "Kooperatifler ve üretici birlikleri",
      "Tarım ve hayvancılık yatırımı yapan girişimler",
    ],
    problems: [
      { title: "Davranış değişikliği geç fark ediliyor", text: "Hareketi azalan, yeme gelmeyen veya topallayan hayvan, bakıcının o hayvanı görmesine kadar fark edilmez." },
      { title: "Doğum ve gece olayları kaçırılıyor", text: "Ahırın gece sürekli izlenmesi mümkün değildir; doğuma yaklaşan hayvan için uzaktan görüntü ihtiyacı vardır." },
      { title: "Kayıtlar defterde", text: "Aşı, tohumlama, süt ve tartı kayıtları farklı yerlerde tutulur; hayvan bazında geçmişe ulaşmak zorlaşır." },
    ],
    sections: [
      {
        h2: "İnek takip sistemi nasıl çalışır?",
        answer:
          "Her hayvan RFID kulak küpesi veya sensörlü tasmayla tanımlanır; sağım odası, yemlik, suluk ve geçiş noktalarındaki okuyucular hayvanın ne zaman nerede olduğunu kaydeder, kameralar ve görüntü işleme hareket ve davranış verisi üretir, yazılım da bu verileri hayvan bazında birleştirip olağan dışı değişikliklerde bildirim gönderir.",
        bullets: [
          "Kimlik: RFID kulak küpesi (LF veya UHF) ile otomatik hayvan tanıma",
          "Geçiş ve konum: sağım odası, padok ve bölme geçişlerinde okuma",
          "Kamera: ahır, padok ve doğum bölmesinin uzaktan canlı izlenmesi",
          "Görüntü işleme: hayvan sayımı, hareketlilik ve yemlik/suluk ziyaret süresi analizi",
          "Panel: hayvan kartı, aşı-tohumlama-tartı kayıtları, bildirimler",
        ],
      },
      {
        h2: "Görüntü işleme büyükbaş hayvancılıkta ne işe yarar?",
        answer:
          "Görüntü işleme; ahırdaki hayvanların sayılmasını, hayvan veya bölme bazında hareketliliğin ölçülmesini, yemlik ve suluk başında geçirilen sürenin izlenmesini ve normalden sapan davranışların erken uyarı olarak bakıcıya bildirilmesini sağlar.",
        body:
          "Kameradan vücut kondisyonu veya canlı ağırlık tahmini gibi ileri analizler araştırma ve ticari ürünlerde uygulanmaktadır; ancak doğruluğu ırk, kamera konumu ve kalibrasyona bağlı olduğu için bu tür analizleri ancak sizin çiftliğinizde yapılan pilot ölçümle doğrulandıktan sonra karar desteği olarak öneriyoruz. Sistem veteriner muayenesinin yerini almaz; neyi önce kontrol etmeniz gerektiğini gösterir.",
      },
      {
        h2: "Mevcut resmi kulak küpeleri RFID ile okunabilir mi?",
        answer:
          "Küpenin elektronik (RFID) olup olmadığına bağlıdır; yalnızca görsel numaralı küpeler okuyucuyla okunamaz, bu durumda resmi küpeye ek olarak işletme içi kullanım için RFID küpe veya tasma eklenir ve hayvan kimlik numarasıyla eşleştirilir.",
        body:
          "Resmi hayvan kayıt ve küpeleme yükümlülükleri Tarım ve Orman Bakanlığı mevzuatına tabidir; sistemimiz bu kayıtların yerine geçmez, işletme içi takibi kolaylaştırır.",
      },
      {
        h2: "Çiftlikte hangi altyapı gerekir?",
        answer:
          "Ahır ve padoku kapsayan kamera noktaları, okuma noktalarında RFID okuyucu, bunları bağlayan dış mekâna dayanıklı kablolama veya kablosuz köprü, kesintisiz güç kaynağı ve internet bağlantısı temel altyapıdır.",
        table: {
          caption: "Büyükbaş takip sistemi bileşenleri",
          head: ["Bileşen", "Nerede", "Ne sağlar"],
          rows: [
            ["RFID küpe / tasma", "Her hayvanda", "Otomatik kimlik"],
            ["RFID okuyucu", "Sağım odası, geçişler, yemlik", "Hayvan bazında ziyaret kaydı"],
            ["IP kamera (gece görüşlü)", "Ahır, padok, doğum bölmesi", "Uzaktan izleme, görüntü işleme verisi"],
            ["Kablosuz köprü / fiber", "Binalar arası", "Uzak ahırların ağa bağlanması"],
            ["Sunucu / edge cihaz", "Çiftlik ofisi", "Görüntü analizi ve kayıt"],
            ["Yönetim paneli", "Telefon, bilgisayar", "Hayvan kartları, bildirimler, raporlar"],
          ],
        },
      },
    ],
    process: {
      title: "Çiftlik takip sistemi nasıl kurulur?",
      steps: [
        { title: "Çiftlik keşfi", text: "Ahır yerleşimi, hayvan sayısı, sağım düzeni ve mevcut kayıt yöntemi incelenir." },
        { title: "Öncelik belirleme", text: "Doğum izleme, hareketlilik, yemlik takibi veya kimlik otomasyonu: önce hangisi?" },
        { title: "Altyapı kurulumu", text: "Kamera, okuyucu, kablolama/kablosuz köprü ve enerji." },
        { title: "Pilot bölme", text: "Bir bölmede görüntü işleme ve RFID okuma doğrulanır." },
        { title: "Panel ve bildirimler", text: "Hayvan kartları, kayıtlar ve uyarılar telefona taşınır." },
        { title: "Yaygınlaştırma ve destek", text: "Tüm sürüye yayılır, periyodik bakım yapılır." },
      ],
    },
    comparison: {
      caption: "Büyükbaş takip yöntemlerinin karşılaştırması",
      head: ["Özellik", "Defter / gözlem", "Yalnızca kamera", "Sensörlü tasma / pedometre", "RFID + kamera + görüntü işleme"],
      rows: [
        ["Hayvan bazında otomatik kimlik", "Yok", "Yok", "Var", "Var"],
        ["Uzaktan canlı izleme", "Yok", "Var", "Yok", "Var"],
        ["Hareketlilik verisi", "Gözleme bağlı", "Sınırlı (elle izleme)", "Var (hayvan başı sensör)", "Var (kamera + okuma noktaları)"],
        ["Hayvan başı donanım maliyeti", "Yok", "Yok", "Yüksek", "Düşük (küpe) + nokta başı kamera"],
        ["Kayıtların tek panelde birleşmesi", "Yok", "Yok", "Üretici yazılımında", "Özel panelde, entegrasyona açık"],
      ],
    },
    priceFactors: {
      caption: "Büyükbaş takip sisteminin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Hayvan sayısı", "Yüksek", "Küpe/tasma adedi"],
        ["Ahır ve padok büyüklüğü", "Yüksek", "Kamera ve okuma noktası sayısı"],
        ["Binalar arası mesafe", "Orta", "Fiber veya kablosuz köprü ihtiyacı"],
        ["Görüntü işleme kapsamı", "Orta", "Sayım, hareketlilik, yemlik/suluk analizi"],
        ["Enerji altyapısı", "Değişken", "UPS, solar destek ihtiyacı"],
      ],
    },
    faqs: [
      { q: "İnek takip sistemi küçük çiftlikler için uygun mu?", a: "Evet; ölçek küçüldükçe kurgu sadeleşir. Küçük işletmelerde genellikle doğum bölmesi kamerası, uzaktan izleme ve basit hayvan kayıt paneliyle başlanır." },
      { q: "Kızgınlık (östrus) tespiti yapabiliyor mu?", a: "Kızgınlık tespitinde yaygın yöntem hayvan başına takılan aktivite sensörleridir. Kamera tabanlı hareketlilik analizi destekleyici veri sunabilir; ihtiyacınıza göre sensör tabanlı ürünleri de panelimize entegre edebiliriz." },
      { q: "Ahırda internet yok, sistem çalışır mı?", a: "Kayıt ve analiz çiftlikteki cihazda yerel olarak çalışabilir; uzaktan izleme için mobil hat veya kablosuz köprüyle internet bağlantısı kurulur." },
      { q: "Ahırın tozu ve nemi kameraya zarar verir mi?", a: "Dış mekân ve tarım ortamına uygun koruma sınıfında kameralar, koruma kutuları ve periyodik temizlik planıyla kurulum yapılır." },
      { q: "Sistem veterinerin yerini alır mı?", a: "Hayır. Sistem, normalden sapan hayvanları erken fark etmenizi sağlayan bir karar destek aracıdır; teşhis ve tedavi veteriner hekimin işidir." },
      { q: "Mevcut sürü yönetim yazılımımızla birleşir mi?", a: "Yazılımınız veri aktarımına izin veriyorsa RFID ve kamera verilerini bu yazılıma aktaran entegrasyonu geliştirebiliriz." },
    ],
    relatedSectors: ["fabrika-ve-osb"],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["manavgat", "kepez"],
    updatedAt: UPDATED,
  },

  // ───────────────────────── SEO, İÇERİK ve ÇEKİM ─────────────────────────
  {
    slug: "seo-icerik-pazarlama",
    name: "SEO, İçerik & Çekim",
    h1: "Antalya SEO Hizmeti, İçerik Pazarlaması ve Profesyonel Fotoğraf-Video Çekimi",
    metaTitle: "Antalya SEO Hizmeti, İçerik ve Video Çekimi",
    metaDescription:
      "Google'da üst sıralar ve yapay zekâ aramalarında görünürlük için SEO, içerik pazarlaması, blog yazımı ve işletmenize özel fotoğraf-video çekimi. Antalya.",
    icon: "video",
    excerpt: "Teknik SEO, içerik ve blog yazımı, işletmenize özel fotoğraf-video çekimi ve sosyal medya içerik planı.",
    definition:
      "SEO ve içerik pazarlaması; web sitenizin Google'da ve ChatGPT gibi yapay zekâ cevap motorlarında bulunabilmesi için teknik altyapının düzeltilmesi, müşterilerinizin sorularını yanıtlayan içeriklerin yazılması ve işletmenizi gerçek fotoğraf ve videolarla anlatan görsel içerik üretimidir. Antalya'daki işletmeler için SEO, blog, ürün ve mekân çekimi ile sosyal medya içerik planını tek ekipte yürütüyoruz.",
    serviceType: "SEO, içerik pazarlaması ve fotoğraf-video prodüksiyonu",
    audience: [
      "Google'da rakiplerinin gerisinde kalan yerel işletmeler",
      "Otel, restoran, kafe ve turizm işletmeleri",
      "Klinik, hukuk bürosu ve danışmanlık ofisleri",
      "E-ticaret yapan üretici ve markalar",
    ],
    problems: [
      { title: "Siteniz var ama aramada yok", text: "Hizmet sayfası olmayan, soruları cevaplamayan ve teknik hatalı siteler arama sonuçlarında görünmez." },
      { title: "Stok görsel güven vermiyor", text: "Her rakipte görülen hazır fotoğraflar işletmenizi ayırt etmez; gerçek mekân ve ekip görüntüsü güven oluşturur." },
      { title: "İçerik düzensiz ve plansız", text: "Ara sıra yapılan paylaşımlar ve bloglar ölçülmediği için hangi içeriğin müşteri getirdiği bilinmez." },
    ],
    sections: [
      {
        h2: "SEO hizmeti neleri kapsar?",
        answer:
          "SEO hizmeti; sitenin taranma ve hız sorunlarını gideren teknik SEO, her hizmet ve bölge için arama niyetine uygun sayfalar oluşturan içerik SEO'su, Google İşletme Profili ile yerel SEO ve yapay zekâ cevap motorları için GEO çalışmalarını kapsar.",
        bullets: [
          "Teknik SEO: hız (Core Web Vitals), mobil uyum, site haritası, yönlendirmeler, yapılandırılmış veri",
          "Anahtar kelime ve soru araştırması: müşterilerinizin gerçekten ne aradığı",
          "Hizmet, ilçe ve sektör sayfaları; soru-cevap yapılı içerik",
          "Blog ve rehber yazıları: uzmanlığı gösteren, kaynak gösterilen içerik",
          "Yerel SEO: Google İşletme Profili, NAP tutarlılığı, yorum yönetimi",
          "GEO: llms.txt, net tanım paragrafları, alıntılanabilir tablolar",
          "Aylık raporlama: Search Console, analitik ve dönüşüm verisi",
        ],
      },
      {
        h2: "Fotoğraf ve video çekimi SEO'ya katkı sağlar mı?",
        answer:
          "Evet; işletmeye özgün, doğru dosya adı, alternatif metin ve yapılandırılmış veriyle yayımlanan fotoğraf ve videolar Google Görseller ve video sonuçlarında ek görünürlük sağlar, sayfada kalma süresini ve güveni artırır.",
        body:
          "Çekimleri yalnızca sosyal medya için değil, web sitesi ve Google İşletme Profili için de planlıyoruz: hizmet sayfasına uygun yatay kareler, sosyal medya için dikey kısa videolar ve haritada görünen mekân fotoğrafları aynı çekim gününde üretilir.",
      },
      {
        h2: "Hangi çekimleri yapıyorsunuz?",
        answer:
          "İşletme tanıtım videosu, mekân ve oda fotoğrafları, ürün fotoğrafları, ekip ve hizmet anı çekimleri ile sosyal medya için dikey kısa videolar (Reels/Shorts) üretiyoruz.",
        table: {
          caption: "Çekim türleri ve kullanım alanları",
          head: ["Çekim türü", "Nerede kullanılır", "Amaç"],
          rows: [
            ["Mekân / oda fotoğrafı", "Web sitesi, Google İşletme Profili, rezervasyon siteleri", "İlk izlenim ve güven"],
            ["Ürün fotoğrafı", "E-ticaret, katalog, reklam", "Satış ve dönüşüm"],
            ["Tanıtım videosu", "Ana sayfa, YouTube, reklam", "Marka hikâyesi"],
            ["Dikey kısa video", "Instagram, TikTok, YouTube Shorts", "Erişim ve etkileşim"],
            ["Ekip ve süreç çekimi", "Hakkımızda, hizmet sayfaları", "Uzmanlığı gösterme"],
          ],
        },
      },
      {
        h2: "SEO sonuçları ne zaman görülür?",
        answer:
          "Teknik düzeltmeler ve Google İşletme Profili iyileştirmelerinin etkisi genellikle haftalar içinde, yeni içeriklerin sıralama kazanması ise rekabete bağlı olarak aylar içinde görülür; SEO kısa vadeli kampanya değil birikimli bir yatırımdır.",
        body:
          "Hiçbir firma Google'da belirli bir sırayı garanti edemez. Biz görünürlük, tıklama ve form/telefon dönüşümü gibi ölçülebilir hedefler koyup aylık raporluyoruz.",
      },
    ],
    process: {
      title: "SEO ve içerik çalışması nasıl ilerler?",
      steps: [
        { title: "SEO denetimi", text: "Teknik hatalar, mevcut sıralamalar ve rakip görünürlüğü çıkarılır." },
        { title: "Kelime ve soru haritası", text: "Hizmet, ilçe ve sektör bazında hedef aramalar belirlenir." },
        { title: "Teknik düzeltmeler", text: "Hız, şema, site haritası, yönlendirme ve mobil sorunlar giderilir." },
        { title: "Çekim günü", text: "Mekân, ürün ve ekip fotoğrafları ile kısa videolar üretilir." },
        { title: "İçerik üretimi", text: "Sayfalar ve blog yazıları yazılır, görsellerle yayımlanır." },
        { title: "Ölçüm ve rapor", text: "Search Console, analitik ve dönüşüm verisiyle aylık rapor." },
      ],
    },
    comparison: {
      caption: "Dijital görünürlük yöntemlerinin karşılaştırması",
      head: ["Özellik", "Yalnızca reklam", "Yalnızca sosyal medya", "SEO + içerik + çekim"],
      rows: [
        ["Bütçe bitince", "Görünürlük durur", "Erişim düşer", "İçerik çalışmaya devam eder"],
        ["Kullanıcı niyeti", "Aktif arayan", "Keşfeden", "Aktif arayan + keşfeden"],
        ["Güven etkisi", "Orta", "Orta", "Yüksek (özgün görsel + uzman içerik)"],
        ["Yapay zekâ aramalarında görünürlük", "Yok", "Sınırlı", "Hedeflenir (GEO)"],
        ["Sonuç hızı", "Hemen", "Hızlı", "Birikimli (haftalar–aylar)"],
      ],
    },
    priceFactors: {
      caption: "SEO, içerik ve çekim hizmetinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Rekabet düzeyi", "Yüksek", "Hedeflenen aramalardaki rakip sayısı ve gücü"],
        ["Aylık içerik adedi", "Yüksek", "Sayfa, blog ve sosyal medya içerik sayısı"],
        ["Çekim kapsamı", "Orta", "Çekim günü sayısı, lokasyon, video kurgu adedi"],
        ["Teknik düzeltme ihtiyacı", "Orta", "Mevcut sitenin durumu; yeniden yapım gerekip gerekmediği"],
        ["Raporlama sıklığı", "Düşük", "Aylık rapor ve toplantı"],
      ],
    },
    faqs: [
      { q: "SEO ile Google'da ilk sırayı garanti ediyor musunuz?", a: "Hayır. Organik sıralamayı kimse garanti edemez; garanti veren tekliflere dikkat edin. Ölçülebilir hedefler koyup ilerlemeyi aylık raporluyoruz." },
      { q: "Mevcut sitemde SEO yapabilir misiniz?", a: "Evet. Önce teknik denetim yapıyoruz; mevcut altyapı yeterliyse üzerine çalışıyor, ciddi sınırlamalar varsa yeniden yapım seçeneğini gerekçesiyle sunuyoruz." },
      { q: "Çekimleri nerede yapıyorsunuz?", a: "Antalya merkez ve ilçelerde işletmenizin kendi mekânında çekim yapıyoruz; ürün çekimleri için ürünlerin bize ulaştırılması da mümkün." },
      { q: "Çekilen fotoğraf ve videoların hakları kimde olur?", a: "Teslim edilen içeriklerin işletmeniz tarafından kullanım hakları ve kapsamı sözleşmede yazılı olarak belirlenir." },
      { q: "Sosyal medya hesaplarımızı yönetir misiniz?", a: "İçerik planı, çekim ve kurgu tarafını üstleniyoruz; paylaşım takvimi ve reklam yönetimi ihtiyaca göre aynı pakete eklenebilir." },
      { q: "Blog yazıları kim tarafından yazılıyor?", a: "İçerikler sektörünüzü araştıran ekibimiz tarafından yazılır ve yayından önce sizin onayınıza sunulur; teknik konularda sizden kısa bir uzman görüşü almak içeriğin güvenilirliğini artırır." },
    ],
    relatedSectors: ["restoran-ve-kafe", "otel-ve-resort", "klinik-ve-ofis"],
    relatedTools: [],
    relatedRegions: ["muratpasa", "konyaalti", "alanya"],
    updatedAt: UPDATED,
  },
];
