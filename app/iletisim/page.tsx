import { JsonLd } from "@/components/JsonLd";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { QuickContact } from "@/components/sections/QuickContact";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "İletişim: Antalya Kamera, Web Sitesi ve Yazılım",
  description: `${site.name} iletişim: ${site.phone} · WhatsApp · ${site.email}. Antalya ve tüm ilçelerde yerinde keşif ve destek.`,
  path: "/iletisim",
});

export default function ContactPage() {
  const crumbs = [{ name: "İletişim", href: "/iletisim" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="İletişim"
        title="Hemen arayın veya WhatsApp'tan yazın"
        definition={`${site.name}: ${fullAddress}. ${site.openingHoursText}. Antalya merkez ve tüm ilçelerde yerinde keşif ve teknik destek.`}
      >
        <QuickContact location="iletisim_hero" className="max-w-md" />
      </PageHero>
      <ContactBlock source="iletisim" />
    </>
  );
}
