"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { readConsent, writeConsent } from "./track";

/** KVKK uyumlu çerez onayı: varsayılan olarak hiçbir analitik çerez yüklenmez */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const decide = (analytics: boolean) => {
    writeConsent({ analytics, date: new Date().toISOString() });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          className="no-print fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass rounded-2xl p-5 shadow-2xl">
            <p id="cookie-title" className="font-semibold">
              Çerez tercihleriniz
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Zorunlu çerezler sitenin çalışması için kullanılır. Ziyaret istatistikleri (Google Analytics, Microsoft Clarity) yalnızca onay
              vermeniz halinde etkinleşir.{" "}
              <Link href="/cerez-politikasi" className="text-accent underline underline-offset-2">
                Çerez Politikası
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => decide(true)}>
                Kabul et
              </Button>
              <Button size="sm" variant="outline" onClick={() => decide(false)}>
                Yalnızca zorunlu
              </Button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>
      Çerez tercihleri
    </button>
  );
}
