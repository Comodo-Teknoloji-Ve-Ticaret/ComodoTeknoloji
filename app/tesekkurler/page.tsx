import { ConversionEvent } from "@/components/analytics/ConversionEvent";
import { LeadHandoff } from "@/components/forms/LeadHandoff";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Talebiniz alındı",
  description: "Talebiniz ekibimize ulaştı. 24 saat içinde dönüş yapıyoruz.",
  path: "/tesekkurler",
  noindex: true,
});

const nextSteps = [
  { title: "Talebiniz inceleniyor", text: "Bilgileriniz ilgili ekibimize iletiliyor." },
  { title: "Sizi arıyoruz", text: `${site.responseTimeText}; ihtiyacınızı netleştirip uygun keşif zamanını birlikte belirliyoruz.` },
  { title: "Keşif ve teklif", text: "İnceleme sonrası yazılı öneri ve kalem kalem teklif sunuyoruz." },
];

export default function ThanksPage() {
  return (
    <>
      <ConversionEvent />
      <section className="container-page py-20">
        <LeadHandoff />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-lg font-semibold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <CaseShowcase title="Bu arada, benzer projelerimize göz atın" />
    </>
  );
}
