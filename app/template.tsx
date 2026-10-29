"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Sayfa geçişlerinde yumuşak fade. İlk yüklemede animasyon YOK (LCP ilk karede görünür);
 * yalnızca istemci tarafı gezinmelerde oynar.
 *
 * Bayrak yalnızca tarayıcıda ve commit sonrasında (useEffect) işaretlenir:
 * - Sunucuda (SSG) hiçbir sayfa opaklık 0 ile üretilmez
 * - Hidrasyon sırasında çift render olsa bile sunucu çıktısıyla aynı kalır
 */
let hydrated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
  return (
    <m.div initial={animate ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
