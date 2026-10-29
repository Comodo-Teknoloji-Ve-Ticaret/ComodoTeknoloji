/**
 * ETKİLEŞİMLİ ARAÇ VARSAYIMLARI
 * Hesaplayıcıların kullandığı tüm katsayılar burada; sayfada şeffaf biçimde gösterilir.
 * Fiyat aralıkları null ise bütçe "keşif sonrası" olarak gösterilir — gerçek fiyat
 * listenizle doldurun (KDV hariç, TRY).
 */
export const roiConfig = {
  /** Oda başına AP yoğunluğu: duvar yapısına göre kaç odaya bir AP */
  roomsPerAp: { betonarme: 2.5, karma: 3.5, hafif: 4.5 },
  /** Lobi, restoran, havuz vb. ortak alanlar için ek AP: her N odada 1, en az 2 */
  commonAreaRoomsPerAp: 40,
  minCommonAps: 2,
  /** Bir Wi-Fi şikayetinin ortalama ele alınma süresi (dakika) — kullanıcı değiştirebilir */
  minutesPerComplaint: 20,
  /** Varsayılan beklenen azalma oranı (%) — kullanıcı değiştirebilir, sonuç sayfasında varsayım olarak belirtilir */
  defaultReductionPct: 50,
  defaultHourlyCost: 750,
  /** AP başına kurulu maliyet aralığı (cihaz + montaj + lisans), TRY. [DOLDURULACAK] */
  apInstalledCost: null as { min: number; max: number } | null,
};

export const cctvConfig = {
  /** Kamera yatay çözünürlüğü (piksel) */
  resolutions: { "4MP": 2560, "8MP": 3840 } as const,
  /** Yaklaşık yatay görüş açıları (°), 1/2.7"–1/1.8" sensörler için tipik değerler */
  lenses: [
    { mm: 2.8, hfov: 100 },
    { mm: 4, hfov: 85 },
    { mm: 6, hfov: 55 },
    { mm: 8, hfov: 40 },
    { mm: 12, hfov: 28 },
  ],
  /** IEC 62676-4 DORI piksel yoğunlukları (px/m) */
  dori: {
    detection: { label: "Algılama", ppm: 25 },
    observation: { label: "Gözlem", ppm: 62.5 },
    recognition: { label: "Tanıma", ppm: 125 },
    identification: { label: "Kimlik", ppm: 250 },
  },
  /** Seviyeye göre önerilen lens (mm) */
  lensByDori: { detection: 2.8, observation: 2.8, recognition: 4, identification: 6 },
  /** Alan tipine göre pratik maksimum mesafe (m) ve etkin kullanım katsayısı (engeller, örtüşme) */
  areaTypes: {
    ic: { label: "İç mekan (lobi, koridor, ofis)", maxRange: 20, efficiency: 0.55 },
    depo: { label: "Depo / üretim alanı", maxRange: 30, efficiency: 0.5 },
    otopark: { label: "Açık otopark", maxRange: 40, efficiency: 0.6 },
    cevre: { label: "Çevre / perimetre", maxRange: 50, efficiency: 0.7 },
  },
  /** H.265 sürekli kayıt için ortalama bit hızı (Mbps) */
  bitrateMbps: { "4MP": 4, "8MP": 8 },
  /** Hareket bazlı kayıtta ortalama doluluk oranı */
  motionRecordingFactor: 0.4,
  /** Kamera başı ortalama PoE tüketimi (W) ve güç payı */
  poeWattsPerCamera: 7,
  poeHeadroom: 1.3,
  nvrChannelTiers: [8, 16, 32, 64, 128, 256],
  diskSizeTB: 8,
};

export const riskQuestions = [
  { id: "eslesme", q: "Misafir ve çalışan internet bağlantıları bir kişiyle eşleşiyor mu? (SMS, oda no + soyad, kimlik)", weight: 15, riskyAnswer: false, fix: "Captive portal ile SMS veya PMS doğrulaması kurun; her bağlantı bir kişiye bağlansın." },
  { id: "dhcp", q: "İç IP dağıtım (DHCP) logları otomatik olarak kaydediliyor mu?", weight: 12, riskyAnswer: false, fix: "DHCP ve oturum loglarını otomatik toplayan bir 5651 loglama sistemi devreye alın." },
  { id: "zaman", q: "Log dosyaları yetkili bir sağlayıcının zaman damgasıyla imzalanıyor mu?", weight: 15, riskyAnswer: false, fix: "Kayıtları günlük olarak zaman damgasıyla imzalayın; imzasız log değiştirilebilir kabul edilir." },
  { id: "ntp", q: "Firewall, hotspot ve sunucu saatleri NTP ile senkronize mi?", weight: 8, riskyAnswer: false, fix: "Tüm cihazları aynı NTP sunucusuna bağlayın; saat farkı kayıtların eşleştirilmesini imkansızlaştırır." },
  { id: "sure", q: "Kayıtlar en az 2 yıl saklanıyor mu?", weight: 12, riskyAnswer: false, fix: "Saklama kapasitesini en az 2 yıllık kayıt için planlayın ve güncel mevzuatla doğrulayın." },
  { id: "elle", q: "Kayıtlar Excel'e veya deftere elle mi giriliyor?", weight: 10, riskyAnswer: true, fix: "Elle tutulan kayıtları otomatik, değiştirilemez loglamaya taşıyın." },
  { id: "yedek", q: "Loglar modem/firewall dışında ayrı ve yedekli bir ortamda saklanıyor mu?", weight: 8, riskyAnswer: false, fix: "Logları cihazdan bağımsız, yedekli bir depolamaya alın; cihaz değişiminde kayıp yaşanmasın." },
  { id: "kvkk", q: "Captive portalda KVKK aydınlatma metni ve onay adımı var mı?", weight: 6, riskyAnswer: false, fix: "Karşılama sayfasına aydınlatma metni ve gerekli onay adımlarını ekleyin." },
  { id: "aktarim", q: "Belirli bir tarih ve IP için kayıtları dakikalar içinde dışa aktarabiliyor musunuz?", weight: 8, riskyAnswer: false, fix: "Tarih/IP bazlı sorgulama ve dışa aktarma yapabilen bir log arayüzü kullanın." },
  { id: "vlan", q: "Misafir ağı, personel ve POS ağından VLAN ile ayrılmış mı?", weight: 6, riskyAnswer: false, fix: "Misafir, personel, POS ve kamera ağlarını ayrı VLAN'lara bölün." },
] as const;
