# Comodo Teknoloji — comodoteknoloji.com

Next.js 15 (App Router, statik dışa aktarma) · TypeScript · Tailwind CSS v4 · motion · three.js · MDX

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statik site → out/
npm run deploy     # build + out/ klasörünü gh-pages dalına yayınlar
```

## Yayın (GitHub Pages)

- Site **statik** olarak dışa aktarılır (`output: "export"`) ve `gh-pages` dalından GitHub Pages ile yayınlanır.
  Alan adı `public/CNAME` dosyasındadır; `public/.nojekyll` GitHub'ın `_next/` klasörünü yok saymasını engeller.
- Güncelleme: `main` dalına kodu gönderin, ardından `npm run deploy` çalıştırın.
- Eski site yedekleri: `eski-site-kaynak` (eski Vite kaynak kodu) ve `eski-site-yayin` (eski yayın) etiketleri.
- **Formlar:** sunucu olmadığı için talep, ziyaretçinin tek dokunuşla göndereceği hazır bir WhatsApp mesajına dönüşür
  (`lib/lead-client.ts`). Taleplerin e-postaya da düşmesi için [web3forms.com](https://web3forms.com) üzerinden ücretsiz
  bir erişim anahtarı alıp derleme öncesinde `NEXT_PUBLIC_WEB3FORMS_KEY` ortam değişkenine yazın (`.env.local`).
- **Güvenlik başlıkları:** CSP sayfada `<meta>` olarak bulunur (`lib/csp.ts`). HSTS, `X-Frame-Options`, `X-Content-Type-Options`
  ve `Permissions-Policy` başlıklarını Cloudflare → Rules → Transform Rules → Response Header ile ekleyin.
- **Paylaşım görselleri** build sırasında `out/og/*.png` olarak üretilir (`app/og/[key]`, `lib/og.ts`).

## Klasör yapısı

```
app/
  layout.tsx                 Kök layout: fontlar, tema, LazyMotion, Header/Footer, çerez onayı, analitik
  template.tsx               Sayfa geçişi (yalnızca istemci gezinmelerinde; ilk yüklemede LCP gizlenmez)
  globals.css                Tasarım token'ları (koyu/açık), yardımcı sınıflar, grafik paleti
  page.tsx                   Ana sayfa
  cozumler/[slug]            7 çözüm sayfası (data/solutions.ts)
  urunler/[slug]             Ürün sayfaları (data/products.ts)
  sektorler/[slug]           4 sektör sayfası (data/sectors.ts)
  bolgeler/[ilce]            7 ilçe sayfası, özgün içerik (data/regions.ts)
  araclar/*                  ROI hesaplayıcı, CCTV planlayıcı, 5651 risk testi
  projeler, projeler/[slug]  Vaka analizleri (data/projects.ts)
  bilgi-bankasi/[slug]       MDX rehberler (content/blog/*.mdx)
  bakim-ve-destek, ucretsiz-kesif, hakkimizda, iletisim, kvkk, cerez-politikasi, tesekkurler
  actions/lead.ts            Server Action: doğrulama, honeypot, rate limit, Turnstile → Resend + WhatsApp + CRM
  api/og                     Dinamik OG görseli
  sitemap.ts, robots.ts, llms.txt/, llms-full.txt/
components/
  layout/                    Header, MobileMenu, Footer, StickyCta, WhatsAppButton, ThemeToggle, Logo
  motion/                    MotionProvider, Reveal/Stagger, WordReveal, StatCounter, TiltCard,
                             NetworkHero, ScrollSteps, PtsAnimation, CctvCoverage, lazy (ssr:false)
  sections/                  PageHero, Faq, DataTable, CtaBand, QaSections, CaseShowcase, Process,
                             Objections, LogoMarquee, ZeroDowntime, RelatedLinks, ToolPage, home/*
  forms/                     LeadForm (kısa), MultiStepForm, DiscoveryBooking, EmailGate, Turnstile
  tools/                     RoiCalculator, CctvPlanner, RiskScorecard
  analytics/                 CookieConsent, Analytics (onay sonrası GA4 + Clarity), track, ConversionEvent
  ui/                        button, accordion, tabs, input, label, chip
  JsonLd.tsx, Breadcrumbs.tsx
lib/
  site.ts                    FİRMA BİLGİLERİ (NAP) — tek doğruluk kaynağı
  motion.ts                  Ortak animasyon varyantları ve easing
  schema.ts                  JSON-LD @graph (LocalBusiness, WebSite, Service, Product, FAQPage, Breadcrumb, BlogPosting)
  seo.ts                     generateMetadata yardımcısı (canonical, hreflang, OG, Twitter)
  llms.ts                    llms.txt / llms-full.txt üreticisi
  content.ts                 MDX yükleyici · validations.ts · rate-limit.ts · links.ts · nav.ts · icons.ts
data/                        solutions, sectors, regions, products, projects, home, tool-config, types
content/blog/                MDX yazıları (draft: true olanlar üretimde yayınlanmaz)
```

## Yayına almadan önce doldurulacaklar

Projede `[DOLDURULACAK]` ve köşeli parantezli alanları arayın (`grep -rn "DOLDURULACAK\|\[FİRMA" app data lib content`).

1. **`lib/site.ts`** — telefon/WhatsApp (0507 850 52 87), e-posta ve alan adı girildi. Kalanlar: açık adres, koordinat, ticari unvanın sicil kaydıyla teyidi, `sameAs` profilleri (Instagram, LinkedIn, Google Maps), Google Maps embed, gerçek Google puanı. `stats` içindeki "6+ yıl" ve "200+ proje" eski sitedeki beyandan alındı; doğrulayın.
2. **`data/products.ts`** — Comodo/Xcitium ve Ejder 3 bilgilerini yalnızca resmi üretici/distribütör kaynaklarından girin, `sources` alanına kaynak yazın, sonra `status: "published"` yapın.
3. **`data/projects.ts`** — müşteri onaylı gerçek vaka analizleri; şablonu kopyalayıp `published` yapın.
4. **`data/regions.ts`** — her ilçe için müdahale süresi taahhüdü (`responseTime`).
5. **`data/home.ts`** — SLA paketlerinin müdahale süresi ve fiyatı.
6. **`data/tool-config.ts`** — `apInstalledCost` (boşsa hesaplayıcı bütçeyi "keşif sonrası" gösterir).
7. **`content/blog/`** — 5 yazı yayında (web sitesi neden önemli, işletme reklamı, güvenli web sitesi, kamera fiyatları, 5651). Yazar adı/unvanı girin; 7 taslak iskeleti tamamlayıp `draft: false` yapın.
8. **`app/kvkk`, `app/cerez-politikasi`** — taslak metinleri hukuk danışmanına onaylatın.
9. Gerçek saha fotoğraflarını `public/images/` altına anlamlı Türkçe dosya adlarıyla ekleyin ve `next/image` ile kullanın.

## 3D komodo ejderi (ana sayfa hero)

- `components/three/KomodoScene.tsx` (three.js + React Three Fiber) ve `KomodoStage.tsx` (yükleme, HUD, yedek görünüm).
- Modeller: `public/models/komodo.glb` (5,6 MB, masaüstü) ve `komodo-lite.glb` (2,8 MB, mobil / yavaş bağlantı / düşük bellek).
  Veri tasarrufu modu açıksa veya WebGL yoksa 3D yüklenmez, animasyonlu göz amblemi gösterilir.
- Model, sayfa ilk çizildikten sonra (tarayıcı boşa çıkınca) yüklenir ve yalnızca ekrandayken çizilir; LCP'yi etkilemez.
- Kaynak model ~130 MB'tır; yeniden üretmek için:
  ```bash
  node scripts/optimize-komodo.mjs <kaynak-klasör> public/models/komodo.glb --step=3 --tex=2048 --no-target-normals
  node scripts/optimize-komodo.mjs <kaynak-klasör> public/models/komodo-lite.glb --step=6 --tex=1024 --no-target-normals
  ```
- Model: "Komodo Dragon Lizard" — Nyilonelycompany, Sketchfab Standard lisans (`public/models/LICENSE.txt`).
- CSP'de `'wasm-unsafe-eval'` meshopt çözücüsü için gereklidir.

## Etkileşimler

| Bileşen | Ne yapar | Nerede |
| --- | --- | --- |
| `brand/IntroCurtain` | İlk ziyarette logo + tarama + perde açılışı (oturumda bir kez, yalnızca ana sayfa) | Ana sayfa |
| `brand/ComodoLogo` | Logo üzerinde periyodik ışık geçişi + komodonun gözünde nabız gibi atan kırmızı ışık (saf CSS) | Header, giriş, Neden Comodo, 3D yedek görünüm |
| `motion/InteractiveNetwork` | Fareye bağlanan ağ, sürüklerken kıvılcım izi, tıklayınca sinyal dalgası | Hero arka planı |
| `motion/CursorFollower` | İmleç takip halkası; `data-cursor="..."` taşıyan öğelerde etiket gösterir | Tüm site (fareli cihazlar) |
| `three/KomodoStage` | Ejderi sürükleyerek çevirme (ataletli), tıklayınca tarama; aşağı kaydırınca ejder hızla kadraj dışına koşar | Hero |
| `motion/Magnetic`, `motion/Spotlight` | İmlece çekilen butonlar, imleci izleyen ışık | Hero |
| `motion/RotatingWord` | "tam da otelinize / kliniğinize … göre" dönen satır | Hero |
| `home/ScrollStory` | Görün → Korunun → Bulunun → Büyüyün kaydırma hikâyesi | Ana sayfa |
| `motion/Scramble` | Bölüm etiketlerinde "şifre çözülür" efekti | Tüm bölüm başlıkları |

Hepsi "hareketi azalt" tercihine uyar; dokunmatik cihazlarda fare efektleri devre dışıdır.

## Portföy

`data/portfolio.ts` — eski siteden (comodoteknoloji.com) aktarılan web ve yazılım projeleri; ekran görüntüleri `public/images/projeler/`.
GitHub Pages üzerindeki tasarımlar "Tasarım örneği" olarak işaretlidir ve şemaya eklenmez.

## Notlar

- **CSP:** Sayfalar statik üretildiği için nonce yerine `'unsafe-inline'` script izni kullanılır.
- **PDF rapor:** araç sonuçları e-posta kapısından sonra açılır ve tarayıcının "PDF olarak kaydet" özelliğiyle indirilir (yazdırma stili tanımlı).
- **Fontlar** `app/fonts/` altından kendi sunucunuzdan servis edilir; Türkçe glifler için latin + latin-ext birlikte yüklenir.
- **Grafik renkleri** (`--chart-before/after`) renk körlüğü ve kontrast açısından iki temada doğrulanmıştır.
