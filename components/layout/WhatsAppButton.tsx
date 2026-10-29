"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { track } from "@/components/analytics/track";

/** Masaüstünde sabit WhatsApp butonu (mobilde sabit CTA çubuğu bu işi görür) */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      onClick={() => track("cta_click", { location: "floating", cta: "whatsapp" })}
      className="no-print fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-[#05300f] shadow-[0_10px_30px_-8px_#25D366] transition-transform hover:scale-105 md:grid"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
