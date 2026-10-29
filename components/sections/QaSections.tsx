import { Reveal } from "@/components/motion/Reveal";
import type { QaSection } from "@/data/types";
import { DataTable } from "./DataTable";

/** Soru formatında H2'ler; her H2'nin ilk cümlesi doğrudan cevap (GEO) */
export function QaSections({ sections }: { sections: QaSection[] }) {
  return (
    <div className="space-y-14">
      {sections.map((s) => (
        <Reveal as="article" key={s.h2} className="max-w-3xl">
          <h2 className="text-[length:var(--text-h3)]">{s.h2}</h2>
          <p className="mt-4 text-lg font-medium text-fg/90">{s.answer}</p>
          {s.body && <p className="mt-3 text-muted">{s.body}</p>}
          {s.bullets && (
            <ul className="mt-4 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {s.table && <DataTable table={s.table} className="mt-6" />}
        </Reveal>
      ))}
    </div>
  );
}
