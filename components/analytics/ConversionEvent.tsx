"use client";

import { useEffect } from "react";
import { track } from "./track";

/**
 * Teşekkür sayfasında GA4 dönüşüm olayı. gtag lazyOnload ile geç yüklendiği için
 * hazır olana kadar (en fazla ~6 sn) bekler ve olayı yalnızca bir kez gönderir.
 * Analitik onayı yoksa gtag hiç yüklenmez ve olay gönderilmez.
 */
export function ConversionEvent() {
  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("kaynak") ?? "bilinmiyor";
    let tries = 0;
    const id = setInterval(() => {
      if (window.gtag) {
        track("generate_lead_confirmed", { source });
        clearInterval(id);
      } else if (++tries > 20) clearInterval(id);
    }, 300);
    return () => clearInterval(id);
  }, []);
  return null;
}
