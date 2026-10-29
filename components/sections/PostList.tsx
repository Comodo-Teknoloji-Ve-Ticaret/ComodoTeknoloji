"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { PostMeta } from "@/lib/content";
import { formatDateTR } from "@/lib/utils";

/** Yazı listesi + istemci tarafı arama (?q= parametresi WebSite SearchAction ile uyumlu) */
export function PostList({ posts }: { posts: PostMeta[] }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);
  const term = q.trim().toLocaleLowerCase("tr-TR");
  const list = term ? posts.filter((p) => `${p.title} ${p.description} ${p.tags.join(" ")}`.toLocaleLowerCase("tr-TR").includes(term)) : posts;

  return (
    <>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
        <Input type="search" aria-label="Rehberlerde ara" placeholder="Rehberlerde ara…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-11" />
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/bilgi-bankasi/${p.slug}`} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
              {p.draft && <span className="mb-3 w-fit rounded-full bg-amber/15 px-2.5 py-0.5 text-xs text-amber">Taslak</span>}
              <h2 className="text-lg font-bold leading-snug">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
              <p className="mt-5 text-xs text-muted">
                <time dateTime={p.updated}>{formatDateTR(p.updated)}</time> · {p.readingMinutes} dk okuma
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {!list.length && <p className="mt-8 text-muted">Aramanızla eşleşen rehber bulunamadı.</p>}
    </>
  );
}
