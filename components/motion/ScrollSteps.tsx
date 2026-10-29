"use client";

import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll'a bağlı ilerleyen süreç çizgisi. Çizgi scaleY ile büyür (transform → CLS yok),
 * ilerleme her adımın eşiğini geçtikçe adım ikonu aktifleşir.
 * Adımlar düz HTML <ol> olarak render edilir (HowTo benzeri anlatım botlarca okunur).
 */
export function ScrollSteps({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15) - 0));
  });

  return (
    <ol ref={ref} className="relative ml-4 space-y-10 sm:ml-6">
      <span aria-hidden className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-border" />
      <m.span
        aria-hidden
        className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary to-accent"
        style={{ scaleY }}
      />
      {steps.map((s, i) => {
        const on = i <= active;
        return (
          <li key={s.title} className="relative pl-10">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[15px] top-0 grid size-[30px] place-items-center rounded-full border font-mono text-xs transition-all duration-500",
                on ? "scale-110 border-accent bg-accent text-black shadow-[0_0_24px_-2px_var(--accent)]" : "border-border bg-surface text-muted",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={cn("text-lg font-semibold transition-colors duration-500 sm:text-xl", on ? "text-fg" : "text-muted")}>{s.title}</h3>
            <p className="mt-1.5 text-muted">{s.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
