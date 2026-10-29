import Link from "next/link";
import { ComodoLogo } from "@/components/brand/ComodoLogo";
import { site } from "@/lib/site";

/** Comodo Teknoloji logosu: turuncu altıgen içinde komodo başı; seyrek ışık geçişi ve kırmızı göz */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 font-bold tracking-tight ${className ?? ""}`} aria-label={`${site.name} ana sayfa`}>
      <ComodoLogo size={40} slow priority />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem]">Comodo</span>
        <span className="mt-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-accent">Teknoloji</span>
      </span>
    </Link>
  );
}
