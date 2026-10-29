"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, FileDown, Loader2, MessageCircle, Printer } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitLead } from "@/lib/lead-client";
import { track } from "@/components/analytics/track";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gateSchema, type GateInput } from "@/lib/validations";
import { FieldError, Honeypot, KvkkCheckbox, TrustNote } from "./FormParts";

/**
 * Araç sonuç ekranındaki e-posta kapısı. Onaydan sonra detaylı rapor açılır;
 * rapor yazdırılabilir / "PDF olarak kaydet" ile indirilebilir ve sonuç ekibe iletilir.
 */
export function EmailGate({
  tool,
  summary,
  children,
}: {
  tool: string;
  /** Ekibe iletilecek düz metin sonuç özeti */
  summary: string;
  /** Kapı açıldıktan sonra gösterilecek detaylı rapor */
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [whatsapp, setWhatsapp] = useState<string>();
  const [pending, start] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const [hp, setHp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GateInput>({ resolver: zodResolver(gateSchema) });

  const onSubmit = (data: GateInput) =>
    start(async () => {
      setServerError(undefined);
      const res = await submitLead({
        ...data,
        name: data.company,
        source: `arac:${tool}`,
        toolResult: summary,
        website: hp,
      });
      if (!res.ok) return setServerError(res.error);
      track("generate_lead", { form: "tool_gate", tool });
      setWhatsapp(res.whatsapp);
      setUnlocked(true);
    });

  return (
    <AnimatePresence mode="wait" initial={false}>
      {unlocked ? (
        <m.div key="report" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div id="rapor">{children}</div>
          <div className="no-print flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer /> Raporu yazdır / PDF kaydet
            </Button>
            {whatsapp && (
              <Button asChild variant="whatsapp">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_lead", { form: "tool_gate", tool })}>
                  <MessageCircle /> Sonucu WhatsApp ile gönder
                </a>
              </Button>
            )}
            <Button asChild>
              <Link href="/ucretsiz-kesif">
                <CalendarCheck /> Sonuçları keşifte doğrulayalım
              </Link>
            </Button>
          </div>
        </m.div>
      ) : (
        <m.form
          key="gate"
          exit={{ opacity: 0, y: -12 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative space-y-4 rounded-2xl border border-dashed border-accent/40 bg-surface p-6"
        >
          <p className="flex items-center gap-2 font-semibold">
            <FileDown className="size-5 text-accent" aria-hidden /> Detaylı raporu ve önerileri alın
          </p>
          <p className="text-sm text-muted">Hesaplama detayları, ürün önerileri ve bütçe kalemleri içeren raporu açmak için bilgilerinizi bırakın.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`${tool}-email`}>İş e-postası</Label>
              <Input id={`${tool}-email`} type="email" autoComplete="email" aria-invalid={!!errors.contact} {...register("contact")} />
              <FieldError message={errors.contact?.message} />
            </div>
            <div>
              <Label htmlFor={`${tool}-company`}>Şirket adı</Label>
              <Input id={`${tool}-company`} autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
              <FieldError message={errors.company?.message} />
            </div>
          </div>
          <Honeypot name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
          <KvkkCheckbox id={`${tool}-kvkk`} error={errors.kvkk?.message} {...register("kvkk")} />
          {serverError && (
            <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <FileDown />} Raporu Aç
          </Button>
          <TrustNote />
        </m.form>
      )}
    </AnimatePresence>
  );
}
