import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { solutions } from "@/data/solutions";
import { icons } from "@/lib/icons";

export function SolutionsGrid({ exclude, title = "Web sitesinden kameraya, tek muhatap" }: { exclude?: string; title?: string }) {
  const list = solutions.filter((s) => s.slug !== exclude);
  // İlk kart 2 sütun kaplar; 3 sütunlu ızgarada son satır boş kalacaksa son kart da genişletilir
  const cells = list.length + (exclude ? 0 : 1);
  const fillLast = cells % 3 === 2;
  return (
    <section aria-labelledby="cozumler" className="container-page py-24">
      <SectionHeading id="cozumler" eyebrow="Çözümler" title={title} lead="Web sitesi, güvenlik kamerası, yazılım, reklam, network altyapısı ve danışmanlık: her katmanı aynı ekip projelendirir, kurar ve destekler." />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {list.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <StaggerItem key={s.slug} className={(i === 0 && !exclude) || (i === list.length - 1 && fillLast) ? "lg:col-span-2" : undefined}>
              <TiltCard>
                <Link href={`/cozumler/${s.slug}`} className="flex h-full flex-col p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface-2">
                    <Icon className="size-6 text-accent" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-muted">{s.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    Detaylı incele <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
