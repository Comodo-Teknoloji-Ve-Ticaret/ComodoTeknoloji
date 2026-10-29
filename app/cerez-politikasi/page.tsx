import { CookieSettingsButton } from "@/components/analytics/CookieConsent";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site, TODO } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Çerez Politikası",
  description: `${site.name} web sitesinde kullanılan çerezler ve tercihlerinizi nasıl yönetebileceğiniz.`,
  path: "/cerez-politikasi",
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Çerez Politikası", href: "/cerez-politikasi" }]}
        title="Çerez Politikası"
        definition="Bu sitede yalnızca sitenin çalışması için gerekli zorunlu çerezler varsayılan olarak kullanılır. Ziyaret istatistiği amaçlı analitik çerezler (Google Analytics 4, Microsoft Clarity) yalnızca açık onayınızla etkinleşir ve onayınızı dilediğiniz zaman geri alabilirsiniz."
        updatedAt="2026-10-24"
      />
      <section className="container-page py-12">
        <div className="prose-site">
          <p><strong>Not:</strong> {TODO}: Yayınlamadan önce hukuk danışmanınıza onaylatın.</p>
          <table>
            <thead>
              <tr><th>Çerez / depolama</th><th>Tür</th><th>Amaç</th><th>Süre</th></tr>
            </thead>
            <tbody>
              <tr><td>kvkk-consent-v1 (yerel depolama)</td><td>Zorunlu</td><td>Çerez tercihinizi hatırlamak</td><td>Siz silene kadar</td></tr>
              <tr><td>theme (yerel depolama)</td><td>Zorunlu</td><td>Açık/koyu tema tercihi</td><td>Siz silene kadar</td></tr>
              <tr><td>_ga, _ga_*</td><td>Analitik (onaylı)</td><td>Google Analytics 4 ziyaret istatistikleri</td><td>En fazla 2 yıl</td></tr>
              <tr><td>_clck, _clsk, CLID</td><td>Analitik (onaylı)</td><td>Microsoft Clarity kullanım analizi</td><td>En fazla 1 yıl</td></tr>
              <tr><td>Cloudflare Turnstile</td><td>Zorunlu</td><td>Formlarda bot koruması</td><td>Oturum</td></tr>
            </tbody>
          </table>
          <h2>Tercihlerinizi değiştirin</h2>
          <p>
            <CookieSettingsButton className="font-semibold text-accent underline underline-offset-2" />
          </p>
        </div>
      </section>
    </>
  );
}
