import "server-only";
import { homeFaqs } from "@/data/home";
import { publishedProducts } from "@/data/products";
import { publishedProjects } from "@/data/projects";
import { regions } from "@/data/regions";
import { sectors } from "@/data/sectors";
import { solutions } from "@/data/solutions";
import type { DataTableT, Faq } from "@/data/types";
import { getSources, solutionSources } from "@/data/sources";
import { publishedPosts } from "./content";
import { tools } from "./nav";
import { absoluteUrl, fullAddress, serviceAreas, site } from "./site";

const intro = () => `# ${site.name}

> ${site.description} Hizmet bölgesi: Antalya ve tüm ilçeleri (${serviceAreas.map((a) => a.name).join(", ")}).

- Adres: ${fullAddress}, Türkiye
- Telefon: ${site.phone}
- E-posta: ${site.email}
- Çalışma saatleri: ${site.openingHoursText}
- Web: ${site.url}
`;

const contact = () => `## İletişim

- [Ücretsiz Keşif Randevusu](${absoluteUrl("/ucretsiz-kesif")}): Sahada ücretsiz altyapı incelemesi ve yazılı rapor
- [İletişim](${absoluteUrl("/iletisim")}): ${site.phone} · ${site.email}
- [Bakım ve Destek](${absoluteUrl("/bakim-ve-destek")}): SLA'lı 7/24 izleme ve destek paketleri
`;

/** /llms.txt — kısa, bağlantılı özet (llmstxt.org biçimi) */
export function buildLlmsTxt() {
  const sections = [
    intro(),
    `## Çözümler\n\n${solutions.map((s) => `- [${s.h1}](${absoluteUrl(`/cozumler/${s.slug}`)}): ${s.excerpt}`).join("\n")}\n`,
    `## Sektörler\n\n${sectors.map((s) => `- [${s.name}](${absoluteUrl(`/sektorler/${s.slug}`)}): ${s.excerpt}`).join("\n")}\n`,
    `## Bölgeler\n\n${regions.map((r) => `- [${r.name}](${absoluteUrl(`/bolgeler/${r.slug}`)}): ${r.metaDescription}`).join("\n")}\n`,
  ];
  const products = publishedProducts();
  if (products.length) sections.push(`## Ürünler\n\n${products.map((p) => `- [${p.name}](${absoluteUrl(`/urunler/${p.slug}`)}): ${p.oneLiner}`).join("\n")}\n`);
  sections.push(`## Araçlar\n\n${tools.map((t) => `- [${t.name}](${absoluteUrl(`/araclar/${t.slug}`)}): ${t.short}`).join("\n")}\n`);
  const projects = publishedProjects();
  if (projects.length) sections.push(`## Vaka Analizleri\n\n${projects.map((p) => `- [${p.title}](${absoluteUrl(`/projeler/${p.slug}`)}): ${p.summary}`).join("\n")}\n`);
  const posts = publishedPosts();
  if (posts.length) sections.push(`## Rehberler\n\n${posts.map((p) => `- [${p.title}](${absoluteUrl(`/bilgi-bankasi/${p.slug}`)}): ${p.description}`).join("\n")}\n`);
  sections.push(contact());
  sections.push(`## Optional\n\n- [Tüm içerik (llms-full.txt)](${absoluteUrl("/llms-full.txt")}): Çözüm, ürün, SSS ve rehber içeriklerinin tamamı\n`);
  return sections.join("\n");
}

const table = (t: DataTableT) =>
  `${t.caption}\n\n| ${t.head.join(" | ")} |\n| ${t.head.map(() => "---").join(" | ")} |\n${t.rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}\n`;

const faqs = (list: Faq[]) => list.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");

const refs = (ids: readonly string[] = []) => {
  const list = getSources(ids);
  if (!list.length) return "";
  return `### Kaynaklar\n\n${list.map((r, i) => `${i + 1}. ${r.url ? `[${r.title}](${r.url})` : r.title} — ${r.publisher}${r.year ? `, ${r.year}` : ""}`).join("\n")}\n`;
};

