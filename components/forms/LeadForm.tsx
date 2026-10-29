"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitLead } from "@/lib/lead-client";
import { track } from "@/components/analytics/track";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shortLeadSchema, type ShortLeadInput } from "@/lib/validations";
import { FieldError, Honeypot, KvkkCheckbox, TrustNote } from "./FormParts";

/** İlk temas formu: yalnızca ad, iş e-postası/telefon ve şirket adı */
export function LeadForm({ source, title = "Hızlı teklif isteyin", cta = "Teklif Al" }: { source: string; title?: string; cta?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const [hp, setHp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShortLeadInput>({ resolver: zodResolver(shortLeadSchema) });

  const onSubmit = (data: ShortLeadInput) =>
    start(async () => {
      setServerError(undefined);
      const res = await submitLead({ ...data, source, website: hp });
      if (!res.ok) return setServerError(res.error);
      track("generate_lead", { form: "short", source });
      router.push(`/tesekkurler?kaynak=${encodeURIComponent(source)}`);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-xl font-bold">{title}</p>
      <div>
        <Label htmlFor={`${source}-name`}>Ad Soyad</Label>
        <Input id={`${source}-name`} autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor={`${source}-contact`}>İş e-postası veya telefon</Label>
        <Input id={`${source}-contact`} autoComplete="email" inputMode="email" aria-invalid={!!errors.contact} {...register("contact")} />
        <FieldError message={errors.contact?.message} />
      </div>
      <div>
        <Label htmlFor={`${source}-company`}>Şirket / işletme adı</Label>
        <Input id={`${source}-company`} autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
        <FieldError message={errors.company?.message} />
      </div>
      <Honeypot name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
      <KvkkCheckbox id={`${source}-kvkk`} error={errors.kvkk?.message} {...register("kvkk")} />
      {serverError && (
        <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">
          {serverError}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : <ArrowRight />}
        {cta}
      </Button>
      <TrustNote />
    </form>
  );
}
