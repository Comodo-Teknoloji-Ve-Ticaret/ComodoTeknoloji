import { Building, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SolutionsGridFor } from "@/components/sections/SolutionsGridFor";
import { Button } from "@/components/ui/button";
import { getRegion, regions } from "@/data/regions";
import { regionLinks, sectorLinks } from "@/lib/links";
import { BUSINESS_ID, breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ ilce: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ ilce: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRegion((await params).ilce);
  if (!r) return {};
  return pageMetadata({ title: r.metaTitle, description: r.metaDescription, path: `/bolgeler/${r.slug}` });
}

export default async function RegionPage({ params }: Props) {
  const r = getRegion((await params).ilce);
  if (!r) notFound();
  const url = absoluteUrl(`/bolgeler/${r.slug}`);
  const crumbs = [
    { name: "Bölgeler", href: `/bolgeler/${r.slug}` },
    { name: r.name, href: `/bolgeler/${r.slug}` },
  ];

  // Bölgeye özel hizmet sayfası: yerel işletmenin bu ilçede hizmet verdiğini belirtir
  const localService = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: r.h1,
    description: r.definition,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: `${r.name}, Antalya` },
    url,
  };

  return (
    <>
      <JsonLd data={graph(localService, faqSchema(r.faqs, url), breadcrumbSchema(crumbs.slice(1)))} />
      <PageHero
        crumbs={crumbs.slice(1)}
        eyebrow={`Bölge · ${r.name}`}
        title={r.h1}
        definition={r.definition}
        updatedAt={r.updatedAt}
        aside={<LeadForm source={`bolge:${r.slug}`} title={`${r.name} için teklif alın`} />}
      >
        <Button asChild size="lg">
          <Link href="/ucretsiz-kesif">{r.locative} ücretsiz keşif</Link>
        </Button>
      </PageHero>

      <section aria-labelledby="profil" className="container-page grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 id="profil" className="text-[length:var(--text-h2)]">
            {r.locative}ki işletmelerin altyapı profili
          </h2>
          <p className="mt-5 text-lg text-muted">{r.profile}</p>
        </Reveal>
        <Reveal className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="flex items-center gap-2 font-semibold">
              <Building className="size-5 text-accent" aria-hidden /> Tipik işletmeler
            </p>
            <ul className="mt-3 space-y-1.5 text-muted">
              {r.typicalBusinesses.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber/40 bg-amber/5 p-6">
            <p className="flex items-center gap-2 font-semibold">
              <Timer className="size-5 text-amber" aria-hidden /> Müdahale süresi taahhüdü
            </p>
            <p className="mt-2 text-muted">{r.responseTime}</p>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="ihtiyaclar" className="container-page py-12">
        <h2 id="ihtiyaclar" className="text-[length:var(--text-h3)]">
          {r.locative} en çok talep edilen çözümler
        </h2>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {r.needs.map((n) => (
            <StaggerItem key={n.title} as="article" className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="mt-2 text-sm text-muted">{n.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <SolutionsGridFor slugs={r.solutions} title={`${r.name} için çözümlerimiz`} />
      <CaseShowcase filter={{ region: r.slug }} title={`${r.locative}ki projelerimiz`} />
      <Faq faqs={r.faqs} title={`${r.name} hakkında sık sorulanlar`} />
      <CtaBand title={`${r.locative}ki tesisinizi birlikte inceleyelim`} />
      <RelatedLinks
        groups={[
          { title: "Sektörler", links: sectorLinks(r.sectors) },
          { title: "Yakın bölgeler", links: regionLinks(r.nearby) },
        ]}
      />
    </>
  );
}
