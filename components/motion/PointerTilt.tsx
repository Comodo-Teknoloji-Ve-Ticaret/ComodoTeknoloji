"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

/** İmlecin sayfadaki konumuna göre içeriği 3B olarak hafifçe eğer (yalnızca transform) */
export function PointerTilt({ children, max = 14, className }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  useEffect(() => {
    if (reduce || !matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ry.set(Math.max(-1, Math.min(1, dx * 2)) * max);
      rx.set(Math.max(-1, Math.min(1, -dy * 2)) * max);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, max, rx, ry]);

  return (
    <div ref={ref} className={`[perspective:900px] ${className ?? ""}`}>
      <m.div style={{ rotateX: srx, rotateY: sry }}>{children}</m.div>
    </div>
  );
}
