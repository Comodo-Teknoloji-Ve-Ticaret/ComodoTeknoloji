/**
 * Google Ads gelişmiş dönüşümleri (enhanced conversions) için kullanıcı verisi
 * normalizasyonu ve SHA-256 hash. Tarayıcıda çalışır (Web Crypto API) — bu site
 * statik dışa aktarıldığı için Node `crypto` modülü kullanılamaz.
 *
 * Önemli: Hash'lemeden önce veri normalleştirilmelidir (e-posta: trim + küçük harf;
 * telefon: E.164 standardı, örn. +905XXXXXXXXX). Normalizasyon atlanırsa Google
 * tarafında hash eşleşmez ve dönüşüm verisi düşer.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Türkiye numarasını E.164 standardına çevirir: "+905XXXXXXXXX" */
export function normalizePhoneE164(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    // 0 ile başlayan yerel format: 05XX... → 905XX...
    digits = `90${digits.slice(1)}`;
  } else if (!digits.startsWith("90") && digits.length === 10) {
    // Başında 0 olmayan 10 haneli: 5XX... → 905XX...
    digits = `90${digits}`;
  }
  return `+${digits}`;
}

async function sha256Hex(input: string): Promise<string | undefined> {
  try {
    // crypto.subtle yalnızca güvenli bağlamda (HTTPS / localhost) mevcuttur
    if (!globalThis.crypto?.subtle) return undefined;
    const buf = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return undefined;
  }
}

/**
 * Formdaki iletişim alanını (e-posta veya telefon) normalleştirip hash'ler.
 * Alan e-posta ise hashedEmail, telefon ise hashedPhone dolu döner.
 */
export async function hashContact(contact: string): Promise<{ hashedEmail?: string; hashedPhone?: string }> {
  if (emailRe.test(contact)) {
    return { hashedEmail: await sha256Hex(normalizeEmail(contact)) };
  }
  return { hashedPhone: await sha256Hex(normalizePhoneE164(contact)) };
}
