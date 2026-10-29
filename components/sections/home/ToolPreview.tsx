import { Calculator, Camera, Gauge } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/nav";

const toolIcons = { "ag-yenileme-hesaplayici": Calculator, "cctv-planlayici": Camera, "5651-risk-testi": Gauge };

export function ToolPreview() {
  return (
    <section aria-labelledby="araclar" className="relative overflow-hidden border-y border-border bg-surface/50 py-24">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="araclar"
            eyebrow="Ücretsiz araçlar"
            title="Teklif istemeden önce kendi hesabınızı yapın"
            lead="Oda sayınızı ve şikayet sayınızı girin; önerilen access point sayısını ve yıllık iş gücü tasarrufunu saniyeler içinde görün."
          />
          <Reveal className="mt-8">
            <Button asChild size="lg">
              <Link href="/araclar/ag-yenileme-hesaplayici">Hesaplayıcıyı Aç</Link>
            </Button>
          </Reveal>
        </div>
        <ul className="grid gap-4">
          {tools.map((t, i) => {
            const Icon = toolIcons[t.slug];
            return (
              <Reveal as="li" key={t.slug} variant="slideInRight" delay={i * 0.08}>
                <Link href={`/araclar/${t.slug}`} className="glass flex items-center gap-5 rounded-2xl p-5 transition-colors hover:border-accent/50">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/15">
                    <Icon className="size-6 text-accent" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{t.short}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
