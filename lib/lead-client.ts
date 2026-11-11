"use client";

import { getStoredClickIds } from "./click-ids";
import { hashContact } from "./hash-user-data";
import { site, whatsappLink } from "./site";
import { businessTypes, leadSchema, needs, sizes, type LeadInput } from "./validations";

/**
 * Statik sitede (GitHub Pages) form gönderimi — sunucu gerekmez.
 * 1) Veriler doğrulanır, honeypot doluysa sessizce başarı döner (bot)
 * 2) NEXT_PUBLIC_WEB3FORMS_KEY tanımlıysa talep Web3Forms ile e-postaya iletilir
 * 3) Her durumda talep, ekibe WhatsApp'tan tek dokunuşla gönderilecek hazır mesaja dönüştürülür
 *    (teşekkür sayfasında / rapor ekranında "WhatsApp ile gönder" butonu)
 */
export type LeadResult = { ok: true; emailed: boolean; whatsapp: string } | { ok: false; error: string };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
export const LEAD_STORAGE_KEY = "comodo-lead";

const label = <T extends readonly { value: string; label: string }[]>(list: T, v?: string) => list.find((x) => x.value === v)?.label ?? v;

function summarize(l: LeadInput): [string, string][] {
  return (
    [
      ["Ad", l.name],
      ["İletişim", l.contact],
      ["Şirket", l.company],
      ["İşletme tipi", label(businessTypes, l.businessType)],
      ["Büyüklük", label(sizes, l.size)],
      ["İhtiyaçlar", l.needs?.map((n) => label(needs, n)).join(", ")],
      ["Randevu", l.slot],
      ["Mesaj", l.message],
      ["Araç sonucu", l.toolResult],
      ["Kaynak sayfa", l.source],
    ] as [string, string | undefined][]
  ).filter((r): r is [string, string] => !!r[1]);
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Form bilgilerini kontrol edin." };
  const lead = parsed.data;

  const rows = summarize(lead);

  // Reklam atıfı (Google Ads çevrimdışı / gelişmiş dönüşümler):
  // Tıklama kimlikleri ham haliyle (büyük/küçük harfe duyarlı), iletişim bilgisi
  // normalleştirilip SHA-256 ile hash'lenerek iletilir. Hash'lenmiş veri e-posta
  // kaydına girer; Google'ın tıklama kimliğini indekslemesi 4-6 saat sürebildiğinden
  // Ads'e yükleme tıklamadan en erken 4-6 saat sonra yapılmalıdır.
  const clickIds = getStoredClickIds();
  const { hashedEmail, hashedPhone } = await hashContact(lead.contact);
  const attribution: Record<string, string> = {
    ...(clickIds.gclid ? { "Reklam tıklaması (gclid)": clickIds.gclid } : {}),
    ...(clickIds.wbraid ? { "Reklam tıklaması (wbraid)": clickIds.wbraid } : {}),
    ...(clickIds.gbraid ? { "Reklam tıklaması (gbraid)": clickIds.gbraid } : {}),
    ...(hashedEmail ? { "Hash e-posta (SHA-256)": hashedEmail } : {}),
    ...(hashedPhone ? { "Hash telefon (SHA-256)": hashedPhone } : {}),
  };

  // WhatsApp mesajı insana yöneliktir; yalnızca gclid satırı eklenir
  const whatsappRows = clickIds.gclid ? [...rows, ["Reklam (gclid)", clickIds.gclid] as [string, string]] : rows;
  const message = `Merhaba, web sitenizden talep bırakıyorum.\n${whatsappRows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  const whatsapp = whatsappLink(message);

  // Bot: başarı gibi davran, hiçbir yere gönderme
  if (lead.website) return { ok: true, emailed: false, whatsapp };

  let emailed = false;
  if (WEB3FORMS_KEY) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Yeni web talebi: ${lead.company} — ${lead.source}`,
          from_name: `${site.name} web sitesi`,
          botcheck: "",
          ...Object.fromEntries(rows),
          ...attribution,
        }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
  }

  try {
    sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify({ emailed, whatsapp, source: lead.source }));
  } catch {
    /* gizli mod: teşekkür sayfası genel WhatsApp linkini gösterir */
  }
  return { ok: true, emailed, whatsapp };
}
