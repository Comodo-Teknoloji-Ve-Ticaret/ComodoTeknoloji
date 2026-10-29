import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SolutionsGridFor } from "@/components/sections/SolutionsGridFor";
import { Objections } from "@/components/sections/Objections";
import { PageHero } from "@/components/sections/PageHero";
import { QaSections } from "@/components/sections/QaSections";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/button";
import { getSector, sectors } from "@/data/sectors";
import { regionLinks, toolLinks } from "@/lib/links";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSector((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/sektorler/${s.slug}` });
}

export default async function SectorPage({ params }: Props) {
  const s = getSector((await params).slug);
  if (!s) notFound();
  const url = absoluteUrl(`/sektorler/${s.slug}`);
  const crumbs = [
    { name: "Sektörler", href: "/sektorler/otel-ve-resort" },
    { name: s.name, href: `/sektorler/${s.slug}` },
  ];
  const allFaqs = [...s.faqs, ...s.objections];

  return (
    <>
      <JsonLd data={graph(faqSchema(allFaqs, url), breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`Sektör · ${s.name}`}
        title={s.h1}
        definition={s.definition}
        updatedAt={s.updatedAt}
        aside={<LeadForm source={`sektor:${s.slug}`} title="İşletmenize özel teklif" />}
      >
        <Button asChild size="lg">
          <Link href="/ucretsiz-kesif">Ücretsiz Keşif Planla</Link>
        </Button>
      </PageHero>

      <section aria-labelledby="sorunlar" className="container-page py-20">
        <h2 id="sorunlar" className="text-[length:var(--text-h2)]">
          {s.name} işletmelerinin en sık yaşadığı sorunlar
        </h2>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.pains.map((p) => (
            <StaggerItem key={p.title} as="article" className="rounded-2xl border border-border bg-surface p-5">
              <AlertCircle className="size-5 text-amber" aria-hidden />
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <SolutionsGridFor slugs={s.solutions} title={`${s.name} için önerdiğimiz çözümler`} />

      <section className="container-page py-12">
        <QaSections sections={s.sections} />
      </section>

      <CaseShowcase filter={{ sector: s.slug }} />
      <Objections items={s.objections} />
      <Faq faqs={s.faqs} />
      <CtaBand />
      <RelatedLinks
        groups={[
          { title: "Araçlar", links: toolLinks(s.relatedTools) },
          { title: "Bölgeler", links: regionLinks(s.relatedRegions) },
        ]}
      />
    </>
  );
}
