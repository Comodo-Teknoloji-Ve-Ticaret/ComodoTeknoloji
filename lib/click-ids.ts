/**
 * Google Ads tıklama kimlikleri (gclid / wbraid / gbraid).
 *
 * Reklam tıklamasından gelen ziyaretçi formu genellikle aynı oturumda doldurmaz;
 * kimlikler 90 gün boyunca localStorage'da saklanır ve form gönderiminde lead
 * kaydına eklenir. Böylece dönüşüm, tıklamayla Google Ads tarafında
 * (çevrimdışı dönüşüm / gelişmiş dönüşüm) eşleştirilebilir.
 *
 * Not: Kimlikler büyük/küçük harfe duyarlıdır; ham haliyle, değiştirilmeden iletilmelidir.
 */

export const CLICK_ID_PARAMS = ["gclid", "wbraid", "gbraid"] as const;
export type ClickIdParam = (typeof CLICK_ID_PARAMS)[number];
export type StoredClickIds = Partial<Record<ClickIdParam, string>>;

const EXPIRY_MS = 90 * 24 * 60 * 60 * 1000; // 90 gün

type StoredRecord = { value: string; expiryDate: number };

function read(param: string): StoredRecord | null {
  try {
    const raw = localStorage.getItem(param);
    return raw ? (JSON.parse(raw) as StoredRecord) : null;
  } catch {
    return null;
  }
}

/** URL sorgusundaki tıklama kimliklerini yakalayıp saklar */
export function captureClickIds(search: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  const expiryDate = Date.now() + EXPIRY_MS;
  for (const param of CLICK_ID_PARAMS) {
    const value = params.get(param);
    if (!value) continue;
    try {
      localStorage.setItem(param, JSON.stringify({ value, expiryDate }));
    } catch {
      /* gizli mod vb. — kimlik yalnızca bu sayfa yüklemesinde URL'de kalır */
    }
  }
}

/** Süresi geçmemiş saklı kimlikleri döndürür; süresi geçenleri temizler */
export function getStoredClickIds(): StoredClickIds {
  const out: StoredClickIds = {};
  if (typeof window === "undefined") return out;
  const now = Date.now();
  for (const param of CLICK_ID_PARAMS) {
    const rec = read(param);
    if (!rec) continue;
    if (rec.expiryDate && rec.expiryDate < now) {
      try {
        localStorage.removeItem(param);
      } catch {
        /* yoksay */
      }
      continue;
    }
    if (rec.value) out[param] = rec.value;
  }
  return out;
}
