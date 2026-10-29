import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { sectors } from "@/data/sectors";
import { icons } from "@/lib/icons";

export function SectorCards() {
  return (
    <section aria-labelledby="sektorler" className="container-page py-24">
      <SectionHeading id="sektorler" eyebrow="Sektörler" title="Hangi sektördesiniz?" lead="Her sektörün riski farklı. Sizin operasyonunuza göre hazırlanmış çözümleri görün." />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map((s) => {
          const Icon = icons[s.icon];
          return (
            <StaggerItem key={s.slug}>
              <Link
                href={`/sektorler/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
              >
                <span aria-hidden className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <Icon className="size-8 text-accent" aria-hidden />
                <h3 className="mt-6 text-xl font-bold">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Çözümleri gör <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
