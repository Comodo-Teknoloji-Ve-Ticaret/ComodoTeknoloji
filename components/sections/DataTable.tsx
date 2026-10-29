import type { DataTableT } from "@/data/types";
import { cn } from "@/lib/utils";

/** Gerçek HTML <table> (GEO: div ile taklit edilmiş tablo yok). Mobilde yatay kaydırılır. */
export function DataTable({ table, className, highlightCol }: { table: DataTableT; className?: string; highlightCol?: number }) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-border bg-surface", className)} role="region" aria-label={table.caption} tabIndex={0}>
      <table className="w-full min-w-[560px] border-collapse text-left text-[0.95rem]">
        <caption className="px-5 pt-4 pb-1 text-left text-sm text-muted">{table.caption}</caption>
        <thead>
          <tr className="border-b border-border">
            {table.head.map((h, i) => (
              <th
                key={h + i}
                scope="col"
                className={cn("px-5 py-3.5 font-semibold", i === highlightCol && "bg-primary/10 text-accent")}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-0">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-5 py-3.5 font-medium">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className={cn("px-5 py-3.5 text-muted", c === highlightCol && "bg-primary/5 text-fg")}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
