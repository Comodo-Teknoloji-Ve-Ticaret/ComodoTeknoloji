/**
 * İçerik Güvenlik Politikası (CSP) — <meta http-equiv> olarak basılır.
 * Statik barındırmada (GitHub Pages) sunucu başlığı gönderilemediği için meta kullanılır;
 * meta CSP'de frame-ancestors desteklenmez (tıklama korsanlığı koruması için Cloudflare'de
 * X-Frame-Options / frame-ancestors başlığı eklenmelidir).
 * Sayfalar statik üretildiği için nonce yerine 'unsafe-inline' kullanılır.
 * İzinli üçüncü taraflar: GA4, Clarity, Web3Forms (form servisi), Google Haritalar.
 */
export const csp = [
  "default-src 'self'",
  // 'wasm-unsafe-eval': 3D modeldeki meshopt sıkıştırmasını çözen WebAssembly için
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms",
  "font-src 'self' data:",
  "connect-src 'self' blob: data: https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://api.web3forms.com",
  "frame-src https://www.google.com https://maps.google.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
