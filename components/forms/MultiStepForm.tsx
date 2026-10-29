"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { submitLead } from "@/lib/lead-client";
import { track } from "@/components/analytics/track";
import { Button } from "@/components/ui/button";
import { ChipGroup } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { businessTypes, leadSchema, needs, sizes } from "@/lib/validations";
import { FieldError, Honeypot, KvkkCheckbox, TrustNote } from "./FormParts";

const schema = leadSchema
  .pick({ name: true, contact: true, company: true, kvkk: true, businessType: true, size: true })
  .extend({ needs: leadSchema.shape.needs.unwrap().min(1, "En az bir ihtiyaç seçin") });
type Input_ = z.infer<typeof schema>;

const steps = [
  { title: "İhtiyaç", fields: ["needs"] as const },
  { title: "İşletme", fields: ["businessType", "size"] as const },
  { title: "İletişim", fields: ["name", "contact", "company", "kvkk"] as const },
];

/** Çok adımlı nitelendirme formu: 1 İhtiyaç → 2 İşletme tipi/büyüklüğü → 3 İletişim */
export function MultiStepForm({ source }: { source: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [pending, start] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const [hp, setHp] = useState("");
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<Input_>({ resolver: zodResolver(schema), defaultValues: { needs: [] }, mode: "onTouched" });

  const next = async () => {
    if (await trigger([...steps[step].fields])) {
      track("form_step", { form: "multi", step: step + 1 });
      setStep((s) => s + 1);
    }
  };

  const onSubmit = (data: Input_) =>
    start(async () => {
      setServerError(undefined);
      const res = await submitLead({ ...data, source, website: hp });
      if (!res.ok) return setServerError(res.error);
      track("generate_lead", { form: "multi", source });
      router.push(`/tesekkurler?kaynak=${encodeURIComponent(source)}`);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8">
      {/* İlerleme çubuğu */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-muted">
          {steps.map((s, i) => (
            <span key={s.title} className={i <= step ? "text-fg" : undefined}>
              {i + 1}. {s.title}
            </span>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1} aria-label="Form ilerlemesi">
          <m.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            initial={false}
            animate={{ scaleX: (step + 1) / steps.length }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          {step === 0 && (
            <Controller
              control={control}
              name="needs"
              render={({ field }) => (
                <ChipGroup name="needs" label="Hangi konuda destek arıyorsunuz?" multiple options={needs} value={field.value} onChange={(v) => field.onChange(v)} error={errors.needs?.message} />
              )}
            />
          )}
          {step === 1 && (
            <>
              <Controller
                control={control}
                name="businessType"
                render={({ field }) => <ChipGroup name="businessType" label="İşletme tipi" options={businessTypes} value={field.value} onChange={(v) => field.onChange(v)} />}
              />
              <Controller
                control={control}
                name="size"
                render={({ field }) => <ChipGroup name="size" label="Oda / çalışan sayısı" options={sizes} value={field.value} onChange={(v) => field.onChange(v)} />}
              />
              <p className="text-xs text-muted">Bu adım isteğe bağlıdır.</p>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <Label htmlFor="ms-name">Ad Soyad</Label>
                <Input id="ms-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="ms-contact">İş e-postası veya telefon</Label>
                <Input id="ms-contact" autoComplete="email" aria-invalid={!!errors.contact} {...register("contact")} />
                <FieldError message={errors.contact?.message} />
              </div>
              <div>
                <Label htmlFor="ms-company">Şirket / işletme adı</Label>
                <Input id="ms-company" autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
                <FieldError message={errors.company?.message} />
              </div>
              <Honeypot name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
              <KvkkCheckbox id="ms-kvkk" error={errors.kvkk?.message} {...register("kvkk")} />
            </>
          )}
        </m.div>
      </AnimatePresence>

      {serverError && (
        <p role="alert" className="mt-4 rounded-xl bg-danger/10 p-3 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <Button type="button" variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft /> Geri
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button type="button" size="lg" className="flex-1" onClick={next}>
            Devam <ArrowRight />
          </Button>
        ) : (
          <Button type="submit" size="lg" className="flex-1" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <ArrowRight />} Talebi Gönder
          </Button>
        )}
      </div>
      <div className="mt-4">
        <TrustNote />
      </div>
    </form>
  );
}
