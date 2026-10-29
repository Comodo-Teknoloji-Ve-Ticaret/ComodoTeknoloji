import { BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Sources } from "@/components/sections/Sources";
import { getSources } from "@/data/sources";
import { getAllPosts, getPost } from "@/lib/content";
import { articleSchema, breadcrumbSchema, citationList, faqSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDateTR } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title.length > 60 ? `${p.title.slice(0, 57)}…` : p.title,
    description: p.description,
    path: `/bilgi-bankasi/${p.slug}`,
    noindex: p.draft,
    ogType: "article",
    publishedTime: p.date,
    modifiedTime: p.updated,
  });
}

/** MDX içindeki tablolar mobilde yatay kaydırılabilir olsun */
const mdxComponents = {
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Tablo">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }: React.ComponentProps<"a">) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} rel="noopener noreferrer" target="_blank" {...props} />,
};

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const url = absoluteUrl(`/bilgi-bankasi/${p.slug}`);
  const refs = getSources(p.sources);
  const crumbs = [
    { name: "Bilgi Bankası", href: "/bilgi-bankasi" },
    { name: p.title, href: `/bilgi-bankasi/${p.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({
            slug: p.slug,
            title: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.updated,
            author: { name: p.author.name, jobTitle: p.author.jobTitle, url: p.author.linkedin || undefined, knowsAbout: p.author.knowsAbout },
            citations: citationList(refs),
          }),
          p.faqs.length > 0 && faqSchema(p.faqs, url),
          breadcrumbSchema(crumbs),
        )}
      />
      <article>
        <header className="container-page pt-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 max-w-4xl text-[length:var(--text-h1)]">{p.title}</h1>
          <p className="mt-4 text-sm text-muted">
            Yayın: <time dateTime={p.date}>{formatDateTR(p.date)}</time> · Son güncelleme: <time dateTime={p.updated}>{formatDateTR(p.updated)}</time> ·{" "}
            {p.readingMinutes} dk okuma
          </p>
        </header>

        <div className="container-page mt-10 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="prose-site">
            <MDXRemote source={p.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>

          {/* Yazar / uzman kutusu */}
          <aside aria-label="Yazar" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Yazar</p>
              <p className="mt-2 font-semibold">{p.author.name}</p>
              {p.author.jobTitle && <p className="text-sm text-muted">{p.author.jobTitle}</p>}
              {!!p.author.certifications?.length && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.author.certifications.map((c) => (
                    <li key={c} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs">
                      <BadgeCheck className="size-3.5 text-accent" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
              )}
              {p.author.linkedin && (
                <a href={p.author.linkedin} target="_blank" rel="noopener noreferrer author" className="mt-3 inline-block text-sm text-accent underline underline-offset-2">
                  LinkedIn profili
                </a>
              )}
            </div>
          </aside>
        </div>
      </article>
      {p.faqs.length > 0 && <Faq faqs={p.faqs} />}
      <Sources items={refs} />
      <CtaBand />
    </>
  );
}
