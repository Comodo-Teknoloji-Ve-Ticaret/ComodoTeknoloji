import { JsonLd } from "@/components/JsonLd";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Portfolio } from "@/components/sections/Portfolio";
import { portfolio } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph, portfolioSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projeler: Web Sitesi, Yazılım ve Altyapı",
  description: "Comodo Teknoloji projeleri: Antalya'daki işletmeler için web siteleri, e-ticaret, yapay zekâ ve IoT yazılımları, kamera ve network altyapı projeleri.",
  path: "/projeler",
});

export default function ProjectsPage() {
  const crumbs = [{ name: "Projeler", href: "/projeler" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), portfolioSchema(portfolio.filter((p) => !p.demo), absoluteUrl("/projeler")))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Vaka analizleri"
        title="Projelerimiz: web siteleri, yazılımlar ve altyapı"
        definition="Comodo Teknoloji projeleri; Antalya'daki işletmeler için tasarladığımız kurumsal web siteleri ve e-ticaret platformları, yapay zekâ ve IoT tabanlı yazılım ürünlerimiz ile kamera ve network altyapı projelerinin sorun, çözüm ve sonuç odaklı kayıtlarıdır."
      />
      <Portfolio />
      <CaseShowcase title="Altyapı vaka analizleri" />
      <CtaBand />
    </>
  );
}
