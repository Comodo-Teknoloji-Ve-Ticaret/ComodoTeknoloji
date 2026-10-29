import { Check } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { ZeroDowntime } from "@/components/sections/ZeroDowntime";
import { Button } from "@/components/ui/button";
import { slaPackages } from "@/data/home";
import { BUSINESS_ID, breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Bakım ve Destek: SLA Paketleri | Antalya",
  description: "Network, kamera ve 5651 sistemleriniz için 7/24 izleme, SLA'lı müdahale ve periyodik bakım paketleri. Sezon boyunca kesintisiz destek.",
  path: "/bakim-ve-destek",
});

const faqs = [
  { q: "SLA nedir?", a: "SLA (hizmet seviyesi sözleşmesi), arıza bildiriminden sonra ne kadar sürede müdahale edileceğini ve sistemin ne kadar sürede çalışır hale getirileceğini sözleşmeyle garanti eden anlaşmadır." },
  { q: "Başka firmanın kurduğu sistemi bakıma alıyor musunuz?", a: "Evet. Önce bir devralma denetimi yapıyor, dokümantasyonu ve şemaları çıkarıyor, ardından sistemi bakım kapsamına alıyoruz." },
  { q: "Bakım paketine yedek parça dahil mi?", a: "[DOLDURULACAK: yedek parça ve cihaz değişim politikası]" },
  { q: "Sözleşme süresi ne kadar?", a: "[DOLDURULACAK: sözleşme süreleri ve fesih koşulları]" },
];

export default function SupportPage() {
  const crumbs = [{ name: "Bakım ve Destek", href: "/bakim-ve-destek" }];
  const service = {
    "@type": "Service",
    "@id": `${absoluteUrl("/bakim-ve-destek")}#service`,
    name: "Bilişim sistemleri bakım ve destek hizmeti",
    serviceType: "SLA'lı bakım, 7/24 izleme ve teknik destek",
    provider: { "@id": BUSINESS_ID },
  };
  return (
    <>
      <JsonLd data={graph(service, faqSchema(faqs, absoluteUrl("/bakim-ve-destek")), breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Bakım ve Destek"
        title="Sistemleriniz 7/24 izlensin, arızayı misafiriniz değil biz fark edelim"
        definition="Bakım ve destek hizmetimiz; kurduğumuz veya devraldığımız network, kamera, plaka tanıma ve 5651 sistemlerinin merkezi olarak 7/24 izlenmesini, sözleşmeyle garanti edilen sürelerde uzaktan ve yerinde müdahaleyi, periyodik bakımları ve aylık durum raporlamasını kapsayan SLA'lı bir hizmettir."
      />
      <section aria-labelledby="paketler" className="container-page py-20">
        <h2 id="paketler" className="text-[length:var(--text-h2)]">
          SLA paketleri
        </h2>
        <Stagger className="mt-10 grid gap-4 lg:grid-cols-3">
          {slaPackages.map((p) => (
            <StaggerItem
              key={p.name}
              as="article"
              className={cn("flex flex-col rounded-3xl border bg-surface p-7", p.featured ? "border-gradient border-transparent shadow-[0_20px_60px_-30px_var(--primary)]" : "border-border")}
            >
              {p.featured && <p className="mb-3 w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-accent">Önerilen</p>}
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-surface-2/60 p-3">
                  <dt className="text-xs text-muted">Müdahale süresi</dt>
                  <dd className="mt-1 font-semibold">{p.response}</dd>
                </div>
                <div className="rounded-xl bg-surface-2/60 p-3">
                  <dt className="text-xs text-muted">Aylık ücret</dt>
                  <dd className="mt-1 font-semibold">{p.price}</dd>
                </div>
              </dl>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant={p.featured ? "primary" : "outline"}>
                <Link href="/iletisim">Teklif Al</Link>
              </Button>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <ZeroDowntime />
      <Faq faqs={faqs} />
      <CtaBand />
    </>
  );
}
