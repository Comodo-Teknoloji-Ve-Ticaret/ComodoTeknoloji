import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCta } from "@/components/layout/StickyCta";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { introScript } from "@/components/brand/IntroCurtain";
import { csp } from "@/lib/csp";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Kendi sunucumuzdan servis edilen değişken fontlar (build sırasında ağ gerektirmez).
 * latin ve latin-ext ayrı dosyalardır; Türkçe ş/ğ/ı/İ glifleri latin-ext'tedir.
 * İlk dosyada yedek font kapalıdır, böylece eksik glifler Arial'e değil latin-ext dosyasına düşer.
 */
const interLatin = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
  fallback: [],
});
const interExt = localFont({
  src: "./fonts/inter-latin-ext-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter-ext",
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
});
const monoLatin = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-mono-jb",
  adjustFontFallback: false,
  fallback: [],
});
const monoExt = localFont({
  src: "./fonts/jetbrains-mono-latin-ext-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-mono-jb-ext",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Antalya Web Sitesi, Güvenlik Kamerası ve Yazılım`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FBF8F4" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${interLatin.variable} ${interExt.variable} ${monoLatin.variable} ${monoExt.variable} dark`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Giriş animasyonu kararı ilk boyamadan önce verilir (titreme olmaz) */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* JavaScript kapalıysa animasyonla gizlenen içerik görünür kalsın */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh font-sans">
        <a
          href="#icerik"
          className="sr-only z-[100] rounded-lg bg-primary px-4 py-2 text-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          İçeriğe geç
        </a>
        <ThemeProvider>
          <MotionProvider>
            <Header />
            <main id="icerik" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <StickyCta />
            <WhatsAppButton />
            <CookieConsent />
            <CursorFollower />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
