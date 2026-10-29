import { brands } from "@/data/home";

/**
 * Sonsuz kayan marka şeridi (CSS transform animasyonu, hover'da durur).
 * Not: Gerçek logo dosyalarını kullanmadan önce markaların logo kullanım koşullarını kontrol edin;
 * şimdilik metin tabanlı wordmark gösterilir.
 */
export function LogoMarquee({ title = "Çalıştığımız markalar" }: { title?: string }) {
  const items = [...brands, ...brands];
  return (
    <section aria-label={title} className="py-14">
      <p className="container-page mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
          {items.map((b, i) => (
            <li
              key={`${b}-${i}`}
              aria-hidden={i >= brands.length}
              className="whitespace-nowrap text-xl font-bold tracking-tight text-muted/70 transition-colors hover:text-fg sm:text-2xl"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
