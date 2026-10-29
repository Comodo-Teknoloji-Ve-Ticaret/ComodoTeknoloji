import { ArrowUpRight, BarChart3, BrainCircuit, Cpu, Leaf } from "lucide-react";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { portfolio, type PortfolioItem } from "@/data/portfolio";

const softwareIcons: Record<string, typeof Cpu> = {
  hotalyze: BrainCircuit,
  "uzaktan-sayac-okuma": Cpu,
  "enerji-karbon-hesaplama": Leaf,
  "musteri-anket-sistemi": BarChart3,
};

function Badge({ item }: { item: PortfolioItem }) {
  if (item.demo) return <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] text-muted">Tasarım örneği</span>;
  if (item.own) return <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] text-accent">Kendi ürünümüz</span>;
  return <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] text-success">Yayında</span>;
}

/** Web ve yazılım projeleri vitrini (eski siteden aktarılan gerçek projeler) */
export function Portfolio({
  title = "Web sitesi ve yazılım projelerimiz",
  lead = "Antalya'daki işletmeler için tasarladığımız web siteleri, e-ticaret platformları ve geliştirdiğimiz yazılım ürünleri.",
  limit,
  showSoftware = true,
}: {
  title?: string;
  lead?: string;
  limit?: number;
  showSoftware?: boolean;
}) {
  const sites = portfolio.filter((p) => p.image).slice(0, limit);
  const software = portfolio.filter((p) => !p.image);

  return (
    <section aria-labelledby="portfoy" className="container-page py-24">
      <SectionHeading id="portfoy" eyebrow="Portföy" title={title} lead={lead} />
      <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {sites.map((p) => (
          <StaggerItem as="li" key={p.slug}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-primary/60"
            >
              <div className="relative aspect-[2/1] overflow-hidden border-b border-border bg-surface-2">
                <Image
                  src={p.image!}
                  alt={p.alt ?? p.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.category}</p>
                  <Badge item={p} />
                </div>
                <h3 className="mt-2 flex items-center gap-1.5 text-lg font-bold">
                  {p.title}
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                </h3>
                <p className="mt-1.5 text-sm text-muted">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      {showSoftware && (
        <>
          <h3 className="mt-16 text-[length:var(--text-h3)]">Geliştirdiğimiz yazılım ürünleri</h3>
          <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {software.map((p) => {
              const Icon = softwareIcons[p.slug] ?? Cpu;
              const body = (
                <>
                  <div className="flex items-center justify-between">
                    <Icon className="size-7 text-accent" aria-hidden />
                    <Badge item={p} />
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.category}</p>
                  <h4 className="mt-1 font-bold">{p.title}</h4>
                  <p className="mt-1.5 text-sm text-muted">{p.description}</p>
                </>
              );
              return (
                <StaggerItem as="li" key={p.slug}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/60">
                      {body}
                    </a>
                  ) : (
                    <div className="h-full rounded-2xl border border-border bg-surface p-5">{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </>
      )}
    </section>
  );
}
