"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * PTS senaryosu: araç yaklaşır → kamera plakayı tarar → karakterler tek tek belirir
 * → "YETKİLİ" rozeti → bariyer kalkar → araç geçer. Saf SVG + motion, döngüsel.
 * Ekran dışındayken durur; hareket azaltma tercihinde son kare statik gösterilir.
 */
const PLATE = "07 ABC 123";
// faz süreleri (ms): 0 bekle, 1 yaklaş, 2 tara, 3 oku, 4 yetkili, 5 bariyer, 6 geç
const durations = [600, 1700, 1300, 1100, 900, 1100, 1800];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PtsAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) {
      setPhase(5);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce]);

  const carX = phase === 0 ? -360 : phase >= 6 ? 760 : 0;
  const chars = PLATE.split("");

  return (
    <svg
      ref={ref}
      viewBox="0 0 800 360"
      role="img"
      aria-label="Plaka tanıma sistemi animasyonu: araç bariyere yaklaşıyor, kamera plakayı okuyor, yetkili araç için bariyer otomatik açılıyor."
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="pts-beam" x1="1" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="plate-clip">
          <rect x="70" y="72" width="240" height="46" rx="6" />
        </clipPath>
      </defs>

      {/* Zemin ve şerit */}
      <line x1="0" y1="300" x2="800" y2="300" stroke="var(--border)" strokeWidth="2" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 90 + 10} y="318" width="46" height="4" rx="2" fill="var(--border)" />
      ))}

      {/* Kamera direği ve kamera */}
      <line x1="600" y1="300" x2="600" y2="70" stroke="var(--muted)" strokeWidth="5" strokeLinecap="round" />
      <line x1="600" y1="78" x2="560" y2="78" stroke="var(--muted)" strokeWidth="4" strokeLinecap="round" />
      <g transform="rotate(18 545 86)">
        <rect x="508" y="74" width="62" height="24" rx="6" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="512" cy="86" r="6" fill="var(--accent)" />
      </g>

      {/* IR tarama ışını */}
      <m.polygon
        points="512,92 360,290 470,290"
        fill="url(#pts-beam)"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 && phase <= 4 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Araç */}
      <m.g initial={false} animate={{ x: carX }} transition={{ duration: phase === 0 ? 0 : phase >= 6 ? 1.4 : 1.6, ease }}>
        <path
          d="M180 280 L180 240 Q182 228 196 226 L250 222 L292 186 Q300 180 312 180 L372 180 Q386 180 394 192 L418 226 Q440 230 444 244 L444 280 Z"
          fill="var(--surface-2)"
          stroke="var(--primary)"
          strokeWidth="2"
        />
        <path d="M262 222 L298 192 L338 192 L338 222 Z" fill="var(--bg)" opacity="0.8" />
        <path d="M346 222 L346 192 L376 192 L398 222 Z" fill="var(--bg)" opacity="0.8" />
        <rect x="430" y="248" width="14" height="10" rx="2" fill="var(--amber)" />
        <rect x="418" y="262" width="24" height="10" rx="1.5" fill="#fff" stroke="#1d4ed8" strokeWidth="1" />
        <circle cx="228" cy="282" r="20" fill="var(--bg)" stroke="var(--muted)" strokeWidth="5" />
        <circle cx="398" cy="282" r="20" fill="var(--bg)" stroke="var(--muted)" strokeWidth="5" />
      </m.g>

      {/* Bariyer */}
      <rect x="708" y="200" width="26" height="100" rx="4" fill="var(--surface-2)" stroke="var(--muted)" strokeWidth="1.5" />
      <m.g
        initial={false}
        animate={{ rotate: phase >= 5 ? 80 : 0 }}
        transition={{ duration: 0.9, ease }}
        style={{ transformOrigin: "720px 212px", transformBox: "view-box" }}
      >
        <rect x="470" y="206" width="252" height="12" rx="6" fill="var(--fg)" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={482 + i * 40} y="206" width="18" height="12" fill="var(--danger)" />
        ))}
      </m.g>
      <circle cx="721" cy="190" r="6" fill="#f04438" />
      <m.circle cx="721" cy="190" r="6" fill="#17b26a" initial={false} animate={{ opacity: phase >= 4 && phase <= 6 ? 1 : 0 }} />

      {/* Kamera görüntüsü (HUD) */}
      <g>
        <rect x="40" y="24" width="300" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <text x="58" y="52" fontSize="11" fontFamily="var(--font-mono)" fill="var(--muted)" letterSpacing="1.5">
          ANPR · ŞERİT 1
        </text>
        <m.circle cx="318" cy="48" r="4" fill="var(--danger)" animate={reduce ? undefined : { opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <rect x="70" y="72" width="240" height="46" rx="6" fill="#f8fafc" stroke="#1e3a8a" strokeWidth="2" />
        <rect x="70" y="72" width="18" height="46" rx="3" fill="#1d4ed8" />
        <text x="79" y="100" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">TR</text>
        <g clipPath="url(#plate-clip)">
          {chars.map((c, i) => (
            <m.text
              key={i}
              x={102 + i * 20.5}
              y="104"
              fontSize="26"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="#141210"
              initial={false}
              animate={{ opacity: phase >= 3 && phase <= 6 ? 1 : 0, y: phase >= 3 && phase <= 6 ? 0 : 6 }}
              transition={{ duration: 0.25, delay: phase === 3 ? i * 0.08 : 0 }}
            >
              {c}
            </m.text>
          ))}
          <AnimatePresence>
            {phase === 2 && (
              <m.rect
                key="scan"
                x="70"
                width="240"
                height="3"
                fill="var(--accent)"
                initial={{ y: 72, opacity: 0 }}
                animate={{ y: [72, 115, 72, 115], opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </g>
        <text x="58" y="148" fontSize="11" fontFamily="var(--font-mono)" fill="var(--muted)">
          {phase >= 3 && phase <= 6 ? "Okundu · Beyaz listede" : phase === 2 ? "Taranıyor…" : "Araç bekleniyor"}
        </text>
        <AnimatePresence>
          {phase >= 4 && phase <= 6 && (
            <m.g key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ transformOrigin: "270px 144px", transformBox: "view-box" }}>
              <rect x="226" y="132" width="96" height="24" rx="12" fill="#17b26a" />
              <text x="274" y="149" fontSize="12" fontWeight="700" fill="#032d17" textAnchor="middle" letterSpacing="1">
                YETKİLİ
              </text>
            </m.g>
          )}
        </AnimatePresence>
      </g>
    </svg>
  );
}
