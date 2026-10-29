import { IntroCurtain } from "@/components/brand/IntroCurtain";
import { JsonLd } from "@/components/JsonLd";
import { KomodoRunnerLazy } from "@/components/three/lazy";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/home/Hero";
import { SectorCards } from "@/components/sections/home/SectorCards";
import { SolutionsGrid } from "@/components/sections/home/SolutionsGrid";
import { Stats } from "@/components/sections/home/Stats";
import { ToolPreview } from "@/components/sections/home/ToolPreview";
import { WhyComodo } from "@/components/sections/home/WhyComodo";
import { DigitalGrowth } from "@/components/sections/home/DigitalGrowth";
import { ScrollStory } from "@/components/sections/home/ScrollStory";
import { Portfolio } from "@/components/sections/Portfolio";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Objections } from "@/components/sections/Objections";
import { Process } from "@/components/sections/Process";
import { homeFaqs, homeObjections } from "@/data/home";
import { faqSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  // Kök sayfada layout'taki title şablonu uygulanmaz; marka adı burada açıkça yazılır
  title: `${site.shortName} | Antalya Web Sitesi, Kamera, Yazılım`,
  description:
    "Antalya'da web sitesi, güvenlik kamerası, yazılım, network altyapısı, işletme reklamı ve bilişim danışmanlığı. Ücretsiz keşif: 0507 850 52 87",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaqs, `${site.url}/`))} />
      <IntroCurtain />
      <KomodoRunnerLazy />
      <Hero />
      <LogoMarquee />
      <Stats />
      <ScrollStory />
      <DigitalGrowth />
      <Portfolio limit={6} showSoftware={false} />
      <SolutionsGrid />
      <WhyComodo />
      <SectorCards />
      <ToolPreview />
      <CaseShowcase />
      <Process />
      <Objections items={homeObjections} />
      <Faq faqs={homeFaqs} />
      <CtaBand />
      <ContactBlock />
    </>
  );
}
