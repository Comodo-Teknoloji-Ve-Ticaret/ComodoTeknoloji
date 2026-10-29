"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * LazyMotion + domAnimation: tam motion paketi yerine yalnızca animasyon,
 * varyant, hover/tap ve exit özellikleri yüklenir (daha küçük bundle).
 * reducedMotion="user": işletim sistemi "hareketi azalt" tercihinde transform
 * animasyonları kapanır, yalnızca opaklık geçişleri kalır.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
