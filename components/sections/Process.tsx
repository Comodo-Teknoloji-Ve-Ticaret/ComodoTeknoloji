import { ScrollSteps } from "@/components/motion/ScrollSteps";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { processSteps } from "@/data/home";

export function Process({ steps = processSteps, title = "Keşiften 7/24 desteğe, altı adımda" }: { steps?: { title: string; text: string }[]; title?: string }) {
  return (
    <section aria-labelledby="surec" className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="surec"
            eyebrow="Çalışma süreci"
            title={title}
            lead="Her adımın çıktısı yazılıdır: keşif raporu, proje çizimi, test sonuçları ve teslim dokümantasyonu."
          />
        </div>
        <ScrollSteps steps={steps} />
      </div>
    </section>
  );
}
