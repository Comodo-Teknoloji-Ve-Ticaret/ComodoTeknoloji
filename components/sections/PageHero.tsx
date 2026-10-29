import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { formatDateTR } from "@/lib/utils";

/**
 * İç sayfa başlığı. H1 ve tanım paragrafı animasyonsuzdur (LCP ilk karede görünür).
 * `definition`: 40–60 kelimelik alıntılanabilir GEO bloğu.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  definition,
  updatedAt,
  children,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  definition: string;
  updatedAt?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="absolute -top-40 left-1/3 h-80 w-[40rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="container-page relative py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className={aside ? "mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center" : "mt-8"}>
          <div className="max-w-3xl">
            {eyebrow && <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
            <h1 className="text-[length:var(--text-h1)]">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-fg/85" data-geo="definition">
              {definition}
            </p>
            {updatedAt && (
              <p className="mt-4 text-sm text-muted">
                Son güncelleme: <time dateTime={updatedAt}>{formatDateTR(updatedAt)}</time>
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
