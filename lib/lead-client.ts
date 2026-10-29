"use client";

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
  const message = `Merhaba, web sitenizden talep bırakıyorum.\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
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
