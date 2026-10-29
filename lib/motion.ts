import type { Transition, Variants } from "motion/react";

/** Ortak easing: hızlı çıkış, yumuşak iniş */
export const ease = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.6, ease };

/** Görünür olunca bir kez oynat, ekranın %20'si göründüğünde tetikle */
export const viewportOnce = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Hareket azaltma tercihinde kullanılacak, yalnızca opaklık geçişi */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** Tercih açıksa verilen varyantı opaklık geçişine düşürür */
export function safeVariants(variants: Variants, reduce: boolean | null): Variants {
  return reduce ? reducedFade : variants;
}
