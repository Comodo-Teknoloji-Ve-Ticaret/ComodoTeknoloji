import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { MultiStepForm } from "@/components/forms/MultiStepForm";
import { Reveal } from "@/components/motion/Reveal";
import { fullAddress, site, telLink } from "@/lib/site";

export function ContactBlock({ source = "ana-sayfa-iletisim" }: { source?: string }) {
  return (
    <section aria-labelledby="iletisim-baslik" className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal variant="slideInLeft">
          <h2 id="iletisim-baslik" className="text-[length:var(--text-h2)]">
            Projenizi anlatın, 24 saat içinde arayalım
          </h2>
          <p className="mt-4 text-lg text-muted">Üç kısa adım. Serbest metin yazmanız gerekmiyor.</p>
          <address className="mt-8 space-y-4 not-italic">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {fullAddress}</p>
            <p className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> <a href={telLink()} className="hover:text-accent">{site.phone}</a></p>
            <p className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a></p>
            <p className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {site.openingHoursText}</p>
          </address>
          {site.googleMapsEmbed ? (
            <iframe
              title={`${site.name} harita konumu`}
              src={site.googleMapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-8 aspect-[16/10] w-full rounded-2xl border border-border"
            />
          ) : (
            <div className="mt-8 grid aspect-[16/10] w-full place-items-center rounded-2xl border border-dashed border-border text-sm text-muted">
              [DOLDURULACAK: Google Maps embed URL — lib/site.ts → googleMapsEmbed]
            </div>
          )}
        </Reveal>
        <Reveal variant="slideInRight">
          <MultiStepForm source={source} />
        </Reveal>
      </div>
    </section>
  );
}
