import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { solutions } from "@/data/solutions";
import { icons } from "@/lib/icons";

/** Belirli çözümlerin kart ızgarası (sektör / bölge sayfaları) */
export function SolutionsGridFor({ slugs, title }: { slugs: string[]; title: string }) {
  const list = slugs.flatMap((slug) => solutions.filter((s) => s.slug === slug));
  return (
    <section aria-labelledby="onerilen-cozumler" className="container-page py-16">
      <SectionHeading id="onerilen-cozumler" eyebrow="Çözümler" title={title} />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {list.map((s) => {
          const Icon = icons[s.icon];
          return (
            <StaggerItem key={s.slug}>
              <TiltCard>
                <Link href={`/cozumler/${s.slug}`} className="flex h-full flex-col p-6">
                  <Icon className="size-6 text-accent" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{s.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    İncele <ArrowRight className="size-4" aria-hidden />
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
