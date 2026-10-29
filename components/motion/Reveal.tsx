"use client";

import { m, useReducedMotion } from "motion/react";
import { fadeIn, fadeUp, safeVariants, scaleIn, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/lib/motion";

const variantMap = { fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight };
export type RevealVariant = keyof typeof variantMap;

type Tag = "div" | "section" | "li" | "ul" | "ol" | "article" | "p" | "span";

/** Görünür olunca bir kez oynayan giriş animasyonu. İçerik SSR HTML'inde kalır. */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp
      data-reveal
      className={className}
      variants={safeVariants(variantMap[variant], reduce)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
}) {
  const Comp = m[as];
  return (
    <Comp data-reveal className={className} variants={staggerContainer(stagger)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp data-reveal className={className} variants={safeVariants(variantMap[variant], reduce)}>
      {children}
    </Comp>
  );
}
