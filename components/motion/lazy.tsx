"use client";

import dynamic from "next/dynamic";

/**
 * Ağır, tamamen dekoratif SVG animasyonları istemci tarafında tembel yüklenir.
 * Sayfanın metin içeriği bu bileşenlere bağlı değildir ve SSR'da kalır.
 * Yükleme sırasında yer tutucu aynı en-boy oranını korur (CLS ≈ 0).
 */
export const InteractiveNetworkLazy = dynamic(() => import("./InteractiveNetwork"), { ssr: false });

export const PtsAnimationLazy = dynamic(() => import("./PtsAnimation"), {
  ssr: false,
  loading: () => <div className="aspect-[800/360] w-full" />,
});

export const CctvCoverageLazy = dynamic(() => import("./CctvCoverage"), {
  ssr: false,
  loading: () => <div className="aspect-[600/400] w-full" />,
});