/** /llms-full.txt — build sırasında tüm veri ve MDX dosyalarından birleştirilen tam içerik */
export function buildLlmsFullTxt() {
  const parts: string[] = [intro()];

  for (const s of solutions) {
    parts.push(`---\n\n## ${s.h1}\n\nKaynak: ${absoluteUrl(`/cozumler/${s.slug}`)} · Son güncelleme: ${s.updatedAt}\n\n${s.definition}\n`);
    parts.push(`### Kimin için?\n\n${s.audience.map((a) => `- ${a}`).join("\n")}\n`);
    parts.push(`### Hangi sorunu çözer?\n\n${s.problems.map((p) => `- **${p.title}:** ${p.text}`).join("\n")}\n`);
    for (const q of s.sections) {
      parts.push(`### ${q.h2}\n\n${q.answer}${q.body ? `\n\n${q.body}` : ""}${q.bullets ? `\n\n${q.bullets.map((b) => `- ${b}`).join("\n")}` : ""}${q.table ? `\n\n${table(q.table)}` : ""}\n`);
    }
    if (s.process) parts.push(`### ${s.process.title}\n\n${s.process.steps.map((x, i) => `${i + 1}. **${x.title}:** ${x.text}`).join("\n")}\n`);
    parts.push(`### Karşılaştırma\n\n${table(s.comparison)}`);
    parts.push(`### Fiyatı belirleyen unsurlar\n\n${table(s.priceFactors)}`);
    parts.push(`### Sık sorulan sorular\n\n${faqs(s.faqs)}\n`);
    parts.push(refs(solutionSources[s.slug]));
  }

  for (const s of sectors) {
    parts.push(`---\n\n## ${s.h1}\n\nKaynak: ${absoluteUrl(`/sektorler/${s.slug}`)}\n\n${s.definition}\n\n${s.pains.map((p) => `- **${p.title}:** ${p.text}`).join("\n")}\n`);
    for (const q of s.sections) parts.push(`### ${q.h2}\n\n${q.answer}\n`);
    parts.push(`### Sık sorulan sorular\n\n${faqs([...s.objections, ...s.faqs])}\n`);
  }

  for (const r of regions) {
    parts.push(`---\n\n## ${r.h1}\n\nKaynak: ${absoluteUrl(`/bolgeler/${r.slug}`)}\n\n${r.definition}\n\n${r.profile}\n\n${r.needs.map((n) => `- **${n.title}:** ${n.text}`).join("\n")}\n\n${faqs(r.faqs)}\n`);
  }

  for (const p of publishedProducts()) {
    parts.push(`---\n\n## ${p.name}\n\nKaynak: ${absoluteUrl(`/urunler/${p.slug}`)}\n\n${p.oneLiner}\n\n${table(p.features)}\n${table(p.comparison)}\n${faqs(p.faqs)}\n`);
  }

  for (const p of publishedProjects()) {
    parts.push(`---\n\n## Vaka: ${p.title}\n\nKaynak: ${absoluteUrl(`/projeler/${p.slug}`)}\n\n**Sorun:** ${p.problem}\n\n**Çözüm:** ${p.solution}\n\n**Sonuç:** ${p.results.map((x) => `${x.metric} ${x.label}`).join("; ")}\n`);
  }

  for (const p of publishedPosts()) {
    const body = p.content.replace(/^import .*$/gm, "").replace(/<[^>]+>/g, "").trim();
    parts.push(`---\n\n## ${p.title}\n\nKaynak: ${absoluteUrl(`/bilgi-bankasi/${p.slug}`)} · Yazar: ${p.author.name} · Son güncelleme: ${p.updated}\n\n${body}\n`);
    if (p.faqs.length) parts.push(`### Sık sorulan sorular\n\n${faqs(p.faqs)}\n`);
    parts.push(refs(p.sources));
  }

  parts.push(`---\n\n## Genel sık sorulan sorular\n\n${faqs(homeFaqs)}\n`);
  parts.push(contact());
  return parts.join("\n");
}
