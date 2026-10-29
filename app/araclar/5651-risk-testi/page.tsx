import { ToolPage } from "@/components/sections/ToolPage";
import { RiskScorecard } from "@/components/tools/RiskScorecard";
import { regionLinks, sectorLinks, solutionLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "5651 Risk Testi: Loglama Uyumluluk Skor Kartı",
  description: "10 evet/hayır sorusuyla 5651 loglama uyumluluk riskinizi ölçün. Zaman damgası, NTP, saklama süresi ve kişi eşleşmesi kontrolleri.",
  path: "/araclar/5651-risk-testi",
});

export default function Page() {
  return (
    <ToolPage
      slug="5651-risk-testi"
      name="5651 Risk Skor Kartı"
      title="5651 Risk Testi: Loglama Uyumluluk Skor Kartı"
      definition="5651 Risk Skor Kartı; internet erişimi sunan otel, kafe ve işletmelerin bağlantıları kişiyle eşleştirme, zaman damgası, NTP senkronu, saklama süresi ve yedekleme gibi temel 5651 loglama gereksinimlerini ne ölçüde karşıladığını 10 soruda puanlayan ücretsiz bir öz değerlendirme aracıdır."
      updatedAt="2026-10-24"
      related={[
        { title: "Çözümler", links: solutionLinks(["5651-loglama-hotspot", "kurumsal-network", "siber-guvenlik"]) },
        { title: "Sektörler", links: sectorLinks(["otel-ve-resort", "restoran-ve-kafe"]) },
        { title: "Bölgeler", links: regionLinks(["alanya", "manavgat", "kemer"]) },
      ]}
      faqs={[
        { q: "Bu test hukuki görüş yerine geçer mi?", a: "Hayır. Test, teknik gereksinimlere dair bir öz değerlendirmedir. Güncel mevzuat yükümlülüklerinizi hukuk danışmanınızla doğrulayın." },
        { q: "Skor nasıl hesaplanıyor?", a: "Her sorunun bir risk ağırlığı vardır; riskli yanıt verilen soruların ağırlıkları toplanır. 0–24 düşük, 25–54 orta, 55 ve üzeri yüksek risk olarak gösterilir." },
        { q: "Yüksek risk çıktı, ne yapmalıyım?", a: "Raporda öncelik sırasına göre listelenen eksikleri giderin. Hotspot ve zaman damgalı loglama kurulumu genellikle kısa bir bakım penceresinde tamamlanır." },
      ]}
      methodology={
        <p>
          Kişi eşleşmesi ve zaman damgası en yüksek ağırlığa sahiptir; çünkü bu iki şart karşılanmadığında kayıtların ispat değeri kalmaz. Elle tutulan kayıtlar sorusunda
          &quot;Evet&quot; yanıtı risklidir, diğer tüm sorularda &quot;Hayır&quot; yanıtı risk puanı ekler.
        </p>
      }
    >
      <RiskScorecard />
    </ToolPage>
  );
}
