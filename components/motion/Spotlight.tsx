"use client";

import { useEffect, useRef } from "react";

/**
 * Üst öğe içinde imleci takip eden yumuşak ışık. React render'ı tetiklemez;
 * yalnızca CSS değişkenlerini günceller (paint-only, layout yok).
 */
export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
        el.style.opacity = "1";
      });
    };
    const leave = () => (el.style.opacity = "0");
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${className}`}
      style={{
        background:
          "radial-gradient(520px circle at var(--sx, 50%) var(--sy, 40%), color-mix(in srgb, var(--primary) 16%, transparent), transparent 65%)",
      }}
    />
  );
}
