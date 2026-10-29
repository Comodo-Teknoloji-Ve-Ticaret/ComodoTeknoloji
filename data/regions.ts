import type { Region } from "./types";

const UPDATED = "2026-10-24";

/**
 * Her ilçe için özgün içerik. Kopya içerik yasak: yeni ilçe eklerken profil, ihtiyaçlar
 * ve SSS'yi o bölgeye özel yazın. responseTime alanını gerçek taahhüdünüzle doldurun.
 */
export const regions: Region[] = [
  {
    slug: "belek",
    name: "Belek",
    locative: "Belek'te",
    h1: "Belek Resort ve Golf Tesisleri İçin Network, Kamera ve 5651",
    metaTitle: "Belek Otel Network, Wi-Fi ve Kamera Sistemleri",
    metaDescription:
      "Belek'teki resort oteller ve golf tesisleri için geniş alan Wi-Fi, dış mekan kamera, fiber omurga ve 5651 loglama. Sezon öncesi kurulum planı.",
    definition:
      "Belek, büyük yüzölçümlü 5 yıldızlı resort otellerin ve golf sahalarının yoğunlaştığı, Serik ilçesine bağlı bir turizm bölgesidir. Bu tesislerde bloklar arası fiber omurga, villa ve plaj alanlarını kapsayan dış mekan Wi-Fi, geniş çevre güvenliği ve binlerce misafirin 5651 loglaması tek planla yönetilmelidir.",
    profile:
      "Belek'teki tesisler genellikle onlarca bloktan, villalardan, aquaparklardan ve kongre merkezlerinden oluşan kampüs yapısındadır. Golf sahaları ise yüzlerce dönümlük açık alanlar, kulüp binaları ve bakım tesisleri içerir. Bu ölçek, şehir oteli mantığıyla kurulmuş ağların sezon yoğunluğunda neden çöktüğünü açıklar.",
    typicalBusinesses: ["Ultra her şey dahil resort oteller", "Golf kulüpleri ve sahaları", "Kongre ve etkinlik merkezleri", "Aquapark ve plaj tesisleri"],
    needs: [
      { title: "Kampüs ölçeğinde fiber omurga", text: "Bloklar, villalar ve teknik binalar arasında yedekli fiber halka topolojisi." },
      { title: "Açık alan Wi-Fi'si", text: "Havuz, plaj ve bahçe alanlarında dış mekan sınıfı AP'lerle kesintisiz dolaşım." },
      { title: "Geniş çevre güvenliği", text: "Sahil hattı ve çevre duvarlarında termal kamera ve video analitik." },
      { title: "Yüksek eşzamanlı 5651 loglama", text: "Binlerce misafir cihazını PMS entegrasyonuyla kişiyle eşleştiren hotspot." },
    ],
    solutions: ["kurumsal-network", "5651-loglama-hotspot", "guvenlik-kameralari", "zayif-akim"],
    sectors: ["otel-ve-resort"],
    responseTime: "[DOLDURULACAK: Belek için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Belek'teki bir resort için Wi-Fi yenileme ne zaman planlanmalı?", a: "Kasım–Şubat arası kurulum için keşif ve projelendirmenin Ekim ayında tamamlanması önerilir; böylece Nisan açılışından önce test süresi kalır." },
      { q: "Golf sahasında kamera ve Wi-Fi kurulabilir mi?", a: "Evet. Güneş enerjili direkler, kablosuz köprüler (point-to-point) ve dış mekan kabinleriyle saha içi noktalara altyapı taşınabilir." },
      { q: "Sezon içinde arıza olursa ne kadar sürede gelirsiniz?", a: "[DOLDURULACAK: Belek için müdahale süresi taahhüdü]" },
    ],
    nearby: ["manavgat", "kemer"],
    updatedAt: UPDATED,
  },
  {
    slug: "alanya",
    name: "Alanya",
    locative: "Alanya'da",
    h1: "Alanya Otel ve Siteleri İçin Wi-Fi, Kamera ve Plaka Tanıma",
    metaTitle: "Alanya Otel ve Site Güvenlik ve Network Sistemleri",
    metaDescription:
      "Alanya'daki oteller, rezidanslar ve konut siteleri için Wi-Fi, CCTV, plaka tanıma ve 5651 loglama. Yerinde keşif ve kurulum.",
    definition:
      "Alanya, şehir merkezine yayılmış orta ölçekli oteller ile yabancı yerleşiklerin yoğun olduğu rezidans ve konut sitelerinin birlikte bulunduğu bir ilçedir. Bu karma yapı; otellerde 5651 uyumlu Wi-Fi, sitelerde ise plaka tanıma, kamera ve ortak alan altyapısı ihtiyacını öne çıkarır.",
    profile:
      "Mahmutlar, Kestel, Oba ve Avsallar gibi mahallelerde havuzlu, güvenlikli konut siteleri; merkez ve Kleopatra çevresinde ise dikey yapılaşmış oteller yaygındır. Sitelerde yönetim kurulları şeffaf, raporlanabilir güvenlik ister; otellerde ise dar parsellerde yüksek oda yoğunluğu Wi-Fi planlamasını zorlaştırır.",
    typicalBusinesses: ["Şehir ve sahil otelleri", "Rezidans ve konut siteleri", "Apart oteller", "Restoran ve kafeler"],
    needs: [
      { title: "Sitelerde plaka tanıma", text: "Kumanda karmaşasını bitiren, misafir aracı süreli tanımlanabilen geçiş sistemi." },
      { title: "Dikey otellerde oda içi Wi-Fi", text: "Koridor AP'leri yerine oda içi erişim noktalarıyla betonarme kayıplarının önüne geçme." },
      { title: "Çok dilli captive portal", text: "Yabancı misafirler için Türkçe, İngilizce, Almanca ve Rusça karşılama sayfası." },
    ],
    solutions: ["plaka-tanima-sistemi", "guvenlik-kameralari", "kurumsal-network", "5651-loglama-hotspot"],
    sectors: ["otel-ve-resort", "avm-ve-site-yonetimi"],
    responseTime: "[DOLDURULACAK: Alanya için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Alanya'daki sitemiz için plaka tanıma kurulumu ne kadar sürer?", a: "Altyapısı hazır tek giriş-çıkışlı bir sitede kurulum birkaç gün sürer; kazı ve kanal ihtiyacı varsa süre keşifte netleşir." },
      { q: "Captive portal yabancı dillerde olabilir mi?", a: "Evet, karşılama ve aydınlatma metinleri birden fazla dilde sunulabilir." },
      { q: "Alanya'ya keşif için ücret alıyor musunuz?", a: "[DOLDURULACAK: Alanya keşif ücret politikası]" },
    ],
    nearby: ["manavgat"],
    updatedAt: UPDATED,
  },
  {
    slug: "manavgat",
    name: "Manavgat",
    locative: "Manavgat'ta",
    h1: "Manavgat ve Side Otelleri İçin Network, Kamera ve 5651 Çözümleri",
    metaTitle: "Manavgat ve Side Otel Wi-Fi ve Kamera Sistemleri",
    metaDescription:
      "Manavgat, Side, Kızılağaç ve Kumköy'deki oteller için Wi-Fi yenileme, CCTV, 5651 loglama ve zayıf akım. Sezon öncesi kurulum.",
    definition:
      "Manavgat; Side, Kumköy, Çolaklı, Kızılağaç ve Titreyengöl hattındaki büyük resort otelleriyle Antalya'nın en yüksek yatak kapasitesine sahip turizm bölgelerinden biridir. Burada otellerin ihtiyacı, sezon boyunca on binlerce misafir cihazını kesintisiz taşıyan ağ ve 5651 altyapısıdır.",
    profile:
      "Bölgedeki otellerin önemli bir kısmı 1990'lar ve 2000'lerde inşa edilmiş, ek bloklarla büyümüştür. Bu nedenle farklı dönemlerde çekilmiş kablolar, farklı markalarda AP'ler ve dokümantasyonu olmayan kabinetler sık karşılaşılan bir tablodur.",
    typicalBusinesses: ["Büyük resort oteller", "Tatil köyleri", "Butik oteller (Side)", "Restoran ve eğlence mekanları"],
    needs: [
      { title: "Altyapı envanteri ve sadeleştirme", text: "Farklı dönemlerden kalan kablolama ve cihazların tespiti, etiketlenmesi ve tek yönetime alınması." },
      { title: "Sezon öncesi Wi-Fi yenilemesi", text: "Kış döneminde blok bazlı AP ve switch değişimi." },
      { title: "Merkezi 5651 loglama", text: "Tüm blokları tek hotspot altında toplayan, PMS entegre loglama." },
    ],
    solutions: ["zayif-akim", "kurumsal-network", "5651-loglama-hotspot", "guvenlik-kameralari"],
    sectors: ["otel-ve-resort", "restoran-ve-kafe"],
    responseTime: "[DOLDURULACAK: Manavgat için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Otelimizin kabinetleri dokümansız; nereden başlamalıyız?", a: "İlk adım altyapı envanteridir: kabinetleri, portları ve hatları test edip etiketliyor, mevcut durum şemasını çıkarıyoruz. Yenileme planı bu şemaya göre yapılır." },
      { q: "Side'deki butik otelimiz için de uygun paket var mı?", a: "Evet, küçük ölçekli tesisler için bulut yönetimli, düşük başlangıç maliyetli Wi-Fi ve hotspot paketleri sunuyoruz." },
      { q: "Manavgat'ta yerinde destek veriyor musunuz?", a: "[DOLDURULACAK: Manavgat için müdahale süresi taahhüdü]" },
    ],
    nearby: ["belek", "alanya"],
    updatedAt: UPDATED,
  },
  {
    slug: "kemer",
    name: "Kemer",
    locative: "Kemer'de",
    h1: "Kemer Otelleri ve Tatil Köyleri İçin Wi-Fi, Kamera ve 5651",
    metaTitle: "Kemer Otel Wi-Fi, Kamera ve 5651 Çözümleri",
    metaDescription:
      "Kemer, Beldibi, Göynük, Çamyuva ve Tekirova'daki oteller ile tatil köyleri için Wi-Fi, kamera, 5651 loglama ve kablosuz köprü çözümleri.",
    definition:
      "Kemer; Beldibi'den Tekirova'ya uzanan, dağ ile deniz arasındaki dar sahil şeridine yayılmış oteller, tatil köyleri ve marinadan oluşan bir turizm ilçesidir. Engebeli arazi ve yamaçlara dağılmış bloklar, kablosuz köprü ve dış mekan ağ çözümlerini bu bölgede özellikle önemli kılar.",
    profile:
      "Tatil köyü tipindeki tesislerde bungalovlar ve bloklar ağaçlık, eğimli alanlara dağılmıştır. Kazı yapmanın zor ya da yasak olduğu yerlerde noktadan noktaya kablosuz köprüler ve doğru konumlanmış dış mekan AP'leri fiber kadar kritik hale gelir.",
    typicalBusinesses: ["Tatil köyleri", "Sahil otelleri", "Marina ve yat işletmeleri", "Restoran ve beach club'lar"],
    needs: [
      { title: "Kablosuz köprü bağlantıları", text: "Kazı yapılamayan alanlarda bloklar arası yüksek kapasiteli kablosuz bağlantı." },
      { title: "Ağaçlık alanlarda Wi-Fi", text: "Bitki örtüsü ve eğimin sinyal kaybını hesaba katan site survey." },
      { title: "Marina ve iskele güvenliği", text: "Nem ve tuzlu ortama dayanıklı kamera ve kabinler." },
    ],
    solutions: ["kurumsal-network", "guvenlik-kameralari", "5651-loglama-hotspot"],
    sectors: ["otel-ve-resort", "restoran-ve-kafe"],
    responseTime: "[DOLDURULACAK: Kemer için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Bungalovlara kablo çekmeden internet verilebilir mi?", a: "Evet. Noktadan noktaya veya noktadan çok noktaya kablosuz köprülerle bungalov gruplarına yüksek kapasiteli bağlantı taşınabilir." },
      { q: "Deniz kenarındaki cihazlar paslanmaz mı?", a: "Tuzlu ve nemli ortamlar için uygun IP koruma sınıfına sahip, korozyona dayanıklı ekipman ve kabinler kullanıyoruz." },
      { q: "Kemer'e acil müdahale süreniz nedir?", a: "[DOLDURULACAK: Kemer için müdahale süresi taahhüdü]" },
    ],
    nearby: ["konyaalti", "belek"],
    updatedAt: UPDATED,
  },
  {
    slug: "kepez",
    name: "Kepez",
    locative: "Kepez'de",
    h1: "Kepez Fabrika, Depo ve İşletmeleri İçin Network ve Güvenlik Sistemleri",
    metaTitle: "Kepez Fabrika ve İşletme Network ve Kamera Sistemleri",
    metaDescription:
      "Kepez ve çevresindeki sanayi siteleri, fabrikalar ve depolar için fiber, endüstriyel network, termal kamera ve plaka tanıma.",
    definition:
      "Kepez, Antalya'nın en kalabalık ilçelerinden biridir ve sanayi siteleri, depolar, toptan ticaret işletmeleri ile konut alanlarını bir arada barındırır. Bölgedeki işletmelerin ihtiyacı turizmden farklıdır: geniş depo alanları, araç trafiği ve üretim ağlarının güvenliği önceliklidir.",
    profile:
      "Kepez ve çevresindeki sanayi bölgelerinde (Antalya OSB'ye yakın tesisler dahil) çelik konstrüksiyon depolar, yükleme rampaları ve geniş açık alanlar yaygındır. Metal yapılar Wi-Fi'yi zorlar, uzun mesafeler fiber gerektirir, kamyon trafiği ise plaka tanıma ihtiyacı doğurur.",
    typicalBusinesses: ["Fabrikalar ve atölyeler", "Lojistik ve dağıtım depoları", "Toptancı işletmeler", "Konut siteleri"],
    needs: [
      { title: "Depo Wi-Fi'si", text: "Metal raf ve konstrüksiyonların yansımalarını hesaba katan, el terminali dostu kablosuz ağ." },
      { title: "Kamyon girişinde plaka tanıma", text: "Sevkiyat ve kantar kayıtlarıyla eşleşen araç geçiş kayıtları." },
      { title: "Çevre güvenliği", text: "Geniş açık alanlarda termal kamera ve alan ihlali analitiği." },
    ],
    solutions: ["guvenlik-kameralari", "kurumsal-network", "plaka-tanima-sistemi", "siber-guvenlik", "zayif-akim", "web-tasarim"],
    sectors: ["fabrika-ve-osb", "avm-ve-site-yonetimi"],
    responseTime: "[DOLDURULACAK: Kepez için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Çelik depoda Wi-Fi neden kopuyor?", a: "Metal raflar ve konstrüksiyon sinyali yansıtıp zayıflatır. Raf koridorlarına göre konumlanan, yönlü antenli AP'lerle bu sorun çözülür." },
      { q: "Kantar kayıtlarımız plaka tanımayla eşleşebilir mi?", a: "Evet, entegrasyonla her tartım kaydına aracın giriş-çıkış fotoğrafı ve saati eklenebilir." },
      { q: "Kepez'e yerinde destek süreniz nedir?", a: "[DOLDURULACAK: Kepez için müdahale süresi taahhüdü]" },
    ],
    nearby: ["muratpasa", "konyaalti"],
    updatedAt: UPDATED,
  },
  {
    slug: "konyaalti",
    name: "Konyaaltı",
    locative: "Konyaaltı'nda",
    h1: "Konyaaltı Siteleri, Restoranları ve Otelleri İçin Güvenlik ve Network",
    metaTitle: "Konyaaltı Site, Restoran ve Otel Güvenlik Sistemleri",
    metaDescription:
      "Konyaaltı'ndaki konut siteleri, sahil restoranları, kafeler ve şehir otelleri için plaka tanıma, CCTV, 5651 uyumlu Wi-Fi.",
    definition:
      "Konyaaltı; sahil şeridi boyunca uzanan restoran, kafe ve beach club'ları, Hurma, Liman ve Sarısu çevresindeki yeni konut siteleri ve şehir otelleriyle yerleşik yaşam ile turizmin iç içe geçtiği bir ilçedir. Bu yapı, sitelerde geçiş güvenliğini, sahil işletmelerinde ise 5651 uyumlu misafir Wi-Fi'sini öne çıkarır.",
    profile:
      "Yeni inşa edilen konut sitelerinde altyapı genellikle müteahhit standardında bırakılır; yönetimler kısa süre içinde plaka tanıma, kamera ve ortak alan Wi-Fi'si ihtiyacıyla karşılaşır. Sahil işletmeleri ise yazın çok yüksek, kışın düşük müşteri trafiğine göre ölçeklenen esnek çözümler arar.",
    typicalBusinesses: ["Yeni konut siteleri", "Sahil restoranları ve beach club'lar", "Şehir otelleri", "Kafe zincirleri"],
    needs: [
      { title: "Yeni sitelerde geçiş kontrolü", text: "Plaka tanıma, bariyer ve yaya turnikesiyle tamamlanan giriş güvenliği." },
      { title: "Sahil işletmelerinde 5651", text: "Dış mekan AP ve SMS doğrulamalı hotspot ile uyumlu misafir Wi-Fi'si." },
      { title: "Ortak alan kameraları", text: "Havuz, otopark ve çocuk oyun alanlarında net görüntü." },
    ],
    solutions: ["guvenlik-kameralari", "plaka-tanima-sistemi", "web-tasarim", "5651-loglama-hotspot", "kurumsal-network", "dijital-reklam"],
    sectors: ["avm-ve-site-yonetimi", "restoran-ve-kafe", "otel-ve-resort", "klinik-ve-ofis"],
    responseTime: "[DOLDURULACAK: Konyaaltı için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Yeni teslim aldığımız sitede altyapı yetersiz; ne yapmalıyız?", a: "Önce mevcut zayıf akım altyapısını keşifte inceliyoruz. Boş borular ve kabinet kapasitesi yeterliyse plaka tanıma ve kamera sistemleri büyük inşaat işi gerektirmeden eklenir." },
      { q: "Beach club için dış mekan Wi-Fi kurulabilir mi?", a: "Evet, dış mekan sınıfı AP'lerle sahil alanı kapsanır ve 5651 loglama hotspot üzerinden yapılır." },
      { q: "Konyaaltı'nda yerinde destek süreniz nedir?", a: "[DOLDURULACAK: Konyaaltı için müdahale süresi taahhüdü]" },
    ],
    nearby: ["muratpasa", "kemer", "kepez"],
    updatedAt: UPDATED,
  },
  {
    slug: "muratpasa",
    name: "Muratpaşa",
    locative: "Muratpaşa'da",
    h1: "Muratpaşa ve Lara'daki Ofisler, Oteller ve Kliniklere Bilişim Çözümleri",
    metaTitle: "Muratpaşa ve Lara Ofis, Otel ve Klinik Bilişim Çözümleri",
    metaDescription:
      "Muratpaşa ve Lara'daki ofisler, şehir otelleri, klinikler ve mağazalar için network, siber güvenlik, kamera ve 5651 çözümleri.",
    definition:
      "Muratpaşa; Kaleiçi'nin butik otelleri, Lara'nın büyük otelleri, şehir merkezindeki ofis binaları, klinikler ve mağazalarıyla Antalya'nın ticari kalbidir. Burada öne çıkan ihtiyaç, çok sayıda küçük ve orta ölçekli işletmenin veri güvenliği, ofis ağı ve 5651 yükümlülükleridir.",
    profile:
      "Ofisimiz Muratpaşa'da, Kızılsaray Mahallesi'nde Şarampol Caddesi üzerindedir; bu yüzden Muratpaşa, Kaleiçi ve Lara'daki işletmelere en kısa sürede yerinde ulaşabiliyoruz. Kaleiçi'nde tarihi dokudaki butik otellerde kablo güzergahı bulmak ve koruma kurallarına uymak özel çözümler ister. Ofis ve kliniklerde ise hasta/müşteri verilerinin KVKK'ya uygun korunması, yedekleme ve fidye yazılımı koruması önceliklidir.",
    typicalBusinesses: ["Kaleiçi butik otelleri", "Lara bölgesi büyük oteller", "Ofis ve plazalar", "Klinikler ve muayenehaneler"],
    needs: [
      { title: "Tarihi yapılarda görünmez altyapı", text: "Dekorasyonu bozmayan güzergah ve oda içi AP çözümleri." },
      { title: "Ofis siber güvenliği", text: "EDR, yönetilen firewall ve 3-2-1 yedekleme." },
      { title: "Klinik veri koruması", text: "Hasta verileri için ağ segmentasyonu ve erişim kayıtları." },
    ],
    solutions: ["web-tasarim", "siber-guvenlik", "guvenlik-kameralari", "yazilim", "kurumsal-network", "dijital-reklam"],
    sectors: ["klinik-ve-ofis", "otel-ve-resort", "restoran-ve-kafe"],
    responseTime: "[DOLDURULACAK: Muratpaşa için müdahale süresi taahhüdü]",
    faqs: [
      { q: "Kaleiçi'ndeki tarihi binamıza kablo çekilebilir mi?", a: "Mevcut boşluklar, dekoratif kanallar ve gerekiyorsa kablosuz köprülerle yapıya zarar vermeden altyapı kurulabilir; koruma kurallarına uygunluğu proje öncesinde değerlendiriyoruz." },
      { q: "Küçük ofisimiz için yönetilen güvenlik hizmeti var mı?", a: "Evet, cihaz sayısına göre ölçeklenen aylık EDR ve firewall yönetimi paketleri sunuyoruz." },
      { q: "Muratpaşa'da aynı gün müdahale ediyor musunuz?", a: "[DOLDURULACAK: Muratpaşa için müdahale süresi taahhüdü]" },
    ],
    nearby: ["konyaalti", "kepez"],
    updatedAt: UPDATED,
  },
];

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug);
}
