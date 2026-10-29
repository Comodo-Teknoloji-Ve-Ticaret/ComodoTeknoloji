"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Kat planı üzerinde kamera görüş konileri açılır; kör noktalar önce kırmızı
 * yanıp söner, koniler tamamlanınca yeşile döner. Görünür olunca bir kez oynar.
 */
const cameras = [
  { x: 40, y: 40, rotate: 45, delay: 0.2 },
  { x: 560, y: 40, rotate: 135, delay: 0.5 },
  { x: 300, y: 210, rotate: -90, delay: 0.8 },
  { x: 40, y: 360, rotate: -45, delay: 1.1 },
  { x: 560, y: 360, rotate: -135, delay: 1.4 },
];

const blindSpots = [
  { x: 300, y: 70 },
  { x: 120, y: 210 },
  { x: 480, y: 210 },
  { x: 300, y: 340 },
];

// Kamera konumunda tepe noktası olan 70°'lik, 260 birim menzilli koni (sağa bakar)
const cone = "M0 0 L250 -175 A305 305 0 0 1 250 175 Z";

export default function CctvCoverage() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const play = inView || !!reduce;
  const fixedAt = 2.4;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 400"
      role="img"
      aria-label="Kat planı üzerinde güvenlik kamerası görüş alanı analizi: kör noktalar kamera konileriyle kapatılıyor."
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="cone-fill" cx="0" cy="0.5" r="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.38" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04" />
        </radialGradient>
        <clipPath id="plan-clip">
          <rect x="20" y="20" width="560" height="360" rx="8" />
        </clipPath>
      </defs>

      {/* Kat planı */}
      <rect x="20" y="20" width="560" height="360" rx="8" fill="var(--surface)" stroke="var(--muted)" strokeWidth="2" />
      <g stroke="var(--border)" strokeWidth="2" fill="none">
        <path d="M220 20 V150 M380 20 V150 M20 270 H200 M400 270 H580 M220 150 H260 M340 150 H380" />
        <path d="M200 270 V380 M400 270 V380" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)">
        <text x="40" y="140">LOBİ</text>
        <text x="236" y="40">RESEPSİYON</text>
        <text x="400" y="140">RESTORAN</text>
        <text x="40" y="300">OTOPARK</text>
        <text x="420" y="300">DEPO</text>
        <text x="236" y="300">KORİDOR</text>
      </g>

      <g clipPath="url(#plan-clip)">
        {cameras.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rotate})`}>
            <m.path
              d={cone}
              fill="url(#cone-fill)"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              initial={{ scale: reduce ? 1 : 0, opacity: 0 }}
              animate={play ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.9, delay: reduce ? 0 : c.delay, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "0px 0px", transformBox: "view-box" }}
            />
          </g>
        ))}
      </g>

      {cameras.map((c, i) => (
        <g key={`cam-${i}`} transform={`translate(${c.x} ${c.y})`}>
          <circle r="9" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <circle r="3.5" fill="var(--accent)" />
        </g>
      ))}

      {blindSpots.map((b, i) => (
        <g key={`b-${i}`} transform={`translate(${b.x} ${b.y})`}>
          {/* Kırmızı (kör nokta) → yeşil (kapsandı) */}
          <m.circle
            r="11"
            fill="var(--danger)"
            initial={{ opacity: reduce ? 0 : 1 }}
            animate={play && !reduce ? { opacity: [1, 0.25, 1, 0.25, 1, 0] } : undefined}
            transition={{ duration: fixedAt, times: [0, 0.2, 0.4, 0.6, 0.85, 1] }}
          />
          <m.circle
            r="11"
            fill="var(--success)"
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
            animate={play ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: reduce ? 0 : fixedAt }}
          />
          <m.path
            d="M-4.5 0 L-1.2 3.5 L5 -3.5"
            stroke="#032d17"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={play ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.4, delay: reduce ? 0 : fixedAt + 0.2 }}
          />
        </g>
      ))}
    </svg>
  );
}
