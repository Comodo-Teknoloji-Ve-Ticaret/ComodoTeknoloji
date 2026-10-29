import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { stats, TODO } from "@/lib/site";

export function Stats() {
  return (
    <section aria-label="Rakamlarla biz" className="container-page">
      <Stagger as="ul" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem as="li" key={s.label} className="bg-surface p-6 sm:p-8">
            <p className="text-3xl font-bold tracking-tight sm:text-5xl">
              {s.display ? s.display : s.value === null ? <span className="text-base font-medium text-amber">{TODO}</span> : <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.value % 1 ? 1 : 0} />}
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
