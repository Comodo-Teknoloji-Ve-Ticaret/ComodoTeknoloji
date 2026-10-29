import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

/** Arama motorları ve yapay zeka botları (GEO) açıkça izinli */
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended"];

/** Statik dışa aktarmada build sırasında dosyaya yazılır */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/tesekkurler"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
