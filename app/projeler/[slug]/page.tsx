import { Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { getProject, projects } from "@/data/projects";
import { regionLinks, sectorLinks, solutionLinks } from "@/lib/links";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title.slice(0, 60), description: p.summary.slice(0, 155), path: `/projeler/${p.slug}`, noindex: p.status !== "published" });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const crumbs = [
    { name: "Projeler", href: "/projeler" },
    { name: p.title, href: `/projeler/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero crumbs={crumbs} eyebrow={p.client} title={p.title} definition={p.summary} updatedAt={p.updatedAt} />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <Reveal>
            <h2 className="text-[length:var(--text-h3)]">Sorun</h2>
            <p className="mt-3 text-muted">{p.problem}</p>
          </Reveal>
          <Reveal>
            <h2 className="text-[length:var(--text-h3)]">Uygulanan çözüm</h2>
            <p className="mt-3 text-muted">{p.solution}</p>
          </Reveal>
          {p.testimonial && (
            <Reveal as="article" className="rounded-2xl border border-border bg-surface p-6">
              <Quote className="size-6 text-accent" aria-hidden />
              <blockquote className="mt-3 text-lg">{p.testimonial.quote}</blockquote>
              <p className="mt-3 text-sm text-muted">
                {p.testimonial.author} · {p.testimonial.role}
              </p>
            </Reveal>
          )}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">Sayısal sonuç</h2>
            <ul className="mt-4 space-y-4">
              {p.results.map((r) => (
                <li key={r.label}>
                  <span className="block text-3xl font-bold text-gradient">{r.metric}</span>
                  <span className="text-sm text-muted">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-6">
            <table className="w-full text-sm">
              <caption className="mb-3 text-left font-semibold">Proje kapsamı</caption>
              <tbody>
                {p.scope.map((s) => (
                  <tr key={s.label} className="border-b border-border last:border-0">
                    <th scope="row" className="py-2 pr-4 text-left font-medium">{s.label}</th>
                    <td className="py-2 text-muted">{s.value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-2 pr-4 text-left font-medium">Süre</th>
                  <td className="py-2 text-muted">{p.duration}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </section>

      {p.gallery.length > 0 && (
        <section aria-label="Proje galerisi" className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {p.gallery.map((g) => (
            <Image key={g.src} src={g.src} alt={g.alt} width={800} height={600} className="aspect-[4/3] w-full rounded-2xl object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
          ))}
        </section>
      )}

      <CtaBand />
      <RelatedLinks
        groups={[
          { title: "Çözümler", links: solutionLinks(p.solutions) },
          { title: "Sektör", links: sectorLinks([p.sector]) },
          { title: "Bölge", links: regionLinks([p.region]) },
        ]}
      />
    </>
  );
}
