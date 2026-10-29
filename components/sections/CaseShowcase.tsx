import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { publishedProjects } from "@/data/projects";

/** Vaka analizi vitrini: sorun → çözüm → sayısal sonuç. Yayınlanmış proje yoksa keşif davetine döner. */
export function CaseShowcase({ filter, title = "Sorun, çözüm ve ölçülen sonuç" }: { filter?: { sector?: string; region?: string; solution?: string }; title?: string }) {
  const list = publishedProjects()
    .filter((p) => !filter?.sector || p.sector === filter.sector)
    .filter((p) => !filter?.region || p.region === filter.region)
    .filter((p) => !filter?.solution || p.solutions.includes(filter.solution))
    .slice(0, 3);

  return (
    <section aria-labelledby="vakalar" className="container-page py-24">
      <SectionHeading id="vakalar" eyebrow="Vaka analizleri" title={title} />
      {list.length ? (
        <Stagger className="mt-12 grid gap-4 lg:grid-cols-3">
          {list.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/projeler/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{p.client}</p>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <div><dt className="font-semibold text-danger">Sorun</dt><dd className="text-muted">{p.problem}</dd></div>
                  <div><dt className="font-semibold text-accent">Çözüm</dt><dd className="text-muted">{p.solution}</dd></div>
                </dl>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  {p.results[0] && (
                    <p>
                      <span className="block text-3xl font-bold text-gradient">{p.results[0].metric}</span>
                      <span className="text-xs text-muted">{p.results[0].label}</span>
                    </p>
                  )}
                  <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-muted">
          <p>
            Referans projelerimizi ve sonuçlarını, müşteri onayıyla keşif görüşmesinde sizinle birebir paylaşıyoruz.{" "}
            <Link href="/ucretsiz-kesif" className="font-semibold text-accent underline underline-offset-2">
              Keşif planlayın
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}
