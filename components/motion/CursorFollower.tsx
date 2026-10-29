"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";
const TEXT_INPUT = "input, textarea, select, [contenteditable='true']";
const SIZE = 84;

/**
 * İmleci yumuşakça takip eden halka + nokta (yalnızca fare kullanan masaüstü cihazlarda).
 * Bağlantı ve butonlarda büyür; data-cursor="Sürükle" gibi bir etiket taşıyan öğelerde
 * halkanın içinde etiket gösterir. Yerel imleç gizlenmez (erişilebilirlik).
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [overText, setOverText] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      const text = el.closest(TEXT_INPUT);
      const target = text ? null : el.closest(INTERACTIVE);
      setOverText(!!text);
      setHover(!!target);
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const hide = () => setVisible(false);
    const pDown = () => setDown(true);
    const pUp = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", pDown, { passive: true });
    window.addEventListener("pointerup", pUp, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", pDown);
      window.removeEventListener("pointerup", pUp);
      window.removeEventListener("blur", hide);
    };
  }, [x, y]);

  if (!enabled) return null;

  const target = label ? SIZE : hover ? 46 : 28;
  const show = visible && !overText;

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300]"
        style={{ x: rx, y: ry, width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }}
      >
        <m.div
          className="grid size-full place-items-center rounded-full border border-accent/70 bg-accent/[0.06]"
          initial={false}
          animate={{ scale: (target / SIZE) * (down ? 0.82 : 1), opacity: show ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          {label && <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">{label}</span>}
        </m.div>
      </m.div>
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-accent"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: show && !label ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
