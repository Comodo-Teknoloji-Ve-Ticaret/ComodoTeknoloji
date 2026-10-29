import { AlertCircle, CheckCircle2, MessageCircle, MonitorPlay, Receipt } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DataTable } from "@/components/sections/DataTable";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { sectors } from "@/data/sectors";
import { solutionLinks } from "@/lib/links";
import { breadcrumbSchema, faqSchema, graph, productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, whatsappLink } from "@/lib/site";
import { formatTRY } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: `/urunler/${p.slug}`,
    noindex: p.status !== "published",
  });
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const url = absoluteUrl(`/urunler/${p.slug}`);
  const crumbs = [
    { name: "Ürünler", href: `/urunler/${p.slug}` },
    { name: p.name, href: `/urunler/${p.slug}` },
  ];
  const price = p.pricing.priceRange
    ? `${formatTRY(p.pricing.priceRange.min)} – ${formatTRY(p.pricing.priceRange.max)}`
    : p.pricing.startingPrice
      ? `${formatTRY(p.pricing.startingPrice)}'den başlayan fiyatlarla`
      : "Fiyat, ihtiyacınıza göre teklifle belirlenir";

  return (
    <>
      <JsonLd data={graph(productSchema(p), faqSchema(p.faqs, url), breadcrumbSchema(crumbs.slice(1)))} />

      {p.status !== "published" && (
        <div className="bg-amber/15 py-2 text-center text-sm text-amber">
          Taslak ürün sayfası — [DOLDURULACAK] alanları üretici kaynaklarından doldurulana kadar indekslenmez.
        </div>
      )}

      <PageHero
        crumbs={crumbs.slice(1)}
        eyebrow={`${p.brand} · ${p.category}`}
        title={p.name}
        definition={p.oneLiner}
        updatedAt={p.updatedAt}
        aside={<LeadForm source={`urun:${p.slug}`} title="Teklif alın" cta="Teklif Al" />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/ucretsiz-kesif?urun=${p.slug}`}>
              <MonitorPlay /> Demo İste
            </Link>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a href={whatsappLink(`Merhaba, ${p.name} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="kimler-icin" className="container-page py-16">
        <h2 id="kimler-icin" className="text-[length:var(--text-h3)]">
          Kimler için?
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.audience.map((a) => {
            const sector = sectors.find((s) => a.toLowerCase().includes(s.name.split(" ")[0].toLowerCase()));
            return (
              <li key={a}>
                {sector ? (
                  <Link href={`/sektorler/${sector.slug}`} className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-accent/50">
                    {a}
                  </Link>
                ) : (
                  <span className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm">{a}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="problemler" className="container-page py-12">
        <h2 id="problemler" className="text-[length:var(--text-h3)]">
          Çözdüğü üç problem
        </h2>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
          {p.problems.map((x, i) => (
            <StaggerItem key={i} as="article" className="rounded-2xl border border-border bg-surface p-5">
              <AlertCircle className="size-5 text-amber" aria-hidden />
              <h3 className="mt-3 font-semibold">{x.title}</h3>
              <p className="mt-2 text-sm text-muted">{x.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="ozellikler" className="container-page py-12">
        <SectionHeading id="ozellikler" eyebrow="Özellikler" title={`${p.name} özellikleri`} />
        <Reveal className="mt-8">
          <DataTable table={p.features} />
        </Reveal>
      </section>

      <section aria-labelledby="karsilastirma" className="container-page py-12">
        <SectionHeading id="karsilastirma" eyebrow="Karşılaştırma" title={p.comparison.caption} />
        <Reveal className="mt-8">
          <DataTable table={p.comparison} highlightCol={1} />
        </Reveal>
      </section>

      <section aria-labelledby="lisans" className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-surface p-6">
          <Receipt className="size-6 text-accent" aria-hidden />
          <h2 id="lisans" className="mt-4 text-[length:var(--text-h3)]">
            Lisans ve fiyat
          </h2>
          <p className="mt-3 text-muted">{p.pricing.model}</p>
          <p className="mt-4 text-2xl font-bold">{price}</p>
          <h3 className="mt-6 font-semibold">Fiyatı belirleyen unsurlar</h3>
          <ul className="mt-3 space-y-2">
            {p.pricing.factors.map((f) => (
              <li key={f} className="flex gap-2.5 text-muted">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-[length:var(--text-h3)]">Kurulum süreci</h2>
          <ol className="mt-5 space-y-4">
            {p.setupSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-accent/50 font-mono text-xs text-accent">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="text-sm text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section aria-labelledby="neden-biz" className="container-page py-12">
        <h2 id="neden-biz" className="text-[length:var(--text-h3)]">
          Neden bizden almalısınız?
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {p.whyUs.map((w) => (
            <li key={w} className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden /> {w}
            </li>
          ))}
        </ul>
      </section>

      <Faq faqs={p.faqs} title={`${p.name} hakkında sık sorulanlar`} />

      <section aria-label="Kaynaklar" className="container-page pb-8 text-sm text-muted">
        <p className="font-semibold text-fg">Kaynaklar</p>
        <ul className="mt-2 list-disc pl-5">
          {p.sources.map((s) => (
            <li key={s.label}>{s.url ? <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-2">{s.label}</a> : s.label}</li>
          ))}
        </ul>
      </section>

      <RelatedLinks groups={[{ title: "İlgili çözümler", links: solutionLinks(p.relatedSolutions) }]} />
    </>
  );
}
