import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export type RelatedGroup = { title: string; links: { label: string; href: string; text?: string }[] };

/** İç linkleme bloğu: çözüm ↔ sektör ↔ bölge ↔ araç ↔ vaka analizi */
export function RelatedLinks({ groups }: { groups: RelatedGroup[] }) {
  const visible = groups.filter((g) => g.links.length);
  if (!visible.length) return null;
  return (
    <section aria-labelledby="ilgili" className="container-page py-16">
      <h2 id="ilgili" className="text-[length:var(--text-h3)]">
        İlgili sayfalar
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {visible.map((g) => (
          <div key={g.title}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{g.title}</p>
            <Stagger as="ul" className="mt-3 space-y-2">
              {g.links.map((l) => (
                <StaggerItem as="li" key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-accent/50"
                  >
                    <span>
                      <span className="block text-sm font-semibold">{l.label}</span>
                      {l.text && <span className="mt-0.5 block text-xs text-muted">{l.text}</span>}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </section>
  );
}
