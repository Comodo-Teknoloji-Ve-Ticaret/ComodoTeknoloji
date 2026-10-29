import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/home/Stats";
import { WhyComodo } from "@/components/sections/home/WhyComodo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, TODO } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Hakkımızda: Antalya Teknoloji ve Güvenlik Firması",
  description: `${site.name}: Antalya merkezli entegre bilişim ve güvenlik sistemleri firması. Ekibimiz, sertifikalarımız ve çalışma prensiplerimiz.`,
  path: "/hakkimizda",
});

const principles = [
  { title: "Tek muhatap", text: "Kablodan yazılıma tüm katmanlar aynı ekibin sorumluluğunda. Arızada sorumluluk tartışması olmaz." },
  { title: "Yazılı teslim", text: "Her proje test raporu, ağ şeması, IP planı ve etiketli kabinetle teslim edilir." },
  { title: "Operasyona saygı", text: "Kurulumu sizin takviminize göre planlarız; sezon ve üretim durmaz." },
  { title: "Bağımsızlık", text: "Tüm şifre ve dokümantasyon sizde kalır; sistemi istediğiniz zaman başka bir ekip devralabilir." },
];

export default function AboutPage() {
  const crumbs = [{ name: "Hakkımızda", href: "/hakkimizda" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Hakkımızda"
        title={`${site.name}: Antalya'nın entegre bilişim ve güvenlik ekibi`}
        definition={`${site.name}, Antalya merkezli; otel, fabrika, AVM ve siteler için zayıf akım, kurumsal network, güvenlik kamerası, plaka tanıma, 5651 loglama ve siber güvenlik sistemlerini projelendiren, kuran ve 7/24 destekleyen bir sistem entegratörüdür.`}
      />
      <section className="container-page grid gap-12 py-20 lg:grid-cols-2">
        <div className="prose-site">
          <h2>Hikayemiz</h2>
          <p>{TODO}: Kuruluş yılı, kurucular, ilk projeler ve bugüne kadar gelinen nokta.</p>
          <h2>Ekibimiz ve sertifikalarımız</h2>
          <p>{TODO}: Mühendis sayısı, saha ekipleri, CCNA / NSE / üretici sertifikaları, yetkili bayilikler.</p>
          <h2>Ticari bilgiler</h2>
          <ul>
            <li>Ticari unvan: {site.legalName}</li>
            <li>Vergi dairesi / no: {TODO}</li>
            <li>MERSİS no: {TODO}</li>
            <li>Ticaret odası sicil no: {TODO}</li>
          </ul>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <WhyComodo />
      <Stats />
      <Process />
      <LogoMarquee />
      <CtaBand />
    </>
  );
}
