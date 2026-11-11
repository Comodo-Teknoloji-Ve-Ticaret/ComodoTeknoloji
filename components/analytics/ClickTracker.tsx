"use client";

import { useEffect } from "react";
import { captureClickIds } from "@/lib/click-ids";

/**
 * Google Ads tıklama kimliklerini (gclid/wbraid/gbraid) URL'den yakalar ve
 * 90 gün boyunca saklar. Tüm sayfalarda çalışır; form hangi sayfadan gönderilirse
 * gönderilsin kimlik lead kaydına eklenir.
 *
 * window.location.search doğrudan okunduğu için useSearchParams gerekmez —
 * statik dışa aktarmada (GitHub Pages) Suspense sınırı da istemez.
 */
export function ClickTracker() {
  useEffect(() => {
    captureClickIds(window.location.search);
  }, []);

  return null;
}
