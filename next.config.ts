import type { NextConfig } from "next";

/**
 * GitHub Pages için statik dışa aktarma (out/ klasörü).
 * - Sunucu gerektiren özellik yoktur: formlar istemci tarafında (lib/lead-client.ts),
 *   paylaşım görselleri build sırasında üretilir (app/og/[key]).
 * - Güvenlik başlıkları sunucudan gönderilemediği için CSP <meta> olarak basılır (lib/csp.ts);
 *   HSTS vb. başlıklar Cloudflare üzerinden eklenmelidir (README → Yayın).
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // GitHub Pages'te görüntü optimizasyon sunucusu yoktur; görseller zaten WebP olarak hazırlandı
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default nextConfig;
