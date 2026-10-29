import { ToolPage } from "@/components/sections/ToolPage";
import { CctvPlanner } from "@/components/tools/CctvPlanner";
import { regionLinks, sectorLinks, solutionLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "CCTV Planlayıcı: Kamera Sayısı ve Depolama Hesabı",
  description: "Alan, giriş sayısı ve DORI seviyesine göre kamera sayısı, lens, NVR kanal, 30/60/90 gün depolama ve PoE bütçesini hesaplayın.",
  path: "/araclar/cctv-planlayici",
});

export default function Page() {
  return (
    <ToolPage
      slug="cctv-planlayici"
      name="CCTV Planlayıcı"
      title="CCTV Planlayıcı: Kamera Sayısı, Lens ve Depolama Hesabı"
      definition="CCTV Planlayıcı; izlenecek alanın tipi, metrekaresi, giriş sayısı ve IEC 62676-4 DORI seviyesine göre gereken kamera sayısını, lens seçimini, NVR kanal kapasitesini, 30/60/90 günlük kayıt için disk ihtiyacını ve PoE güç bütçesini hesaplayan ücretsiz bir araçtır."
      updatedAt="2026-10-24"
      related={[
        { title: "Çözümler", links: solutionLinks(["guvenlik-kameralari", "plaka-tanima-sistemi", "zayif-akim"]) },
        { title: "Sektörler", links: sectorLinks(["fabrika-ve-osb", "avm-ve-site-yonetimi", "otel-ve-resort"]) },
        { title: "Bölgeler", links: regionLinks(["kepez", "konyaalti"]) },
      ]}
      faqs={[
        { q: "DORI seviyesi nasıl seçilir?", a: "Genel alan takibi için gözlem, tanıdık kişileri ayırt etmek için tanıma, girişlerde yabancı birini kimliklendirmek için kimlik seviyesi seçilmelidir." },
        { q: "30 günlük kayıt için ne kadar disk gerekir?", a: "1 Mbps'lik bir kamera günde yaklaşık 10,8 GB üretir. 4 MP H.265 bir kamera ortalama 4 Mbps ile 30 günde yaklaşık 1,3 TB depolama ister." },
        { q: "PoE bütçesi neden önemli?", a: "Switch'in toplam PoE gücü yetmezse bazı kameralar, özellikle gece IR açıldığında, yeniden başlar. Hesaplamaya bu nedenle güç payı eklenir." },
      ]}
      methodology={
        <>
          <p>
            Bir kameranın istenen piksel yoğunluğunda görebileceği <strong>sahne genişliği</strong> = yatay çözünürlük ÷ px/m. Bu genişliğe ulaşılan <strong>mesafe</strong> =
            genişlik ÷ (2 × tan(yatay açı ÷ 2)) olup alan tipinin pratik menziliyle sınırlanır. Kamera başına kapsama yaklaşık ½ × genişlik × mesafe × etkin kullanım
            katsayısıdır.
          </p>
          <p>
            <strong>Depolama</strong> = kamera sayısı × bit hızı (Mbps) × 10,8 GB/gün × gün. Hareket bazlı kayıtta bit hızı ortalama doluluk katsayısıyla çarpılır.
          </p>
        </>
      }
    >
      <CctvPlanner />
    </ToolPage>
  );
}
