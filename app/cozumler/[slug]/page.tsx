import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { CctvCoverageLazy, PtsAnimationLazy } from "@/components/motion/lazy";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { DataTable } from "@/components/sections/DataTable";
import { Faq } from "@/components/sections/Faq";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PageHero } from "@/components/sections/PageHero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { QaSections } from "@/components/sections/QaSections";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ZeroDowntime } from "@/components/sections/ZeroDowntime";
import { Button } from "@/components/ui/button";
import { getSolution, solutions } from "@/data/solutions";
import { productLinks, regionLinks, sectorLinks, toolLinks } from "@/lib/links";
import { Sources } from "@/components/sections/Sources";
import { getSources, solutionSources } from "@/data/sources";
import { breadcrumbSchema, citationList, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/cozumler/${s.slug}` });
}

/** Sayfaya özel görsel anlatım (tembel yüklenen SVG animasyonlar) */
const visuals: Record<string, React.ReactNode> = {
  "plaka-tanima-sistemi": <PtsAnimationLazy />,
  "guvenlik-kameralari": <CctvCoverageLazy />,
};

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const url = absoluteUrl(`/cozumler/${s.slug}`);
  const crumbs = [
    { name: "Çözümler", href: "/cozumler/web-tasarim" },
    { name: s.name, href: `/cozumler/${s.slug}` },
  ];
  const visual = visuals[s.slug];
  const refs = getSources(solutionSources[s.slug]);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ url, name: s.h1, description: s.metaDescription, about: `${url}#service`, citations: citationList(refs), dateModified: s.updatedAt }),
          serviceSchema(s),
          faqSchema(s.faqs, url),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={s.name}
        title={s.h1}
        definition={s.definition}
        updatedAt={s.updatedAt}
        aside={
          visual ? (
            <div className="glass rounded-3xl p-4 sm:p-6">{visual}</div>
          ) : (
            <LeadForm source={`cozum:${s.slug}`} title="Bu çözüm için teklif alın" />
          )
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/ucretsiz-kesif">Ücretsiz Keşif Planla</Link>
          </Button>
          {s.relatedTools[0] && (
            <Button asChild size="lg" variant="secondary">
              <Link href={`/araclar/${s.relatedTools[0]}`}>Ücretsiz aracı kullan</Link>
            </Button>
          )}
        </div>
      </PageHero>

      {/* Kimin için + hangi sorunu çözer */}
      <section aria-labelledby="kimin-icin" className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <h2 id="kimin-icin" className="text-[length:var(--text-h3)]">
            Kimin için?
          </h2>
          <ul className="mt-6 space-y-3">
            {s.audience.map((a) => (
              <li key={a} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <h2 className="text-[length:var(--text-h3)]">Hangi sorunu çözer?</h2>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-3">
            {s.problems.map((p) => (
              <StaggerItem key={p.title} as="article" className="rounded-2xl border border-border bg-surface p-5">
                <AlertCircle className="size-5 text-amber" aria-hidden />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Teknik detay — soru formatında H2'ler */}
      <section className="container-page py-12">
        <QaSections sections={s.sections} />
      </section>

      {s.process && <Process steps={s.process.steps} title={s.process.title} />}

      <section aria-labelledby="karsilastirma" className="container-page py-16">
        <SectionHeading id="karsilastirma" eyebrow="Karşılaştırma" title={s.comparison.caption} />
        <Reveal className="mt-8">
          <DataTable table={s.comparison} highlightCol={s.comparison.head.length - 1} />
        </Reveal>
      </section>

      <section aria-labelledby="fiyat" className="container-page py-16">
        <SectionHeading
          id="fiyat"
          eyebrow="Fiyatlandırma"
          title="Fiyatı neler belirler?"
          lead="Her proje keşif sonrası kalem kalem fiyatlandırılır. Teklifinizi etkileyen başlıca unsurlar:"
        />
        <Reveal className="mt-8">
          <DataTable table={s.priceFactors} />
        </Reveal>
      </section>

      {["web-tasarim", "yazilim", "dijital-reklam"].includes(s.slug) && (
        <Portfolio
          title={s.slug === "yazilim" ? "Geliştirdiğimiz yazılımlar ve platformlar" : "Hazırladığımız web siteleri"}
          showSoftware={s.slug !== "dijital-reklam"}
        />
      )}

      {/* CTA + hemen altında vaka analizi ve logolar */}
      <CtaBand title={`${s.name} için ücretsiz keşif`} />
      <CaseShowcase filter={{ solution: s.slug }} title="Bu çözümle elde edilen sonuçlar" />
      <LogoMarquee />

      <ZeroDowntime />

      <Faq faqs={s.faqs} title={`${s.name} hakkında sık sorulanlar`} />

      <Sources items={refs} />

      {visual && (
        <section className="container-page py-12">
          <div className="mx-auto max-w-xl">
            <LeadForm source={`cozum:${s.slug}`} title="Bu çözüm için teklif alın" />
          </div>
        </section>
      )}

      <RelatedLinks
        groups={[
          { title: "Sektörler", links: sectorLinks(s.relatedSectors) },
          { title: "Bölgeler", links: regionLinks(s.relatedRegions) },
          { title: "Araçlar", links: toolLinks(s.relatedTools) },
          { title: "Ürünler", links: productLinks(s.relatedProducts) },
        ]}
      />
    </>
  );
}
