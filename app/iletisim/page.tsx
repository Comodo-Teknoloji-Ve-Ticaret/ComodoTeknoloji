import { JsonLd } from "@/components/JsonLd";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "İletişim: Antalya Kamera, Web Sitesi ve Yazılım",
  description: `${site.name} iletişim: ${site.phone} · ${site.email}. Antalya ve tüm ilçelerde yerinde keşif ve destek.`,
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
        title="Bize ulaşın"
        definition={`${site.name}; ${fullAddress} adresinde, ${site.openingHoursText} hizmet verir. Telefon: ${site.phone}, e-posta: ${site.email}. Antalya merkez ve tüm ilçelerde yerinde keşif ve teknik destek sağlıyoruz.`}
      />
      <ContactBlock source="iletisim" />
    </>
  );
}
