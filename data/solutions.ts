import { digitalSolutions } from "./solutions-digital";
import type { Solution } from "./types";

const UPDATED = "2026-10-24";

const infraSolutions: Solution[] = [
  {
    slug: "zayif-akim",
    name: "Zayıf Akım & Yapısal Kablolama",
    h1: "Antalya Otel ve İşletmeler İçin Zayıf Akım Projelendirme ve Kurulum",
    metaTitle: "Zayıf Akım Projelendirme ve Kurulum | Antalya",
    metaDescription:
      "Otel, fabrika ve siteler için CAT6/CAT6A ve fiber yapısal kablolama. Fluke sertifika testi, etiketli kabinet ve ağ şeması teslimi. Ücretsiz keşif.",
    icon: "cable",
    excerpt: "CAT6A, fiber omurga, etiketli kabinetler ve Fluke test raporuyla teslim edilen altyapı.",
    definition:
      "Zayıf akım, bir binadaki veri, ses, görüntü ve güvenlik sistemlerini taşıyan düşük gerilimli altyapıdır. Antalya'daki otel, fabrika ve sitelerde CAT6/CAT6A bakır ve fiber optik kablolamayı TIA-568 ve ISO/IEC 11801 standartlarına göre projelendirip kuruyor, her hattı Fluke cihazıyla test ederek etiketli kabinet ve ağ şemasıyla teslim ediyoruz.",
    serviceType: "Zayıf akım projelendirme ve yapısal kablolama",
    audience: ["Yeni inşa veya renovasyondaki oteller", "Fabrika ve OSB tesisleri", "Konut siteleri ve rezidanslar", "AVM ve ofis binaları"],
    problems: [
      { title: "Kimin hangi kablo olduğu bilinmiyor", text: "Etiketsiz kabinetler her arızada saatlerce hat aramaya, yanlış portun sökülmesine yol açar." },
      { title: "Sezon ortasında çıkan kablo arızaları", text: "Test edilmeden bırakılan hatlar yük altında paket kaybı yapar; Wi-Fi ve kamera şikayeti olarak geri döner." },
      { title: "Her sistem ayrı firmadan, ayrı kabloyla", text: "Kamera, Wi-Fi, IPTV ve santral için çekilen ayrı hatlar tavaları doldurur, bakımı imkansızlaştırır." },
    ],
    sections: [
      {
        h2: "CAT6 mı CAT6A mı, yoksa fiber mi kullanılmalı?",
        answer:
          "Yeni projelerde yatay kablolamada CAT6A, binalar ve katlar arası omurgada fiber optik tercih edilmelidir; CAT6 yalnızca kısa mesafeli ve 1 Gbps yeterli olan uç noktalarda ekonomik bir seçenektir.",
        body:
          "CAT6A, 100 metreye kadar 10 Gbps taşır ve Wi-Fi 6/7 erişim noktalarının yüksek PoE güç ihtiyacını daha düşük ısınmayla karşılar. Fiber; uzun mesafe, yıldırım/topraklama farkı olan bloklar arası bağlantılar ve elektromanyetik gürültülü fabrika ortamları için tek doğru cevaptır.",
      },
      {
        h2: "Kablolama işi bittiğinde size ne teslim edilir?",
        answer:
          "Her projede port bazlı Fluke sertifika test raporu, etiketlenmiş kabinet ve patch paneller, IP planı ve güncel ağ topoloji şeması teslim edilir.",
        bullets: [
          "Fluke DSX serisi kablo sertifika raporu (her link için geçti/kaldı ve marj değerleri)",
          "Kabinet, patch panel, priz ve kablo uçlarında aynı kodla etiketleme",
          "Kat planı üzerinde priz yerleşim çizimi ve kabinet ön görünüş çizimi",
          "IP planı, VLAN tablosu ve ağ topoloji şeması (PDF + düzenlenebilir format)",
          "Malzeme listesi, garanti belgeleri ve bakım önerileri",
        ],
      },
      {
        h2: "Otelde zayıf akım kurulumu operasyonu durdurur mu?",
        answer:
          "Hayır; kurulumu blok blok, doluluk takvimine göre ve gerekirse gece saatlerinde yaparak misafir alanlarında kesintiyi en aza indiriyoruz.",
        body:
          "Keşif sırasında otelin doluluk planını ve kritik alanlarını (resepsiyon, mutfak, toplantı salonları) birlikte çıkarıyoruz. Geçiş dönemi boyunca eski ve yeni altyapı paralel çalıştırılır; geçiş anı onayınızla yapılır.",
      },
    ],
    comparison: {
      caption: "Kablo türlerinin karşılaştırması",
      head: ["Özellik", "CAT6", "CAT6A", "Fiber (OM4 / OS2)"],
      rows: [
        ["Bant genişliği", "250 MHz", "500 MHz", "Pratikte mesafe ile sınırlı"],
        ["10 Gbps mesafe", "~55 m", "100 m", "OM4: ~400 m · OS2: km seviyesi"],
        ["PoE ısı performansı", "Orta", "İyi", "PoE taşımaz"],
        ["Elektromanyetik gürültü", "Etkilenir", "Daha az etkilenir (ekranlı tipler)", "Etkilenmez"],
        ["Tipik kullanım", "Ofis uç noktası, telefon", "Wi-Fi AP, kamera, yeni projeler", "Omurga, bloklar arası, fabrika"],
      ],
    },
    priceFactors: {
      caption: "Zayıf akım projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Toplam metraj ve nokta sayısı", "Yüksek", "Priz/uç nokta sayısı ve kabinete olan ortalama mesafe"],
        ["Kablo kategorisi", "Orta", "CAT6, CAT6A veya fiber seçimi ve ekranlı/ekransız tip"],
        ["Mevcut tava ve boru altyapısı", "Yüksek", "Sıfırdan tava/kanal açılması işçiliği belirgin artırır"],
        ["Kabinet sayısı ve donanımı", "Orta", "Kat kabinetleri, enerji, havalandırma, UPS"],
        ["Çalışma saatleri", "Orta", "Gece veya sezon içi çalışma ek ekip planlaması gerektirir"],
        ["Test ve dokümantasyon kapsamı", "Düşük", "Fluke sertifikası, çizim ve as-built teslimi"],
      ],
    },
    faqs: [
      { q: "Zayıf akım hangi sistemleri kapsar?", a: "Data/network kablolaması, fiber omurga, CCTV, IPTV/uydu dağıtımı, IP santral, yangın algılama altyapısı, kartlı geçiş, seslendirme ve otomasyon sistemleri zayıf akım kapsamındadır." },
      { q: "Mevcut kablolamamız yeniden kullanılabilir mi?", a: "Keşifte mevcut hatları örnekleme ile test ediyoruz. Kategori ve test sonuçları yeterliyse kablolama korunur, yalnızca kabinet düzeni ve etiketleme yenilenir." },
      { q: "Fluke testi neden önemli?", a: "Fluke sertifika testi her hattın standart değerleri karşıladığını belgeler. Arıza durumunda kablonun suçlu olup olmadığını dakikalar içinde ayırt etmenizi sağlar ve üretici garantisi için genellikle şarttır." },
      { q: "Proje çizimlerini kim hazırlıyor?", a: "Keşif sonrası kat planları üzerinde priz yerleşimi, kabinet konumları ve omurga güzergahını kendi mühendis ekibimiz çiziyor; onayınızdan sonra uygulamaya geçiliyor." },
      { q: "Kurulum ne kadar sürer?", a: "Süre nokta sayısı ve tava altyapısına bağlıdır. Keşif sonrası verdiğimiz iş programında blok bazlı başlangıç ve bitiş tarihleri yer alır. [DOLDURULACAK: örnek proje süreleri]" },
      { q: "Kurulum sonrası destek veriyor musunuz?", a: "Evet. Teslim sonrası garanti süresi boyunca ücretsiz müdahale ve isteğe bağlı SLA'lı bakım paketleri sunuyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb", "avm-ve-site-yonetimi"],
    relatedTools: ["ag-yenileme-hesaplayici"],
    relatedRegions: ["belek", "kepez", "alanya"],
    updatedAt: UPDATED,
  },
  {
    slug: "kurumsal-network",
    name: "Kurumsal Network & Wi-Fi",
    h1: "Antalya Kurumsal Network ve Otel Wi-Fi Kurulumu",
    metaTitle: "Kurumsal Network ve Otel Wi-Fi Kurulumu | Antalya",
    metaDescription:
      "Otel ve işletmeler için Wi-Fi 6/7 site survey, switch, firewall ve VLAN tasarımı. Misafir şikayetlerini sezon öncesi çözen ağ altyapısı.",
    icon: "wifi",
    excerpt: "Site survey ile planlanan Wi-Fi 6/7, yönetilebilir switch, firewall ve merkezi izleme.",
    definition:
      "Kurumsal network; erişim noktaları (AP), switch, firewall ve yönetim yazılımından oluşan, işletmenin tüm cihazlarını güvenli ve kesintisiz bağlayan altyapıdır. Antalya'daki oteller ve işletmeler için site survey ile Wi-Fi kapsama planı çıkarıyor, VLAN ile misafir ve personel trafiğini ayırıyor ve ağı merkezi olarak izliyoruz.",
    serviceType: "Kurumsal ağ ve kablosuz ağ kurulumu",
    audience: ["Oteller ve tatil köyleri", "Fabrikalar ve depolar", "Ofis ve plazalar", "Siteler ve rezidanslar"],
    problems: [
      { title: "Odada çeken ama bağlanmayan Wi-Fi", text: "Koridora yerleştirilmiş az sayıda AP sinyal gösterir ama betonarme duvarlardan geçemeyen kapasite misafiri bağlantısız bırakır." },
      { title: "Misafir ve personel aynı ağda", text: "VLAN ayrımı olmayan ağda bir misafir cihazı POS, PMS ve kamera sistemlerine erişebilir." },
      { title: "Arızayı misafir haber veriyor", text: "Merkezi izleme yoksa kapanan bir switch'i ancak şikayet geldiğinde fark edersiniz." },
    ],
    sections: [
      {
        h2: "Bir otel için kaç access point gerekir?",
        answer:
          "Betonarme otellerde genellikle her 2–4 odaya bir erişim noktası gerekir; kesin sayı ise duvar yapısı, oda büyüklüğü ve eşzamanlı kullanıcı sayısına göre yapılan site survey ile belirlenir.",
        body:
          "Kapsama tek başına yeterli değildir; asıl hedef kapasitedir. Bir resort otelde lobi, havuz başı ve restoran gibi yoğun alanlar ayrı kapasite planlaması ister. Oda içi (in-room) AP çözümleri, koridor tipi yerleşime göre misafir başına çok daha iyi performans verir.",
      },
      {
        h2: "Wi-Fi 6 mı, Wi-Fi 7 mi tercih edilmeli?",
        answer:
          "Bugün kurulacak çoğu otel ve ofis için Wi-Fi 6/6E fiyat-performans açısından yeterlidir; yüksek yoğunluklu alanlar ve 5+ yıllık yatırım ufku için Wi-Fi 7 değerlendirilmelidir.",
        body:
          "Wi-Fi 7'nin avantajlarından yararlanmak için switch tarafında multi-gigabit portlar ve yeterli PoE bütçesi gerekir. 6 GHz bandının Türkiye'deki kullanım koşullarını kurulum öncesinde güncel BTK düzenlemesine göre doğruluyoruz.",
      },
      {
        h2: "Ağ kurulduktan sonra nasıl izleniyor?",
        answer:
          "Tüm AP, switch ve firewall cihazları merkezi yönetim panelinden izlenir; cihaz düştüğünde veya trafik anormalleştiğinde ekibimize otomatik alarm gelir.",
      },
    ],
    comparison: {
      caption: "Wi-Fi nesillerinin karşılaştırması",
      head: ["Özellik", "Wi-Fi 5 (802.11ac)", "Wi-Fi 6/6E (802.11ax)", "Wi-Fi 7 (802.11be)"],
      rows: [
        ["Frekans bantları", "5 GHz", "2.4 / 5 GHz (6E: + 6 GHz)", "2.4 / 5 / 6 GHz"],
        ["Maks. kanal genişliği", "160 MHz", "160 MHz", "320 MHz"],
        ["Yoğun ortam verimi", "Düşük", "Yüksek (OFDMA)", "Çok yüksek (MLO)"],
        ["Switch gereksinimi", "1 GbE", "1–2.5 GbE", "2.5–10 GbE önerilir"],
        ["Önerilen kullanım", "Yenilenmesi gereken altyapı", "Otel, ofis, depo", "Kongre, yoğun alanlar, uzun vadeli yatırım"],
      ],
    },
    priceFactors: {
      caption: "Network projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["AP sayısı ve modeli", "Yüksek", "İç/dış mekan, Wi-Fi nesli, oda içi veya tavan tipi"],
        ["Switch ve PoE bütçesi", "Yüksek", "Port sayısı, multi-gigabit ihtiyacı, yedeklilik"],
        ["Firewall ve lisanslar", "Orta", "Kullanıcı sayısı, UTM özellikleri, yıllık lisans"],
        ["Kablolama durumu", "Değişken", "Yeni hat ihtiyacı varsa zayıf akım kalemi eklenir"],
        ["Yönetim modeli", "Düşük", "Bulut yönetim lisansı veya yerel kontrolör"],
      ],
    },
    faqs: [
      { q: "Site survey nedir, neden gerekli?", a: "Site survey, binada ölçüm cihazlarıyla sinyal ve parazit analizi yapılarak AP yerlerinin belirlenmesidir. Tahmine dayalı yerleşim, ya fazla cihaz maliyetine ya da kör noktalara yol açar." },
      { q: "Mevcut AP'lerimizle yeni sistem birlikte çalışır mı?", a: "Aynı üreticinin aynı yönetim platformundaki cihazlar genellikle birlikte çalışır. Farklı markalarda geçiş dönemi için ayrı SSID ile paralel çalışma planlanır." },
      { q: "Hangi markalarla çalışıyorsunuz?", a: "Cisco, Aruba, Ruijie, TP-Link Omada, MikroTik ve FortiGate gibi markalarla çalışıyoruz; marka seçimini bütçe, ölçek ve yönetim tercihinize göre öneriyoruz." },
      { q: "Misafir Wi-Fi'si 5651'e uygun olur mu?", a: "Evet. Misafir ağını hotspot/captive portal ve 5651 loglama çözümüyle birlikte kuruyoruz; detaylar 5651 Loglama sayfamızda." },
      { q: "Ağ yenilemesi ne kadar sürer?", a: "Kablolama hazırsa orta ölçekli bir otelde cihaz değişimi blok blok birkaç günde tamamlanabilir. Kesin süre keşif sonrası iş programında belirtilir." },
      { q: "Uzaktan destek veriyor musunuz?", a: "Evet. Merkezi yönetim sayesinde arızaların önemli kısmını uzaktan çözüyoruz; gerekirse ekip sahaya yönlendirilir." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb", "restoran-ve-kafe"],
    relatedTools: ["ag-yenileme-hesaplayici"],
    relatedRegions: ["belek", "alanya", "manavgat"],
    updatedAt: UPDATED,
  },
  {
    slug: "guvenlik-kameralari",
    name: "Güvenlik Kameraları (CCTV)",
    h1: "Antalya Güvenlik Kamerası ve IP Kamera Sistemleri",
    metaTitle: "Güvenlik Kamerası ve IP Kamera Kurulumu | Antalya",
    metaDescription:
      "DORI hesabıyla planlanan IP kamera, termal kamera ve video analitik sistemleri. Kör nokta analizi, NVR kapasite ve depolama hesabı. Ücretsiz keşif.",
    icon: "camera",
    excerpt: "DORI hesabıyla planlanan IP kamera, termal kamera, video analitik ve merkezi izleme.",
    definition:
      "Profesyonel güvenlik kamerası sistemi; IP kameralar, kayıt cihazı (NVR), depolama ve izleme yazılımından oluşan, olayları yalnızca kaydetmekle kalmayıp tanımlanabilir görüntü üreten bir altyapıdır. Antalya'da her kamerayı IEC 62676-4 DORI değerlerine göre konumlandırıyor, kör noktaları kat planı üzerinde sıfırlıyor ve depolama süresini hesaplayarak kuruyoruz.",
    serviceType: "Güvenlik kamerası (CCTV) projelendirme ve kurulum",
    audience: ["Oteller ve siteler", "Fabrika ve depolar", "AVM ve mağazalar", "Restoran ve kafeler"],
    problems: [
      { title: "Olay var, yüz yok", text: "Geniş açılı lensle uzaktan çekilen görüntüde kişi görünür ama tanınamaz; kayıt delil değeri taşımaz." },
      { title: "Kayıtlar 7 günde siliniyor", text: "Yanlış hesaplanan disk kapasitesi, olay fark edildiğinde kaydın çoktan üzerine yazılmasına neden olur." },
      { title: "Kameralar var ama kör noktalar da", text: "Kat planı üzerinde görüş konisi analizi yapılmadan yerleştirilen kameralar kritik geçişleri kaçırır." },
    ],
    sections: [
      {
        h2: "DORI nedir ve kamera seçimini nasıl etkiler?",
        answer:
          "DORI; bir kameranın belirli bir mesafede kişiyi algılama, gözlemleme, tanıma veya kimliklendirme yeteneğini metre başına piksel yoğunluğuyla tanımlayan IEC 62676-4 standardıdır.",
        table: {
          caption: "IEC 62676-4 DORI piksel yoğunlukları",
          head: ["Seviye", "Piksel / metre", "Ne sağlar?"],
          rows: [
            ["Algılama (Detection)", "25 px/m", "Bir kişinin varlığını fark etme"],
            ["Gözlem (Observation)", "62,5 px/m", "Kıyafet, hareket gibi genel detaylar"],
            ["Tanıma (Recognition)", "125 px/m", "Bilinen bir kişiyi tanıma"],
            ["Kimlik (Identification)", "250 px/m", "Yabancı bir kişiyi şüphesiz kimliklendirme"],
          ],
        },
      },
      {
        h2: "Kayıtlar kaç gün saklanabilir?",
        answer:
          "Saklama süresi kamera sayısı, çözünürlük, bit hızı ve disk kapasitesine bağlıdır; doğru hesapla 30, 60 veya 90 günlük kayıt planlanabilir.",
        body:
          "Formül basittir: toplam bit hızı (Mbps) × 0,0108 × saat × gün = gereken TB. H.265 sıkıştırma ve hareket bazlı kayıt depolama ihtiyacını belirgin şekilde azaltır. CCTV Planlayıcı aracımızla kendi senaryonuzu hesaplayabilirsiniz.",
      },
      {
        h2: "Video analitik ne işe yarar?",
        answer:
          "Video analitik; alan ihlali, çizgi geçme, kalabalık yoğunluğu ve terk edilmiş nesne gibi olayları otomatik algılayarak operatörün tüm ekranları izlemesine gerek bırakmaz.",
      },
    ],
    comparison: {
      caption: "Analog (HD) ve IP kamera sistemlerinin karşılaştırması",
      head: ["Özellik", "Analog HD (AHD/TVI)", "IP Kamera"],
      rows: [
        ["Çözünürlük", "Genellikle 2–8 MP", "2–12 MP ve üzeri"],
        ["Kablolama", "Koaksiyel + ayrı enerji", "Tek CAT6 kablo (PoE)"],
        ["Video analitik", "Sınırlı", "Kamerada ve NVR'da gelişmiş"],
        ["Ölçeklenebilirlik", "Kayıt cihazı kanal sayısıyla sınırlı", "Ağ üzerinden esnek"],
        ["Uzaktan erişim güvenliği", "Temel", "Şifreleme, kullanıcı yetkileri, VLAN izolasyonu"],
        ["Önerilen kullanım", "Küçük bütçeli mevcut sistem genişletmesi", "Tüm yeni projeler"],
      ],
    },
    priceFactors: {
      caption: "Kamera projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Kamera sayısı ve tipi", "Yüksek", "Dome, bullet, PTZ, termal, fisheye"],
        ["İstenen DORI seviyesi", "Yüksek", "Kimlik seviyesi daha fazla kamera veya daha dar lens ister"],
        ["Depolama süresi", "Orta", "30/60/90 gün ve RAID yedekliliği"],
        ["Kablolama ve direk/montaj", "Orta", "Dış mekan direkleri, yükseklik, fiber ihtiyacı"],
        ["Video analitik ve lisanslar", "Değişken", "Yüz, plaka, kalabalık analitiği, VMS lisansları"],
      ],
    },
    faqs: [
      { q: "Kaç kameraya ihtiyacım var?", a: "Kamera sayısı alan büyüklüğü, giriş sayısı ve istenen DORI seviyesine bağlıdır. CCTV Planlayıcı aracımız ilk tahmini verir; kesin sayı keşifte kat planı üzerinde belirlenir." },
      { q: "Gece görüşü yeterli olur mu?", a: "IR menzili ve düşük ışık sensörü doğru seçildiğinde gece de tanıma seviyesinde görüntü alınır. Çok karanlık veya geniş alanlarda termal kamera öneriyoruz." },
      { q: "Telefondan izleyebilir miyim?", a: "Evet. Güvenli uzaktan erişim; kullanıcı bazlı yetkilerle mobil uygulama ve web üzerinden sağlanır." },
      { q: "Kamera kayıtları KVKK'ya tabi mi?", a: "Evet, görüntü kişisel veridir. Aydınlatma levhaları, saklama süresi ve erişim yetkileri için KVKK'ya uygun kurulum ve dokümantasyon öneriyoruz." },
      { q: "Mevcut analog kameralarımı kullanabilir miyim?", a: "Hibrit kayıt cihazlarıyla mevcut analog kameralar geçiş döneminde korunabilir; yeni noktalar IP olarak eklenir." },
      { q: "Hangi markaları kuruyorsunuz?", a: "Hikvision, Dahua ve Hanwha başta olmak üzere projeye uygun markaları öneriyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb", "avm-ve-site-yonetimi", "restoran-ve-kafe"],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["kepez", "konyaalti", "alanya"],
    updatedAt: UPDATED,
  },
  {
    slug: "plaka-tanima-sistemi",
    name: "Plaka Tanıma Sistemi (PTS)",
    h1: "Antalya Plaka Tanıma Sistemi (PTS) ve Bariyer Kurulumu",
    metaTitle: "Plaka Tanıma Sistemi (PTS) ve Bariyer | Antalya",
    metaDescription:
      "Siteler, AVM'ler, oteller ve fabrikalar için plaka tanıma kamerası, bariyer ve bollard entegrasyonu. Misafir araç yönetimi ve raporlama.",
    icon: "car",
    excerpt: "Plaka okuyan kamera, bariyer/bollard ve yazılım entegrasyonuyla temassız araç geçişi.",
    definition:
      "Plaka tanıma sistemi (PTS veya ANPR), araç plakasını kamera ile okuyup yetkili listeyle karşılaştırarak bariyeri otomatik açan, tüm giriş-çıkışları raporlayan bir geçiş kontrol çözümüdür. Antalya'daki siteler, AVM'ler, oteller ve fabrikalar için kamera, bariyer, bollard ve yönetim yazılımını tek projede kuruyoruz.",
    serviceType: "Plaka tanıma ve araç geçiş kontrol sistemi",
    audience: ["Konut siteleri ve rezidanslar", "AVM ve otoparklar", "Oteller", "Fabrika ve lojistik depoları"],
    problems: [
      { title: "Kapıda kuyruk ve uzaktan kumanda karmaşası", text: "Kaybolan kumandalar, kopyalanan kartlar ve güvenlik görevlisine bağımlı geçişler hem zaman hem güvenlik kaybıdır." },
      { title: "Misafir aracın kaydı yok", text: "Kim ne zaman girdi, ne kadar kaldı sorularına kağıt deftere bakarak cevap aranır." },
      { title: "Plaka okunuyor ama bariyer açılmıyor", text: "Yanlış açı ve ışık koşullarında kurulan kamera özellikle gece ve yağmurda okuma oranını düşürür." },
    ],
    sections: [
      {
        h2: "Plaka tanıma sistemi nasıl çalışır?",
        answer:
          "Araç algılandığında kamera yüksek enstantaneyle görüntü alır, yazılım plaka karakterlerini okur, yetkili listeyle karşılaştırır ve yetkiliyse bariyere açma komutu gönderir; tüm işlem tipik olarak bir saniyenin altında tamamlanır.",
        bullets: [
          "Araç algılama: döngü dedektörü (loop) veya kamera içi hareket algılama",
          "Görüntü yakalama: IR aydınlatmalı, yüksek enstantaneli plaka kamerası",
          "Karakter okuma (OCR) ve beyaz/kara liste kontrolü",
          "Bariyer, bollard veya kapı motoruna kuru kontak ya da ağ üzerinden komut",
          "Giriş-çıkış kaydı, fotoğraf arşivi ve raporlama",
        ],
      },
      {
        h2: "Plaka okuma oranını ne etkiler?",
        answer:
          "Okuma oranını en çok kamera açısı, plakadaki piksel genişliği, araç hızı ve IR aydınlatma belirler; doğru montajda yüksek okuma oranı elde edilir.",
        body:
          "Kamera ile plaka arasındaki yatay ve dikey açının dar tutulması, aracın kontrollü hızda yaklaşması ve plakanın yeterli piksel genişliğinde görüntülenmesi gerekir. Keşifte giriş noktasının geometrisini ölçerek kamera konumunu belirliyoruz.",
      },
      {
        h2: "Plaka kayıtları KVKK kapsamında mı?",
        answer:
          "Evet, plaka bilgisi kişisel veri kabul edilir; aydınlatma metni, saklama süresi ve erişim yetkilerinin tanımlanması gerekir.",
      },
    ],
    process: {
      title: "Plaka tanıma projesi nasıl ilerler?",
      steps: [
        { title: "Giriş geometrisi keşfi", text: "Şerit genişliği, yaklaşma mesafesi, eğim ve ışık koşulları ölçülür." },
        { title: "Kamera ve bariyer seçimi", text: "Okuma açısına uygun kamera, trafik yoğunluğuna uygun bariyer/bollard belirlenir." },
        { title: "Altyapı ve montaj", text: "Kanal, enerji, loop dedektörü ve direk montajı yapılır." },
        { title: "Yazılım ve liste tanımı", text: "Yetkili plakalar, misafir kuralları ve kullanıcı yetkileri tanımlanır." },
        { title: "Gece/gündüz okuma testi", text: "Farklı araç tipleri ve ışık koşullarında okuma doğrulanır, raporlanır." },
        { title: "Eğitim ve destek", text: "Yönetime eğitim verilir, sistem uzaktan izlemeye alınır." },
      ],
    },
    comparison: {
      caption: "Araç geçiş kontrol yöntemlerinin karşılaştırması",
      head: ["Özellik", "Uzaktan kumanda", "RFID kart / etiket", "Plaka tanıma (PTS)"],
      rows: [
        ["Kullanıcı deneyimi", "Kumanda gerekir", "Etiket/kart gerekir", "Tamamen temassız"],
        ["Kopyalanma riski", "Yüksek", "Orta", "Düşük (plaka + kayıt)"],
        ["Misafir yönetimi", "Yok", "Geçici kart dağıtımı", "Süreli plaka tanımı"],
        ["Raporlama", "Yok", "Kart bazlı", "Fotoğraflı, plaka bazlı"],
        ["Kurulum maliyeti", "Düşük", "Orta", "Orta–yüksek"],
      ],
    },
    priceFactors: {
      caption: "PTS projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Şerit (giriş/çıkış) sayısı", "Yüksek", "Her şerit için kamera ve kontrol donanımı"],
        ["Bariyer veya bollard tipi", "Yüksek", "Kol uzunluğu, hız, darbe dayanımı"],
        ["Yazılım ve entegrasyon", "Orta", "Site yönetim, otopark ücretlendirme, PMS entegrasyonu"],
        ["Altyapı işleri", "Orta", "Kazı, kanal, loop dedektörü, enerji hattı"],
        ["Ek kameralar", "Düşük", "Genel görüş/sürücü kamerası"],
      ],
    },
    faqs: [
      { q: "Gece ve yağmurda plaka okunur mu?", a: "IR aydınlatmalı plaka kameraları gece de çalışır. Yağmur ve far parlaması etkilerini azaltmak için kamera açısı ve enstantane ayarı keşifte belirlenir." },
      { q: "Misafir araçları nasıl tanımlanıyor?", a: "Yönetici veya daire sakini, misafir plakasını süreli olarak yazılıma veya mobil uygulamaya ekler; süre bitince yetki otomatik sona erer." },
      { q: "Mevcut bariyerimizle çalışır mı?", a: "Çoğu bariyer kuru kontak girişiyle kontrol edilebilir. Keşifte mevcut motoru inceleyerek entegrasyon uygunluğunu belirtiyoruz." },
      { q: "Elektrik kesintisinde ne olur?", a: "UPS ile sistem çalışmaya devam eder; bariyerlerde manuel açma ve acil durum senaryoları tanımlanır." },
      { q: "Site yönetim yazılımımıza bağlanabilir mi?", a: "API veya veri tabanı entegrasyonuyla mümkündür. Yazılım ve entegrasyon hizmetimiz kapsamında değerlendiriyoruz." },
      { q: "Kurulum ne kadar sürer?", a: "Altyapı hazırsa tek giriş-çıkışlı bir sitede kurulum birkaç gün sürer. Kazı ve kanal işleri gerekiyorsa süre keşifte netleşir." },
    ],
    relatedSectors: ["avm-ve-site-yonetimi", "otel-ve-resort", "fabrika-ve-osb"],
    relatedTools: ["cctv-planlayici"],
    relatedRegions: ["konyaalti", "alanya", "kepez"],
    updatedAt: UPDATED,
  },
  {
    slug: "5651-loglama-hotspot",
    name: "5651 Loglama & Hotspot",
    h1: "Antalya 5651 Loglama, Hotspot ve Misafir Wi-Fi Çözümleri",
    metaTitle: "5651 Loglama ve Hotspot Çözümleri | Antalya",
    metaDescription:
      "Oteller, kafeler ve işletmeler için 5651 uyumlu loglama, zaman damgası ve captive portal. Kayıtları kişiyle eşleşen misafir Wi-Fi. Risk testini çözün.",
    icon: "log",
    excerpt: "Zaman damgalı 5651 loglama, captive portal ve kişiyle eşleşen misafir Wi-Fi kayıtları.",
    definition:
      "5651 loglama; internet hizmeti sunan otel, kafe, işletme ve kurumların, misafir ve çalışanlara verdikleri bağlantıların iç IP dağıtım kayıtlarını zaman damgasıyla değiştirilemez biçimde saklamasıdır. Antalya'da hotspot (captive portal) ile bağlantıları kişiyle eşleştiriyor, kayıtları otomatik imzalayıp mevzuata uygun süre boyunca saklıyoruz.",
    serviceType: "5651 uyumlu loglama ve hotspot hizmeti",
    audience: ["Oteller ve pansiyonlar", "Kafe ve restoranlar", "Fabrikalar ve ofisler", "Okullar, yurtlar ve hastaneler"],
    problems: [
      { title: "Log var ama kime ait olduğu belli değil", text: "Sadece IP-MAC kaydı tutulan ağda, adli bir talepte bağlantının hangi kişiye ait olduğu gösterilemez." },
      { title: "Excel'e elle girilen kayıtlar", text: "Elle tutulan veya zaman damgası olmayan kayıtlar değiştirilebilir olduğu için ispat değeri taşımaz." },
      { title: "Cihaz değişince loglar kayboldu", text: "Firewall veya modem değişiminde silinen kayıtlar, saklama yükümlülüğünün ihlali anlamına gelir." },
    ],
    sections: [
      {
        h2: "5651 loglama kimler için zorunludur?",
        answer:
          "5651 sayılı Kanun ve İnternet Toplu Kullanım Sağlayıcıları Hakkında Yönetmelik kapsamında; misafirlerine veya çalışanlarına internet erişimi sağlayan otel, kafe, restoran, işletme, okul ve kurumlar toplu kullanım sağlayıcı sayılır ve loglama yükümlülüğü taşır.",
      },
      {
        h2: "5651 loglama kayıtları ne kadar süre saklanmalı?",
        answer:
          "İç IP dağıtım logları zaman damgasıyla imzalanarak mevzuatta öngörülen süre boyunca saklanmalıdır; uygulamada en az 2 yıllık saklama güvenli kabul edilir.",
        body:
          "Saklama süresi ve teknik şartlar mevzuat değişikliklerine bağlı olarak güncellenebilir. Kurulumda güncel düzenlemeyi esas alıyor, hukuk danışmanınızla birlikte doğrulamanızı öneriyoruz.",
      },
      {
        h2: "Zaman damgası neden gerekli?",
        answer:
          "Zaman damgası, log dosyasının belirli bir anda var olduğunu ve sonradan değiştirilmediğini, yetkili bir elektronik sertifika hizmet sağlayıcısının (örn. Kamu SM) imzasıyla kanıtlar.",
        body:
          "Zaman damgasının doğru çalışması için cihaz saatlerinin NTP ile senkronize olması gerekir. Saat farkı olan bir sistemde kayıtlar ile olay zamanı eşleştirilemez.",
      },
      {
        h2: "Hotspot (captive portal) ile kullanıcı nasıl doğrulanır?",
        answer:
          "Misafir Wi-Fi'ye bağlandığında açılan karşılama sayfasında SMS kodu, oda numarası + soyad (otel PMS entegrasyonu) veya kimlik bilgisi ile doğrulanır; böylece her bağlantı bir kişiyle eşleşir.",
      },
    ],
    process: {
      title: "5651 uyumluluğuna giden yol",
      steps: [
        { title: "Mevcut durum analizi", text: "Firewall, DHCP, hotspot ve log saklama yapınız 5651 gereksinimlerine göre denetlenir." },
        { title: "Doğrulama yöntemi seçimi", text: "SMS, PMS entegrasyonu veya kimlik doğrulaması işletme tipinize göre belirlenir." },
        { title: "Hotspot ve loglama kurulumu", text: "Captive portal, log toplama ve zaman damgası servisi devreye alınır." },
        { title: "NTP ve saklama yapılandırması", text: "Tüm cihaz saatleri senkronize edilir, yedekli saklama alanı ayarlanır." },
        { title: "Test ve dışa aktarım denemesi", text: "Örnek bir tarih/IP için kayıt sorgulanıp zaman damgası doğrulanır." },
        { title: "Periyodik kontrol", text: "Log akışı ve imzalama süreci düzenli olarak izlenir, aksama alarm üretir." },
      ],
    },
    comparison: {
      caption: "Loglama yöntemlerinin karşılaştırması",
      head: ["Özellik", "Modem/firewall varsayılan logu", "Elle tutulan kayıt", "Hotspot + 5651 loglama"],
      rows: [
        ["Kişi ile eşleşme", "Yok", "Kısmi, hataya açık", "Var (SMS/PMS/kimlik)"],
        ["Zaman damgası", "Genellikle yok", "Yok", "Otomatik"],
        ["Değiştirilemezlik", "Zayıf", "Yok", "Hash + zaman damgası"],
        ["Cihaz değişiminde koruma", "Kayıtlar kaybolabilir", "—", "Ayrı, yedekli depolama"],
        ["Pazarlama verisi", "Yok", "Yok", "Onaylı misafir iletişim izni"],
      ],
    },
    priceFactors: {
      caption: "5651 çözümünün fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Eşzamanlı kullanıcı sayısı", "Yüksek", "Donanım ve lisans kapasitesini belirler"],
        ["Doğrulama yöntemi", "Orta", "SMS paketi, PMS entegrasyonu, sosyal giriş"],
        ["Donanım veya bulut", "Orta", "Yerinde cihaz ya da bulut tabanlı loglama"],
        ["Lokasyon sayısı", "Orta", "Zincir işletmelerde merkezi yönetim"],
        ["Saklama ve yedekleme", "Düşük", "Disk kapasitesi ve harici yedek"],
      ],
    },
    faqs: [
      { q: "Küçük bir kafe için de 5651 loglama gerekli mi?", a: "Evet. Ölçeğinden bağımsız olarak müşterilerine internet erişimi sunan işletmeler toplu kullanım sağlayıcı yükümlülüğü taşır." },
      { q: "Mevcut firewall'umuz 5651 loglama yapıyor mu?", a: "Birçok firewall log tutar ancak zaman damgası, kişi eşleşmesi ve uzun süreli saklama şartlarını tek başına karşılamayabilir. 5651 Risk Testimiz mevcut durumunuzu hızlıca puanlar." },
      { q: "Otel PMS sistemiyle entegrasyon yapılabiliyor mu?", a: "Evet. Misafir oda numarası ve soyadıyla giriş yapar; check-out ile erişim otomatik sona erer. Entegrasyon PMS markasına göre planlanır." },
      { q: "Misafir verileri KVKK'ya uygun saklanıyor mu?", a: "Captive portal üzerinde aydınlatma metni ve açık rıza onayları sunulur, veriler yetkili erişimle korunur." },
      { q: "Denetimde kayıtları nasıl sunarız?", a: "Belirli bir tarih ve IP için ilgili kayıtlar zaman damgası doğrulamasıyla birlikte dışa aktarılabilir." },
      { q: "Kurulum interneti keser mi?", a: "Kurulum genellikle kısa bir bakım penceresinde yapılır; otellerde düşük doluluk saatleri tercih edilir." },
    ],
    relatedSectors: ["otel-ve-resort", "restoran-ve-kafe", "fabrika-ve-osb"],
    relatedTools: ["5651-risk-testi"],
    relatedRegions: ["alanya", "manavgat", "kemer"],
    relatedProducts: ["ejder-3"],
    updatedAt: UPDATED,
  },
  {
    slug: "siber-guvenlik",
    name: "Siber Güvenlik",
    h1: "Antalya Siber Güvenlik: Uç Nokta Güvenliği, EDR ve Firewall Yönetimi",
    metaTitle: "Siber Güvenlik, EDR ve Firewall Yönetimi | Antalya",
    metaDescription:
      "İşletmeler için uç nokta güvenliği (EDR), firewall yönetimi, yedekleme ve fidye yazılımı koruması. Yerinde kurulum ve Türkçe destek.",
    icon: "shield",
    excerpt: "EDR, yönetilen firewall, yedekleme ve fidye yazılımına karşı katmanlı koruma.",
    definition:
      "Kurumsal siber güvenlik; bilgisayar ve sunucuları koruyan uç nokta güvenliği (EDR), ağ trafiğini denetleyen yeni nesil firewall, düzenli yedekleme ve kullanıcı farkındalığından oluşan katmanlı bir savunmadır. Antalya'daki işletmeler için bu katmanları kuruyor, yapılandırıyor ve sürekli izliyoruz.",
    serviceType: "Siber güvenlik ve yönetilen güvenlik hizmetleri",
    audience: ["Oteller (PMS, POS, muhasebe)", "Fabrikalar (ERP, üretim ağları)", "Muhasebe, hukuk ve sağlık ofisleri", "Çok şubeli işletmeler"],
    problems: [
      { title: "Fidye yazılımı tüm dosyaları kilitledi", text: "Güncel olmayan antivirüs ve ağdan ayrılmamış yedekler, tek bir e-posta ekiyle tüm işletmeyi durdurabilir." },
      { title: "Firewall var ama kimse bakmıyor", text: "Kurulumdan beri güncellenmeyen kurallar ve takip edilmeyen alarmlar firewall'u işlevsiz bırakır." },
      { title: "Hangi bilgisayarda ne kurulu bilinmiyor", text: "Envanteri olmayan ağda yamasız bir cihaz saldırganın giriş kapısı olur." },
    ],
    sections: [
      {
        h2: "Antivirüs ile EDR arasındaki fark nedir?",
        answer:
          "Klasik antivirüs bilinen zararlıları imza ile engellerken, EDR uç noktadaki davranışları sürekli izleyerek bilinmeyen tehditleri de tespit eder, olayı kayıt altına alır ve cihazı uzaktan izole edebilir.",
      },
      {
        h2: "Fidye yazılımına karşı en etkili önlem nedir?",
        answer:
          "Tek bir önlem yeterli değildir; en etkili koruma EDR, güncel yamalar, çok faktörlü kimlik doğrulama ve ağdan ayrılmış (offline veya değiştirilemez) yedeklerin birlikte uygulanmasıdır.",
        bullets: [
          "3-2-1 yedekleme: 3 kopya, 2 farklı ortam, 1 kopya ağ dışında",
          "Uzak erişim ve e-postada çok faktörlü kimlik doğrulama (MFA)",
          "Ağ segmentasyonu: misafir, personel, POS ve kamera ağlarının ayrılması",
          "Düzenli yama yönetimi ve envanter takibi",
        ],
      },
    ],
    comparison: {
      caption: "Uç nokta koruma yaklaşımlarının karşılaştırması",
      head: ["Özellik", "Klasik antivirüs", "EDR", "Yönetilen EDR (MDR)"],
      rows: [
        ["Bilinen zararlılar", "Engeller", "Engeller", "Engeller"],
        ["Bilinmeyen / sıfırıncı gün tehditler", "Sınırlı", "Davranış analiziyle tespit", "Tespit + uzman müdahalesi"],
        ["Olay kaydı ve analiz", "Yok", "Var", "Var, raporlanır"],
        ["Uzaktan izolasyon", "Yok", "Var", "Var, ekip tarafından uygulanır"],
        ["İç kaynak ihtiyacı", "Düşük", "Orta (izleyen biri gerekir)", "Düşük"],
      ],
    },
    priceFactors: {
      caption: "Siber güvenlik hizmetinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Uç nokta (cihaz) sayısı", "Yüksek", "Bilgisayar, sunucu ve sanal makine adedi"],
        ["Firewall modeli ve lisans", "Yüksek", "Throughput, UTM ve abonelik süresi"],
        ["Yönetim modeli", "Orta", "Kurulum + devir veya sürekli yönetilen hizmet"],
        ["Yedekleme kapsamı", "Orta", "Veri miktarı, bulut/yerel, saklama süresi"],
        ["Uyumluluk ihtiyacı", "Değişken", "KVKK, ISO 27001 hazırlığı, raporlama"],
      ],
    },
    faqs: [
      { q: "Küçük bir işletme de hedef olur mu?", a: "Evet. Otomatik saldırılar ölçek ayırt etmez; korunmasız her cihaz hedeftir." },
      { q: "Mevcut firewall'umuzu yönetebilir misiniz?", a: "FortiGate, Sophos, MikroTik gibi yaygın markaların yapılandırma denetimini ve sürekli yönetimini üstleniyoruz." },
      { q: "Sızma testi yapıyor musunuz?", a: "[DOLDURULACAK: sızma testi hizmeti sunuluyor mu, kapsam ve sertifikalar]" },
      { q: "Bir saldırı yaşarsak ne yapmalıyız?", a: "Etkilenen cihazları ağdan ayırın, kapatmayın ve hemen 7/24 acil hattımızı arayın. Delilleri koruyarak müdahale ve kurtarma planını birlikte yürütürüz." },
      { q: "Lisansları sizden mi almalıyız?", a: "Lisansı bizden alabilir veya mevcut lisanslarınızı yönetimimize devredebilirsiniz." },
      { q: "Çalışanlara eğitim veriyor musunuz?", a: "Oltalama (phishing) farkındalığı ve temel güvenlik alışkanlıkları için kısa eğitimler planlayabiliyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "fabrika-ve-osb"],
    relatedTools: ["5651-risk-testi"],
    relatedRegions: ["muratpasa", "kepez"],
    relatedProducts: ["comodo-xcitium"],
    updatedAt: UPDATED,
  },
  {
    slug: "yazilim",
    name: "Yazılım Geliştirme",
    h1: "Antalya Yazılım Geliştirme: Özel Yazılım, Mobil Uygulama, Yapay Zekâ ve Entegrasyon",
    metaTitle: "Antalya Yazılım Geliştirme ve Entegrasyon",
    metaDescription:
      "İşletmenize özel yazılım, mobil uygulama, e-ticaret, IoT ve yapay zekâ çözümleri. PMS, PTS, kamera ve ERP entegrasyonları. Antalya'dan Comodo Teknoloji.",
    icon: "code",
    excerpt: "Özel yazılım, mobil uygulama, yapay zekâ ve IoT çözümleri; PMS, PTS ve ERP entegrasyonları.",
    definition:
      "Özel yazılım geliştirme; işletmenin iş süreçlerine birebir uyan web uygulamaları, mobil uygulamalar, raporlama panelleri ve sistem entegrasyonlarının tasarlanıp geliştirilmesidir. Antalya'da otel yorumlarını yapay zekâyla analiz eden platformdan uzaktan sayaç okuma sistemine kadar işletmelere özel yazılımlar geliştiriyor, mevcut PMS, PTS, kamera ve ERP sistemlerini birbirine bağlıyoruz.",
    serviceType: "Özel yazılım geliştirme, mobil uygulama ve sistem entegrasyonu",
    audience: ["Oteller ve otel zincirleri", "Site ve AVM yönetimleri", "Fabrikalar", "Çok şubeli işletmeler"],
    problems: [
      { title: "Aynı veri üç sisteme elle giriliyor", text: "Misafir, araç veya personel bilgisinin her sisteme ayrı girilmesi hata ve zaman kaybı yaratır." },
      { title: "Raporlar Excel'de birleştiriliyor", text: "Yönetim raporları için farklı sistemlerden veri toplamak her ay günler alır." },
      { title: "Hazır yazılım ihtiyaca uymuyor", text: "İş süreci yazılıma uydurulmaya çalışılır, çalışanlar yan çözümler üretir." },
    ],
    sections: [
      {
        h2: "Hangi sistemler birbirine entegre edilebilir?",
        answer:
          "API, veri tabanı veya dosya aktarımı sunan hemen her sistem entegre edilebilir; en sık yaptığımız entegrasyonlar PMS–hotspot, PTS–site yönetimi ve kamera–alarm senaryolarıdır.",
        bullets: [
          "Otel PMS ↔ misafir Wi-Fi (oda no + soyad ile giriş)",
          "Plaka tanıma ↔ site/aidat yönetim yazılımı",
          "Kamera video analitiği ↔ alarm ve bildirim sistemleri",
          "Network izleme ↔ e-posta/WhatsApp alarm bildirimleri",
          "ERP/muhasebe ↔ özel raporlama panelleri",
        ],
      },
      {
        h2: "Comodo Teknoloji hangi yazılımları geliştirdi?",
        answer:
          "Turizm, enerji ve perakende alanlarında yapay zekâ destekli analiz platformları, IoT tabanlı ölçüm sistemleri, iş zekâsı raporlamalı anket sistemleri ve e-ticaret platformları geliştirdik.",
        bullets: [
          "Hotalyze: otel yorumlarını yapay zekâyla duygu ve departman bazında analiz eden platform (hotalyze.com)",
          "Uzaktan elektrik sayacı okuma: IoT tabanlı tüketim izleme sistemi",
          "Enerji ve karbon ayak izi hesaplama: otel ve işletmeler için misafir başına tüketim raporlaması",
          "Müşteri anket sistemi: iş zekâsı (BI) raporlamalı memnuniyet analizi",
          "E-ticaret platformları: Comodo Bee (arıcılık ürünleri) ve Comodo Print (dijital baskı, tasarım editörü ve baskı hesaplama)",
        ],
      },
      {
        h2: "Hazır yazılım mı, özel geliştirme mi?",
        answer:
          "İhtiyacınızı karşılayan bir hazır yazılım varsa önce onu öneriyoruz; özel geliştirme yalnızca süreç farklılığı gerçek bir rekabet avantajı veya ciddi zaman tasarrufu sağlıyorsa mantıklıdır.",
      },
    ],
    comparison: {
      caption: "Hazır paket ve özel yazılımın karşılaştırması",
      head: ["Özellik", "Hazır paket", "Özel yazılım / entegrasyon"],
      rows: [
        ["Başlangıç süresi", "Hızlı", "Geliştirme süresi gerekir"],
        ["Süreç uyumu", "Sınırlı", "Tam uyum"],
        ["Lisans modeli", "Kullanıcı/yıllık", "Proje bazlı + bakım"],
        ["Mevcut sistemlerle bağlantı", "Üreticinin desteklediği kadar", "İhtiyaca göre"],
        ["Veri sahipliği", "Üreticiye bağlı", "Sizde"],
      ],
    },
    priceFactors: {
      caption: "Yazılım projesinin fiyatını belirleyen unsurlar",
      head: ["Faktör", "Etkisi", "Açıklama"],
      rows: [
        ["Entegre edilecek sistem sayısı", "Yüksek", "Her sistemin API/erişim durumu"],
        ["Ekran ve rapor sayısı", "Yüksek", "Kullanıcı arayüzü kapsamı"],
        ["Kullanıcı ve yetki yapısı", "Orta", "Rol bazlı erişim, çok şube"],
        ["Barındırma", "Düşük", "Yerinde sunucu veya bulut"],
        ["Bakım ve destek", "Düşük", "Aylık destek ve geliştirme saatleri"],
      ],
    },
    faqs: [
      { q: "Kaynak kod bize teslim ediliyor mu?", a: "[DOLDURULACAK: kaynak kod ve fikri mülkiyet politikası]" },
      { q: "Hangi teknolojilerle geliştiriyorsunuz?", a: "[DOLDURULACAK: kullanılan teknoloji yığını]" },
      { q: "PMS markamız entegrasyonu destekliyor mu?", a: "Keşifte PMS markanızın API veya arayüz desteğini kontrol ediyor, entegrasyon yöntemini netleştiriyoruz." },
      { q: "Geliştirme süreci nasıl ilerliyor?", a: "İhtiyaç analizi, ekran taslakları, onay, iki haftalık geliştirme döngüleri, test ve canlıya geçiş adımlarıyla ilerliyoruz." },
      { q: "Yazılım bulutta mı çalışır?", a: "İhtiyaca göre işletmenizdeki sunucuda veya bulutta barındırılabilir." },
      { q: "Canlıya geçtikten sonra destek veriyor musunuz?", a: "Evet, aylık bakım ve destek paketleriyle hata giderme ve küçük geliştirmeleri sürdürüyoruz." },
    ],
    relatedSectors: ["otel-ve-resort", "avm-ve-site-yonetimi"],
    relatedTools: [],
    relatedRegions: ["muratpasa"],
    updatedAt: UPDATED,
  },
];

/** Öncelik sırası: menü, kart ızgarası ve llms.txt bu sırayı kullanır */
const order = [
  "web-tasarim",
  "guvenlik-kameralari",
  "yazilim",
  "dijital-reklam",
  "bilisim-danismanligi",
  "kurumsal-network",
  "zayif-akim",
  "siber-guvenlik",
  "5651-loglama-hotspot",
  "plaka-tanima-sistemi",
];

export const solutions: Solution[] = [...infraSolutions, ...digitalSolutions].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
