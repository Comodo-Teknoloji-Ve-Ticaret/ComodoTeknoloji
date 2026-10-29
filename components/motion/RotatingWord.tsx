"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Satır sonunda dönen kelime. Kapsayıcı en uzun kelime genişliğinde sabittir
 * (görünmez kopyalar), bu yüzden dönüşlerde yerleşim kayması (CLS) olmaz.
 * Ekran okuyuculara sabit metin (srText) okunur.
 */
export function RotatingWord({ words, srText, interval = 2400, className }: { words: string[]; srText: string; interval?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <>
      <span className="sr-only">{srText}</span>
      <span aria-hidden className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
        {words.map((w) => (
          <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {w}
          </span>
        ))}
        <AnimatePresence initial={false}>
          <m.span
            key={words[i]}
            className="col-start-1 row-start-1 whitespace-nowrap"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[i]}
          </m.span>
        </AnimatePresence>
      </span>
    </>
  );
}
