"use client";

import { m, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/** Metni kelime kelime belirtir. LCP öğesi için KULLANMAYIN (yalnızca alt satırlar). */
export function WordReveal({ text, className, delay = 0.15 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <m.span
            key={`${w}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: delay + i * 0.045 }}
          >
            {w}
            {i < words.length - 1 && " "}
          </m.span>
        ))}
      </span>
    </p>
  );
}
