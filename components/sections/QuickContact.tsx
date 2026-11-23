"use client";

import { MessageCircle, Phone } from "lucide-react";
import { track } from "@/components/analytics/track";
import { site, telLink, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Tek dokunuşla arama ve WhatsApp butonları (mobilde form yerine öne çıkan iletişim yolu) */
export function QuickContact({ location, className }: { location: string; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <a
        href={telLink()}
        onClick={() => track("cta_click", { location, cta: "telefon" })}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-primary px-3 py-3 text-primary-fg shadow-[0_8px_24px_-10px_var(--primary)] transition hover:brightness-110 active:scale-[0.98]"
      >
        <span className="flex items-center gap-2 text-base font-bold">
          <Phone className="size-5" aria-hidden /> Hemen Ara
        </span>
        <span className="text-xs font-medium opacity-80">{site.phone}</span>
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("cta_click", { location, cta: "whatsapp" })}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#25D366] px-3 py-3 text-[#05300f] shadow-[0_8px_24px_-10px_#25D366] transition hover:brightness-105 active:scale-[0.98]"
      >
        <span className="flex items-center gap-2 text-base font-bold">
          <MessageCircle className="size-5" aria-hidden /> WhatsApp
        </span>
        <span className="text-xs font-medium opacity-80">Hemen yazın</span>
      </a>
    </div>
  );
}
