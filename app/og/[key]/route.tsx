import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogPages } from "@/lib/og";
import { site } from "@/lib/site";

/** Her sayfa için paylaşım görseli; statik dışa aktarmada /og/<anahtar>.png dosyası olarak üretilir */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogPages().map((p) => ({ key: `${p.key}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = ogPages().find((p) => `${p.key}.png` === key);
  const title = (page?.title ?? site.name).slice(0, 110);
  const logo = await readFile(path.join(process.cwd(), "public", "logo.png")).catch(() => null);
  const logoSrc = logo ? `data:image/png;base64,${logo.toString("base64")}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(247,147,30,0.38), transparent 45%), linear-gradient(rgba(255,200,140,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,200,140,0.06) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "#F2EFEA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} width={72} height={72} alt="" />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 14, background: "linear-gradient(135deg,#F7931E,#FFC23D)" }} />
          )}
          <div style={{ fontSize: 32, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A8A29E" }}>
          <span>Antalya · Web Sitesi · Güvenlik Kamerası · Yazılım · Altyapı · Danışmanlık</span>
          <span style={{ color: "#FFC23D" }}>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
