import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site, telLink, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "Web sitesinden kameraya, projenizi birlikte planlayalım",
  text = "Ücretsiz keşif görüşmesinde web sitesi, güvenlik kamerası, yazılım veya network altyapısı ihtiyacınızı dinliyor; yazılı öneri ve kalem kalem teklif sunuyoruz.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page py-16">
      <Reveal variant="scaleIn" className="border-gradient relative overflow-hidden rounded-3xl bg-surface p-8 sm:p-12">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="text-[length:var(--text-h2)]">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">{text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Button asChild size="lg">
              <Link href="/ucretsiz-kesif">
                <CalendarCheck /> Ücretsiz Keşif Planla
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={telLink()} aria-label={`Telefon: ${site.phone}`}>
                  <Phone /> Ara
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
