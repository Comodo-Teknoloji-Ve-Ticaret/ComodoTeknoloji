"use client";

import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/components/analytics/track";
import { Button } from "@/components/ui/button";
import { LEAD_STORAGE_KEY } from "@/lib/lead-client";
import { whatsappLink } from "@/lib/site";

type Stored = { emailed: boolean; whatsapp: string; source: string };

/**
 * Teşekkür sayfasının üst bölümü. Statik sitede talep e-postayla iletilemediyse
 * ziyaretçiye hazır WhatsApp mesajıyla "son adım" gösterilir.
 */
export function LeadHandoff() {
  const [lead, setLead] = useState<Stored | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (raw) setLead(JSON.parse(raw) as Stored);
    } catch {
      /* yok sayılır */
    }
  }, []);

  const needsWhatsApp = !lead?.emailed;
  const link = lead?.whatsapp ?? whatsappLink("Merhaba, web sitenizden talep bırakmak istiyorum.");

  return (
    <div className="mx-auto max-w-2xl text-center">
      {needsWhatsApp ? <Send className="mx-auto size-14 text-[#25D366]" aria-hidden /> : <CheckCircle2 className="mx-auto size-14 text-success" aria-hidden />}
      <h1 className="mt-6 text-[length:var(--text-h1)]">{needsWhatsApp ? "Son adım: talebinizi gönderin" : "Teşekkürler, talebiniz alındı"}</h1>
      <p className="mt-4 text-lg text-muted">
        {needsWhatsApp
          ? "Bilgileriniz hazır bir mesaja dönüştürüldü. Tek dokunuşla WhatsApp'tan gönderin, ekibimiz hemen dönüş yapsın."
          : "Talebiniz ekibimize ulaştı. Sonraki adımlar aşağıda; acil bir durum varsa WhatsApp'tan da yazabilirsiniz."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="whatsapp" size="lg">
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_lead", { source: lead?.source ?? "tesekkurler" })}>
            <MessageCircle /> {needsWhatsApp ? "WhatsApp ile gönder" : "WhatsApp'tan yazın"}
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/bilgi-bankasi">Rehberleri okuyun</Link>
        </Button>
      </div>
    </div>
  );
}
