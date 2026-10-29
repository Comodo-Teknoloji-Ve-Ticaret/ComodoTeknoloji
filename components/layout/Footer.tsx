import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/analytics/CookieConsent";
import { regions } from "@/data/regions";
import { sectors } from "@/data/sectors";
import { solutions } from "@/data/solutions";
import { tools } from "@/lib/nav";
import { fullAddress, site, telLink } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Çözümler", links: solutions.map((s) => ({ label: s.name, href: `/cozumler/${s.slug}` })) },
    { title: "Sektörler", links: sectors.map((s) => ({ label: s.name, href: `/sektorler/${s.slug}` })) },
    { title: "Bölgeler", links: regions.map((r) => ({ label: r.name, href: `/bolgeler/${r.slug}` })) },
    {
      title: "Kurumsal",
      links: [
        ...tools.map((t) => ({ label: t.name, href: `/araclar/${t.slug}` })),
        { label: "Projeler", href: "/projeler" },
        { label: "Bilgi Bankası", href: "/bilgi-bankasi" },
        { label: "Bakım ve Destek", href: "/bakim-ve-destek" },
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "İletişim", href: "/iletisim" },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-border bg-surface/60">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        {/* NAP bloğu: tüm sayfalarda birebir aynı */}
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted">{site.description}</p>
          <address className="mt-6 space-y-2.5 text-sm not-italic">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{fullAddress}</a>
            </p>
            <p className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={telLink()} className="hover:text-accent">
                {site.phone}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>{site.openingHoursText}</span>
            </p>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-fg/80 transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Tüm hakları saklıdır. Sitede adı geçen üçüncü taraf marka ve ürün adları sahiplerine aittir.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/kvkk" className="hover:text-fg">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi" className="hover:text-fg">Çerez Politikası</Link>
            <CookieSettingsButton className="hover:text-fg" />
            <a href="/llms.txt" className="hover:text-fg">llms.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
