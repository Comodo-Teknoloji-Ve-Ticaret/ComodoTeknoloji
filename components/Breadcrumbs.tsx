import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Görünür breadcrumb. Şeması sayfanın @graph'ına breadcrumbSchema() ile eklenir. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Ana Sayfa", href: "/" }, ...items];
  return (
    <nav aria-label="Sayfa konumu" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-fg">
                    {c.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
