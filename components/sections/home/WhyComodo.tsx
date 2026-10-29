import { Eye, MapPinned, Radar, Shield } from "lucide-react";
import Link from "next/link";
import { ComodoLogo } from "@/components/brand/ComodoLogo";
import { PointerTilt } from "@/components/motion/PointerTilt";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const traits = [
  {
    Icon: Radar,
    trait: "Sabırlı avcı",
    title: "Müşteriyi bulan web sitesi",
    text: "SEO, GEO ve yerel reklamla; sizi arayan müşteri Google'da ve yapay zekâ aramalarında rakibi değil sizi bulur.",
    href: "/cozumler/web-tasarim",
  },
  {
    Icon: Eye,
    trait: "Keskin gözler",
    title: "Kör nokta bırakmayan kameralar",
    text: "Her kamerayı DORI hesabıyla konumlandırıyor, kat planı üzerinde kör noktaları sıfırlıyoruz.",
    href: "/cozumler/guvenlik-kameralari",
  },
  {
    Icon: Shield,
    trait: "Kalın zırh",
    title: "Katmanlı siber güvenlik",
    text: "EDR, yönetilen firewall, ayrılmış VLAN'lar ve 3-2-1 yedekleme ile çok katmanlı koruma.",
    href: "/cozumler/siber-guvenlik",
  },
  {
    Icon: MapPinned,
    trait: "Bölgesine hâkim",
    title: "Antalya'nın her ilçesinde",
    text: "Belek'ten Kaş'a, Alanya'dan Kepez'e; bölgenin işletme profilini ve sezon takvimini biliyoruz.",
    href: "/bolgeler/belek",
  },
];

export function WhyComodo() {
  return (
    <section aria-labelledby="neden-comodo" className="relative overflow-hidden py-24">
      <div aria-hidden className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.07] blur-3xl" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Neden Comodo?</p>
          <h2 id="neden-comodo" className="mt-3 text-[length:var(--text-h2)]">
            Adımızı dünyanın en dikkatli bekçisinden aldık
          </h2>
          <p className="mt-4 text-lg text-muted">
            Komodo ejderi bölgesini tanır, sabırla izler ve hiçbir hareketi kaçırmaz. Sizin altyapınıza da aynı dikkatle bakıyoruz.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <Stagger className="grid gap-4" stagger={0.1}>
            {traits.slice(0, 2).map((t) => (
              <StaggerItem key={t.trait} variant="slideInLeft">
                <TraitCard {...t} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal variant="scaleIn" className="relative mx-auto w-56 sm:w-72">
            {/* Dönen nişangâh halkaları */}
            <svg aria-hidden viewBox="0 0 200 200" className="absolute -inset-6 size-[calc(100%+3rem)] animate-[spin_40s_linear_infinite]">
              <circle cx="100" cy="100" r="96" fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.6" />
            </svg>
            <svg aria-hidden viewBox="0 0 200 200" className="absolute -inset-2 size-[calc(100%+1rem)] animate-[spin_18s_linear_infinite_reverse]">
              <path d="M100 6 A94 94 0 0 1 194 100" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M100 194 A94 94 0 0 1 6 100" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <PointerTilt>
              <ComodoLogo fluid className="w-full drop-shadow-[0_0_48px_rgba(247,147,30,0.35)]" />
            </PointerTilt>
          </Reveal>
          <Stagger className="grid gap-4" stagger={0.1}>
            {traits.slice(2).map((t) => (
              <StaggerItem key={t.trait} variant="slideInRight">
                <TraitCard {...t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function TraitCard({ Icon, trait, title, text, href }: (typeof traits)[number]) {
  return (
    <Link href={href} className="group block rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur transition-colors hover:border-amber/50">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
        <Icon className="size-4" aria-hidden /> {trait}
      </p>
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{text}</p>
    </Link>
  );
}
