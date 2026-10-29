"use client";

import dynamic from "next/dynamic";

/**
 * 3D sahne yalnızca istemcide yüklenir; three.js paketi ana sayfa ilk yükünden ayrı bir parçadır.
 * Yer tutucu aynı en-boy oranını korur (CLS ≈ 0).
 */
export const KomodoStageLazy = dynamic(() => import("./KomodoStage").then((m) => m.KomodoStage), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full rounded-3xl border border-border bg-surface/40" />,
});

/** Sayfa kenarında kaydırmayla aşağı koşan komodo (yalnızca istemci, ≥1280px) */
export const KomodoRunnerLazy = dynamic(() => import("./KomodoRunner").then((m) => m.KomodoRunner), { ssr: false });
