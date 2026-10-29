import { ArrowRight, Globe, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

const reasons = [
  { title: "Sizi arayan müşteri sizi bulsun", text: "\"Antalya güvenlik kamerası\" ya da \"Muratpaşa diş kliniği\" arayan kişi; Google'da, haritada ve yapay zekâ asistanlarında karşısına sizi çıkarsın." },
  { title: "Güveni web sitesi kazanır", text: "Gerçek adres, referans projeler, net hizmet bilgisi ve güvenli bağlantı; sosyal medyanın tek başına veremediği güveni verir." },
  { title: "Reklam bütçesi boşa gitmesin", text: "Hızlı, ölçümlü ve güvenli bir açılış sayfası, aynı reklam bütçesinden daha fazla arama ve form alır." },
  { title: "Veri ve kontrol sizde kalsın", text: "Platform kuralları değişse de hesabınız kapansa da kendi alan adınızdaki siteniz işletmenizin dijital adresi olarak kalır." },
];

/**
 * GEO bloğu: "İşletmeler için web sitesi neden önemli?" sorusuna ilk cümlede doğrudan cevap,
 * ardından gerekçeler ve "güvenlik destekli dijital büyüme" yaklaşımı.
 */
export function DigitalGrowth() {
  return (
    <section aria-labelledby="web-neden" className="relative overflow-hidden border-y border-border bg-surface/50 py-24">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Dijital büyüme</p>
            <h2 id="web-neden" className="mt-3 text-[length:var(--text-h2)]">
              İşletmeler için web sitesi neden önemli?
            </h2>
            <p className="mt-5 text-lg font-medium text-fg/90" data-geo="answer">
              Web sitesi, müşterinin işletmenizi araştırırken ulaştığı ve kontrolü tamamen sizde olan tek dijital adrestir; reklamlar, sosyal medya ve harita
              kaydı trafiği getirir, güveni ve dönüşümü ise web sitesi tamamlar.
            </p>
          </Reveal>
          <Stagger as="ol" className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <StaggerItem as="li" key={r.title} className="rounded-2xl border border-border bg-surface p-5">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{r.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/cozumler/web-tasarim">
                <Globe /> Web sitesi çözümleri
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/bilgi-bankasi/isletme-web-sitesi-neden-onemli">
                Rehberi okuyun <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal variant="slideInRight" className="border-gradient relative self-start rounded-3xl bg-surface p-7 sm:p-8">
          <Sparkles className="size-7 text-accent" aria-hidden />
          <h3 className="mt-4 text-2xl font-bold">Güvenlik destekli dijital büyüme</h3>
          <p className="mt-3 text-muted">
            Bir bilişim ve güvenlik firması olarak web sitenizi ve reklamlarınızı, kamera ve network altyapınızı kurduğumuz özenle kuruyoruz.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              { Icon: ShieldCheck, t: "Güvenli site", d: "HTTPS/HSTS, güvenlik başlıkları, bot korumalı formlar, düzenli yedek." },
              { Icon: Sparkles, t: "SEO + GEO", d: "Google'da ve ChatGPT, Perplexity gibi yapay zekâ aramalarında kaynak olmaya hazır altyapı." },
              { Icon: Megaphone, t: "Ölçülebilir reklam", d: "Google Ads, Meta ve Google İşletme Profili; KVKK uyumlu dönüşüm takibiyle." },
            ].map(({ Icon, t, d }) => (
              <li key={t} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="text-sm text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/cozumler/dijital-reklam" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline underline-offset-4">
            İşletme reklamı ve yerel SEO <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
