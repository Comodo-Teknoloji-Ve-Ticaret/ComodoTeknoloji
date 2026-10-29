import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site, TODO } from "@/lib/site";

export const metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni",
  description: `${site.name} kişisel verilerin işlenmesine ilişkin aydınlatma metni.`,
  path: "/kvkk",
});

/** Taslak metindir — yayınlamadan önce hukuk danışmanınıza onaylatın. */
export default function KvkkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "KVKK Aydınlatma Metni", href: "/kvkk" }]}
        title="KVKK Aydınlatma Metni"
        definition={`Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla ${site.legalName} tarafından, web sitesi formları aracılığıyla toplanan kişisel verilerin işlenmesine ilişkin olarak hazırlanmıştır.`}
        updatedAt="2026-10-24"
      />
      <section className="container-page py-12">
        <div className="prose-site">
          <p><strong>Not:</strong> Bu metin taslaktır. {TODO}: Yayınlamadan önce hukuk danışmanınıza onaylatın.</p>
          <h2>1. Veri sorumlusu</h2>
          <p>{site.legalName} — {fullAddress} — {site.email}</p>
          <h2>2. İşlenen kişisel veriler</h2>
          <ul>
            <li>Kimlik: ad soyad</li>
            <li>İletişim: telefon, e-posta</li>
            <li>Müşteri işlem: şirket adı, işletme tipi, talep içeriği, randevu tercihi, araç sonuçları</li>
            <li>İşlem güvenliği: IP adresi, form gönderim zamanı, bot doğrulama sonucu</li>
          </ul>
          <h2>3. İşleme amaçları</h2>
          <ul>
            <li>Teklif, keşif ve bilgi taleplerinize dönüş yapılması</li>
            <li>Sözleşme süreçlerinin yürütülmesi</li>
            <li>Bilgi güvenliği süreçlerinin yürütülmesi ve kötüye kullanımın önlenmesi</li>
          </ul>
          <h2>4. Hukuki sebepler</h2>
          <p>KVKK m.5/2-c (sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması) ve m.5/2-f (meşru menfaat). {TODO}</p>
          <h2>5. Aktarım</h2>
          <p>
            Verileriniz; e-posta gönderimi (Resend), mesajlaşma (WhatsApp / Meta), müşteri ilişkileri yönetimi ve bot koruması (Cloudflare) hizmet sağlayıcılarıyla, yalnızca
            yukarıdaki amaçlarla sınırlı olarak paylaşılabilir. Bu sağlayıcıların bir kısmı yurt dışında bulunduğundan aktarım KVKK m.9 kapsamında değerlendirilir. {TODO}
          </p>
          <h2>6. Saklama süresi</h2>
          <p>{TODO}</p>
          <h2>7. Haklarınız</h2>
          <p>KVKK m.11 kapsamındaki haklarınıza ilişkin taleplerinizi {site.email} adresine iletebilirsiniz.</p>
        </div>
      </section>
    </>
  );
}
