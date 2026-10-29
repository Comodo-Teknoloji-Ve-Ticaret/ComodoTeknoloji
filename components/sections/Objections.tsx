import { MessageCircleQuestion } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { Faq } from "@/data/types";

/** İtiraz yönetimi: satın alma komitesinin aklındaki soruları açıkça cevaplar */
export function Objections({ items, title = "Aklınızdaki soruları biliyoruz" }: { items: Faq[]; title?: string }) {
  return (
    <section aria-labelledby="itirazlar" className="container-page py-24">
      <SectionHeading id="itirazlar" eyebrow="Endişeleriniz" title={title} />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((o) => (
          <StaggerItem key={o.q} as="article" className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="flex gap-3 text-lg font-semibold">
              <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden />
              {o.q}
            </h3>
            <p className="mt-3 text-muted">{o.a}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
