import { ToolPage } from "@/components/sections/ToolPage";
import { RoiCalculator } from "@/components/tools/RoiCalculator";
import { roiConfig } from "@/data/tool-config";
import { regionLinks, sectorLinks, solutionLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ağ Yenileme Tasarruf Hesaplayıcı (Otel Wi-Fi)",
  description: "Oda sayınıza göre önerilen access point sayısını ve Wi-Fi yenilemesinin yıllık iş gücü tasarrufunu hesaplayın. Ücretsiz, anında sonuç.",
  path: "/araclar/ag-yenileme-hesaplayici",
});

export default function Page() {
  return (
    <ToolPage
      slug="ag-yenileme-hesaplayici"
      name="Ağ Yenileme Tasarruf Hesaplayıcı"
      title="Ağ Yenileme Tasarruf Hesaplayıcı"
      definition="Ağ Yenileme Tasarruf Hesaplayıcı; oda sayısı, mevcut access point sayısı, aylık Wi-Fi şikayeti ve IT destek saatinizden yola çıkarak önerilen AP sayısını ve Wi-Fi altyapısı yenilendiğinde kazanılacak yıllık iş gücü saatini ve maliyetini tahmin eden ücretsiz bir araçtır."
      updatedAt="2026-10-24"
      related={[
        { title: "Çözümler", links: solutionLinks(["kurumsal-network", "zayif-akim", "5651-loglama-hotspot"]) },
        { title: "Sektörler", links: sectorLinks(["otel-ve-resort"]) },
        { title: "Bölgeler", links: regionLinks(["belek", "manavgat", "alanya"]) },
      ]}
      faqs={[
        { q: "Hesaplayıcı kesin AP sayısını verir mi?", a: "Hayır. Duvar yapısına göre ortalama yoğunlukla ilk tahmini verir. Kesin sayı yalnızca sahada yapılan site survey ölçümüyle belirlenir." },
        { q: "Tasarruf oranı neden değiştirilebilir?", a: "Şikayet ve destek yükündeki azalma, mevcut altyapınızın durumuna göre değişir. Varsayılan oran bir varsayımdır; kendi hedefinizi girerek senaryoyu test edebilirsiniz." },
        { q: "Sonuçlarım kaydediliyor mu?", a: "Girdileriniz yalnızca tarayıcınızda hesaplanır. Raporu açmak için bilgi bıraktığınızda sonuç özeti ekibimize iletilir." },
      ]}
      methodology={
        <>
          <p>
            <strong>Önerilen AP</strong> = ⌈oda sayısı ÷ duvar katsayısı⌉ + ortak alan AP&apos;si. Duvar katsayısı betonarme için {roiConfig.roomsPerAp.betonarme}, karma için{" "}
            {roiConfig.roomsPerAp.karma}, hafif yapı için {roiConfig.roomsPerAp.hafif} odadır. Ortak alanlar için her {roiConfig.commonAreaRoomsPerAp} odada bir, en az{" "}
            {roiConfig.minCommonAps} AP eklenir.
          </p>
          <p>
            <strong>Aylık destek yükü</strong> = IT destek saati + (şikayet sayısı × {roiConfig.minutesPerComplaint} dk ÷ 60). Yenileme sonrası yük, seçtiğiniz azalma oranıyla
            hesaplanır; yıllık tasarruf = (önce − sonra) × 12 × saatlik maliyet.
          </p>
        </>
      }
    >
      <RoiCalculator />
    </ToolPage>
  );
}
