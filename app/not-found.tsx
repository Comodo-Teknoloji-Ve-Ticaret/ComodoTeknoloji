import Link from "next/link";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
import { tools } from "@/lib/nav";

export default function NotFound() {
  return (
    <section className="container-page py-24">
      <p className="font-mono text-sm text-accent">HATA 404 · BAĞLANTI ZAMAN AŞIMI</p>
      <h1 className="mt-4 text-[length:var(--text-h1)]">Aradığınız sayfa bu ağda bulunamadı</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">Sayfa taşınmış veya adres yanlış yazılmış olabilir. Aşağıdaki sayfalar işinize yarayabilir.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Ana sayfa</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/ucretsiz-kesif">Ücretsiz keşif</Link>
        </Button>
      </div>
      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <nav aria-label="Çözümler">
          <h2 className="font-semibold">Çözümler</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/cozumler/${s.slug}`} className="hover:text-accent">{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Araçlar">
          <h2 className="font-semibold">Ücretsiz araçlar</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={`/araclar/${t.slug}`} className="hover:text-accent">{t.name}</Link>
              </li>
            ))}
            <li><Link href="/bilgi-bankasi" className="hover:text-accent">Bilgi Bankası</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
