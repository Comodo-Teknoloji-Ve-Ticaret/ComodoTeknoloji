import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks, type RelatedGroup } from "@/components/sections/RelatedLinks";
import type { Faq as FaqT } from "@/data/types";
import { BUSINESS_ID, breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

/** Araç sayfası iskeleti: SSR başlık/tanım + istemci aracı + SSS + iç linkler */
export function ToolPage({
  slug,
  name,
  title,
  definition,
  updatedAt,
  faqs,
  related,
  children,
  methodology,
}: {
  slug: string;
  name: string;
  title: string;
  definition: string;
  updatedAt: string;
  faqs: FaqT[];
  related: RelatedGroup[];
  children: React.ReactNode;
  methodology: React.ReactNode;
}) {
  const url = absoluteUrl(`/araclar/${slug}`);
  const crumbs = [
    { name: "Araçlar", href: `/araclar/${slug}` },
    { name, href: `/araclar/${slug}` },
  ];
  const app = {
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: 0, priceCurrency: "TRY" },
    provider: { "@id": BUSINESS_ID },
  };
  return (
    <>
      <JsonLd data={graph(app, faqSchema(faqs, url), breadcrumbSchema(crumbs.slice(1)))} />
      <PageHero crumbs={crumbs.slice(1)} eyebrow="Ücretsiz araç" title={title} definition={definition} updatedAt={updatedAt} />
      <section className="container-page py-12">{children}</section>
      <section aria-labelledby="yontem" className="container-page py-12">
        <div className="prose-site">
          <h2 id="yontem">Hesaplama nasıl yapılıyor?</h2>
          {methodology}
        </div>
      </section>
      <Faq faqs={faqs} />
      <RelatedLinks groups={related} />
    </>
  );
}
