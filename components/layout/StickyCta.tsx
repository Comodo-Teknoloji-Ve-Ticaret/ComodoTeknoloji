"use client";

import { CalendarCheck, MessageCircle } from "lucide-react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { track } from "@/components/analytics/track";

/** Mobilde aşağı kaydırınca alttan kayarak gelen sabit CTA çubuğu */
export function StickyCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setShow(v > 480 && v >= prev - 4);
  });

  if (pathname === "/ucretsiz-kesif" || pathname === "/tesekkurler") return null;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="no-print fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        >
          <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-2 shadow-2xl">
            <Link
              href="/ucretsiz-kesif"
              onClick={() => track("cta_click", { location: "sticky_bar", cta: "kesif" })}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-fg"
            >
              <CalendarCheck className="size-4" aria-hidden /> Ücretsiz Keşif
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_click", { location: "sticky_bar", cta: "whatsapp" })}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-[#05300f]"
            >
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
