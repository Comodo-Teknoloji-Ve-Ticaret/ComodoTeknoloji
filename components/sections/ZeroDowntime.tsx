import { Clock4, Layers, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const items = [
  { Icon: Layers, title: "Paralel geçiş", text: "Eski ve yeni sistem geçiş anına kadar birlikte çalışır." },
  { Icon: Clock4, title: "Takviminize göre", text: "Blok blok, düşük doluluk saatlerinde veya gece çalışma." },
  { Icon: ShieldCheck, title: "Geri dönüş planı", text: "Her geçiş adımı için yazılı geri alma senaryosu." },
  { Icon: Wrench, title: "SLA'lı destek", text: "Teslim sonrası sözleşmeli müdahale süreleri ve 7/24 izleme." },
];

/** Sıfır Kesinti Politikası + SLA özeti */
export function ZeroDowntime() {
  return (
    <section aria-labelledby="sifir-kesinti" className="container-page py-16">
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Sıfır Kesinti Politikası</p>
            <h2 id="sifir-kesinti" className="mt-3 text-[length:var(--text-h3)]">
              Kurulum sırasında operasyonunuz durmaz
            </h2>
          </div>
          <Link href="/bakim-ve-destek" className="text-sm font-semibold text-accent underline underline-offset-4">
            SLA paketlerini incele
          </Link>
        </div>
        <Stagger as="ul" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, text }) => (
            <StaggerItem as="li" key={title}>
              <Icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
