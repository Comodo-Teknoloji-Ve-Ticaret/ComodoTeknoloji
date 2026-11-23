"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { site, telLink, whatsappLink } from "@/lib/site";
import { track } from "@/components/analytics/track";

/** Mobilde her zaman görünen alt iletişim çubuğu: tek dokunuşla arama ve WhatsApp */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/tesekkurler") return null;

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={telLink()}
          aria-label={`Hemen arayın: ${site.phone}`}
          onClick={() => track("cta_click", { location: "sticky_bar", cta: "telefon" })}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-[0.95rem] font-bold text-primary-fg active:scale-[0.98]"
        >
          <Phone className="size-5" aria-hidden /> Hemen Ara
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cta_click", { location: "sticky_bar", cta: "whatsapp" })}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[0.95rem] font-bold text-[#05300f] active:scale-[0.98]"
        >
          <MessageCircle className="size-5" aria-hidden /> WhatsApp
        </a>
      </div>
    </div>
  );
}
