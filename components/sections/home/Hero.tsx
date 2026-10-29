import { ArrowRight, CalendarCheck, MousePointer2, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { InteractiveNetworkLazy } from "@/components/motion/lazy";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { Spotlight } from "@/components/motion/Spotlight";
import { WordReveal } from "@/components/motion/WordReveal";
import { KomodoStageLazy } from "@/components/three/lazy";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const audiences = ["otelinize göre.", "kliniğinize göre.", "fabrikanıza göre.", "sitenize göre.", "mağazanıza göre.", "restoranınıza göre."];

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16 [@media(pointer:fine)]:select-none">
      {/* Fareli cihazlarda hero etkileşimlidir (sürükle/tıkla); sürüklerken metin seçilmesin */}
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -top-32 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-amber/10 blur-[110px]" />
      {/* Fareye tepki veren canlı ağ + imleç ışığı */}
      <div aria-hidden className="absolute inset-0">
        <InteractiveNetworkLazy />
      </div>
      <Spotlight />

      <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-24">
        <div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {site.name} · Antalya · 7/24 nöbette
          </p>

          {/* LCP öğesi: animasyonsuz, ilk karede görünür */}
          <h1 className="mt-6 text-[length:var(--text-h1)] leading-[1.05] xl:text-[3.9rem]">
            Antalya&apos;da <span className="text-gradient">web sitesi, güvenlik kamerası ve yazılım</span>: işletmenizin teknolojisi tek elden.
          </h1>

          <p className="mt-5 text-xl font-semibold sm:text-2xl">
            Hepsi tek ekipte, tam da{" "}
            <RotatingWord words={audiences} srText="işletmenize göre." className="text-accent" />
          </p>

          <WordReveal
            text="Web siteniz müşteriyi getirsin, kameralarınız olayı net kaydetsin, yazılımınız işinizi hızlandırsın. Antalya'da hepsini aynı ekip kurar, 7/24 izler ve büyütür."
            className="mt-4 max-w-xl text-lg text-muted"
          />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/cozumler/web-tasarim">
                  Web Sitesi Teklifi Al <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/ucretsiz-kesif">
                  <CalendarCheck /> Ücretsiz Keşif Planla
                </Link>
              </Button>
            </Magnetic>
          </div>

          {/* Güven şeridi */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            {site.googleRating && (
              <li className="flex items-center gap-2">
                <Star className="size-4 fill-amber text-amber" aria-hidden />
                <span>
                  <strong className="text-fg">{site.googleRating.value.toLocaleString("tr-TR")}</strong> Google puanı ({site.googleRating.count} yorum)
                </span>
              </li>
            )}
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" aria-hidden /> Gerçek proje portföyü
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" aria-hidden /> SEO + GEO altyapılı siteler
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" aria-hidden /> Antalya&apos;da yerinde destek
            </li>
          </ul>

          <p className="mt-6 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/80 lg:flex">
            <MousePointer2 className="size-3.5" aria-hidden /> Fareyi gezdirin, tıklayın, sürükleyin: ağ size tepki verir
          </p>
        </div>

        <KomodoStageLazy />
      </div>
    </section>
  );
}
