"use client";

import { ArrowRight, Eye, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    verb: "Bulunun",
    Icon: Search,
    title: "Sizi arayan müşteri rakibinizi değil, sizi bulsun.",
    text: "Hızlı, güvenli ve mobil uyumlu web sitenizi Google'a ve ChatGPT gibi yapay zekâ asistanlarına hazır kuruyoruz. Google İşletme Profilinizle haritada da öne çıkıyorsunuz.",
    chips: ["Kurumsal web sitesi", "E-ticaret", "SEO", "GEO"],
    href: "/cozumler/web-tasarim",
    cta: "Web sitesi ve SEO",
  },
  {
    verb: "Görün",
    Icon: Eye,
    title: "Olay olduğunda “kim, ne zaman?” sorusunun net bir cevabı olsun.",
    text: "Kameralarınızı DORI hesabıyla konumlandırıyor, girişlerde yüzü ve plakayı okunur kılıyoruz. Kayıtlarınız 30, 60 veya 90 gün güvende; işletmenizi telefonunuzdan canlı izliyorsunuz.",
    chips: ["IP kamera", "Termal kamera", "Plaka tanıma", "Uzaktan izleme"],
    href: "/cozumler/guvenlik-kameralari",
    cta: "Güvenlik kamerası çözümleri",
  },
  {
    verb: "Korunun",
    Icon: ShieldCheck,
    title: "Ağınız çökmesin, verileriniz kilitlenmesin, denetimde eliniz rahat olsun.",
    text: "Fiber omurgadan Wi-Fi'ye, firewall'dan uç nokta güvenliğine kadar altyapınızı kuruyor ve 7/24 izliyoruz. 5651 loglarınız zaman damgalı, yedekleriniz ağdan ayrı tutuluyor.",
    chips: ["Wi-Fi 6/7", "Firewall", "EDR", "5651 loglama"],
    href: "/cozumler/kurumsal-network",
    cta: "Network ve güvenlik altyapısı",
  },
  {
    verb: "Büyüyün",
    Icon: TrendingUp,
    title: "Elle yapılan işler azalsın, reklam bütçesi ölçülsün, kararlar veriye dayansın.",
    text: "İşinize özel yazılımlar, yapay zekâ destekli analizler ve dönüşüm takipli reklamlarla büyümeyi ölçülebilir hâle getiriyoruz. Yatırım öncesinde de danışmanlıkla yanınızdayız.",
    chips: ["Özel yazılım", "Mobil uygulama", "Google Ads", "Danışmanlık"],
    href: "/cozumler/yazilim",
    cta: "Yazılım ve dijital büyüme",
  },
];

/** Dairesel "radar" görseli: ortada adım ikonu, dönen tarama, etrafında anahtar kelimeler */
function Radar({ index, reduce }: { index: number; reduce: boolean }) {
  const step = steps[index];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {[1, 0.74, 0.48].map((s) => (
        <div key={s} className="absolute inset-0 m-auto rounded-full border border-border" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
      ))}
      {/* Dönen tarama */}
      <m.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_78%,color-mix(in_srgb,var(--primary)_45%,transparent)_100%)]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Büyük adım numarası */}
      <AnimatePresence mode="popLayout">
        <m.span
          key={`n-${index}`}
          aria-hidden
          className="absolute inset-0 grid place-items-center font-mono text-[11rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--border)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.5 }}
        >
          0{index + 1}
        </m.span>
      </AnimatePresence>
      {/* Merkez ikon */}
      <AnimatePresence mode="wait">
        <m.div
          key={`i-${index}`}
          className="absolute inset-0 m-auto grid size-28 place-items-center rounded-full bg-primary text-primary-fg shadow-[0_0_80px_-10px_var(--primary)]"
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <step.Icon className="size-12" aria-hidden />
        </m.div>
      </AnimatePresence>
      {/* Yörüngedeki anahtar kelimeler */}
      <AnimatePresence>
        {step.chips.map((c, i) => {
          const angle = (i / step.chips.length) * Math.PI * 2 - Math.PI / 2 + 0.4;
          const r = 41;
          return (
            <m.span
              key={`${index}-${c}`}
              aria-hidden
              className="glass absolute whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ left: `${50 + Math.cos(angle) * r}%`, top: `${50 + Math.sin(angle) * r}%`, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300, damping: 22 }}
            >
              {c}
            </m.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/**
 * Kaydırma hikâyesi: Bulunun → Görün → Korunun → Büyüyün (web → kamera → altyapı → büyüme).
 * Masaüstünde bölüm 4 ekran boyu uzunluğundadır; içerik yapışkan kalır ve kaydırma ilerledikçe adım değişir.
 * Mobilde adımlar alt alta sıralanır. Tüm adımların metni her zaman HTML'dedir.
 */
export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))));

  return (
    <section aria-labelledby="hikaye" className="relative">
      <div ref={ref} className="lg:h-[400vh]">
        <div className="container-page py-20 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:py-0">
          <div className="mb-10 lg:mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Ne yapıyoruz?</p>
            <h2 id="hikaye" className="mt-3 text-[length:var(--text-h2)]">
              Bulunun. Görün. Korunun. <span className="text-gradient">Büyüyün.</span>
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              {/* Adım göstergesi (masaüstü) */}
              <div className="mb-8 hidden items-center gap-3 lg:flex" aria-hidden>
                {steps.map((s, i) => (
                  <span key={s.verb} className={cn("font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500", i === active ? "text-accent" : "text-muted/50")}>
                    {s.verb}
                  </span>
                ))}
              </div>
              <div className="mb-8 hidden h-px w-full overflow-hidden bg-border lg:block" aria-hidden>
                <m.div className="h-full origin-left bg-gradient-to-r from-primary to-accent" style={{ scaleX: progress }} />
              </div>

              {/* Adımlar: masaüstünde üst üste, aktif olan görünür; mobilde alt alta */}
              <ol className="relative grid gap-10 lg:gap-0">
                {steps.map((s, i) => (
                  <li
                    key={s.verb}
                    className={cn(
                      "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:col-start-1 lg:row-start-1",
                      i === active ? "lg:translate-y-0 lg:opacity-100" : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0",
                    )}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <p className="flex items-center gap-3 font-mono text-sm text-accent">
                      <s.Icon className="size-5 lg:hidden" aria-hidden />
                      0{i + 1} — {s.verb}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-[2rem]">{s.title}</h3>
                    <p className="mt-4 max-w-xl text-lg text-muted">{s.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2 lg:hidden">
                      {s.chips.map((c) => (
                        <li key={c} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                    <Link href={s.href} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline">
                      {s.cta} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hidden lg:block">
              <Radar index={active} reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
