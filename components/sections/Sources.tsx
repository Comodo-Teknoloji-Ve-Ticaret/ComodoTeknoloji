import { BookOpenCheck, ExternalLink } from "lucide-react";
import type { Source } from "@/data/sources";

/**
 * Görünür kaynakça. Yapay zekâ arama motorları ve okuyucular için atıf yapılan
 * yetkili kaynakları numaralı listeler (GEO: kaynak gösteren içerik daha çok alıntılanır).
 */
export function Sources({ items, title = "Kaynaklar ve referanslar", className = "" }: { items: (Source & { id: string })[]; title?: string; className?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="kaynaklar" className={`container-page py-12 ${className}`}>
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 id="kaynaklar" className="flex items-center gap-2.5 text-lg font-bold">
          <BookOpenCheck className="size-5 text-accent" aria-hidden /> {title}
        </h2>
        <p className="mt-1.5 text-sm text-muted">Bu sayfadaki teknik bilgiler aşağıdaki resmi kurum, standart ve araştırma kaynaklarına dayanır.</p>
        <ol className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          {items.map((s, i) => (
            <li key={s.id} id={`kaynak-${s.id}`} className="flex gap-3">
              <span className="font-mono text-xs text-accent">[{i + 1}]</span>
              <span>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 font-medium hover:text-accent">
                    <cite className="not-italic">{s.title}</cite>
                    <ExternalLink className="mt-0.5 size-3 shrink-0 text-muted" aria-hidden />
                  </a>
                ) : (
                  <cite className="font-medium not-italic">{s.title}</cite>
                )}
                <span className="block text-xs text-muted">
                  {s.publisher}
                  {s.year ? ` · ${s.year}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
