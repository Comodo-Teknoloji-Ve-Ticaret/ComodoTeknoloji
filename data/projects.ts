import type { Project } from "./types";

/**
 * VAKA ANALİZLERİ
 * Yalnızca gerçek, müşteri onaylı projeler ekleyin. Uydurma rakam veya yorum yazmayın.
 * Aşağıdaki şablon "draft" durumundadır; sitede listelenmez ve indekslenmez.
 * Kopyalayıp gerçek verilerle doldurun ve status'u "published" yapın.
 */
export const projects: Project[] = [
  {
    slug: "ornek-vaka-sablonu",
    status: "draft",
    title: "[DOLDURULACAK: Örn. 600 odalı resort otelde Wi-Fi yenileme]",
    client: "[DOLDURULACAK: Müşteri adı veya 'Belek'te 5 yıldızlı resort otel']",
    sector: "otel-ve-resort",
    region: "belek",
    summary: "[DOLDURULACAK: Tek cümlede sorun → çözüm → sonuç]",
    problem: "[DOLDURULACAK: Müşterinin yaşadığı sorun, ölçülebilir şekilde]",
    solution: "[DOLDURULACAK: Uygulanan çözüm, kullanılan ürünler]",
    scope: [
      { label: "Access point", value: "[DOLDURULACAK]" },
      { label: "Kablo metrajı", value: "[DOLDURULACAK]" },
      { label: "Switch / kabinet", value: "[DOLDURULACAK]" },
    ],
    duration: "[DOLDURULACAK]",
    results: [{ metric: "[DOLDURULACAK]", label: "[DOLDURULACAK: örn. Wi-Fi şikayetlerinde azalma]" }],
    gallery: [],
    solutions: ["kurumsal-network"],
    updatedAt: "2026-10-24",
  },
];

export const publishedProjects = () => projects.filter((p) => p.status === "published");
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
