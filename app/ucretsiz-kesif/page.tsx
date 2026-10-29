import { ClipboardCheck, FileText, Ruler } from "lucide-react";
import { DiscoveryBooking } from "@/components/forms/DiscoveryBooking";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ücretsiz Keşif ve Saha Denetimi Randevusu",
  description: "Network, kamera, PTS ve 5651 altyapınız için ücretsiz saha keşfi. Gün ve saat seçin, ekibimiz yerinde incelesin, yazılı rapor sunalım.",
  path: "/ucretsiz-kesif",
});

const items = [
  { Icon: Ruler, title: "Sahada ölçüm", text: "Wi-Fi sinyal ölçümü, kabinet ve kablolama incelemesi, kamera görüş analizi." },
  { Icon: ClipboardCheck, title: "Envanter ve risk tespiti", text: "Mevcut cihazlar, 5651 durumu ve tek nokta arıza riskleri." },
  { Icon: FileText, title: "Yazılı rapor ve teklif", text: "Öncelik sıralı öneriler ve kalem kalem teklif. Taahhüt istemiyoruz." },
];

export default function DiscoveryPage() {
  const crumbs = [{ name: "Ücretsiz Keşif", href: "/ucretsiz-kesif" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Ücretsiz keşif"
        title="Ücretsiz saha keşfi için randevu alın"
        definition="Ücretsiz keşif; ekibimizin tesisinize gelerek mevcut network, kablolama, kamera, plaka tanıma ve 5651 altyapınızı yerinde incelediği, ölçüm yaptığı ve ardından öncelik sıralı yazılı öneri raporu ile kalem kalem teklif sunduğu, herhangi bir taahhüt gerektirmeyen ön değerlendirme hizmetidir."
        aside={<DiscoveryBooking />}
      >
        <ul className="space-y-5">
          {items.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                <Icon className="size-5 text-accent" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{title}</span>
                <span className="text-sm text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </PageHero>
    </>
  );
}
