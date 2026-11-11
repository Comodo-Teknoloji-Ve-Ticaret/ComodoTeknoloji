import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/home/Stats";
import { WhyComodo } from "@/components/sections/home/WhyComodo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

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
          <h2>Yaklaşımımız</h2>
          <p>
            Antalya&apos;daki oteller, fabrikalar, konut siteleri ve büyüyen işletmeler için web sitesi, özel yazılım, kurumsal network, güvenlik kamerası, plaka tanıma, 5651 loglama ve siber güvenlik ihtiyaçlarını tek çatı altında topluyoruz. Farklı tedarikçiler arasındaki koordinasyon kaybını ortadan kaldırarak projelendirmeden 7/24 bakıma kadar uçtan uca sorumluluk üstleniyoruz.
          </p>
          <h2>Ekibimiz ve uzmanlık alanlarımız</h2>
          <p>
            Saha kurulum, ağ ve güvenlik mühendisliği ile yazılım ve dijital büyüme ekiplerimiz; keşif, standartlara uygun kablolama, Fluke sertifika testleri, merkezi ağ/güvenlik yönetimi ve güvenli web/yazılım geliştirme süreçlerini entegre biçimde yürütür.
          </p>
          <h2>Kurumsal bilgiler</h2>
          <ul>
            <li>Ticari unvan: {site.legalName}</li>
            <li>Adres: {fullAddress}</li>
            <li>Telefon: {site.phone}</li>
            <li>E-posta: {site.email}</li>
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
