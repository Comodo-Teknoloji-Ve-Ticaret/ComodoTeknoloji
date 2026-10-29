"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Loader2 } from "lucide-react";
import { m } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { submitLead } from "@/lib/lead-client";
import { track } from "@/components/analytics/track";
import { Button } from "@/components/ui/button";
import { ChipGroup } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { bookingSchema, businessTypes, type BookingInput } from "@/lib/validations";
import { FieldError, Honeypot, KvkkCheckbox, TrustNote } from "./FormParts";

const SLOT_TIMES = ["10:00", "13:00", "16:00"];

/** Önümüzdeki 10 iş günü (Pazar hariç; çalışma günleri Pzt–Cmt) */
function nextWorkdays(n = 10) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  return days;
}

/** Ücretsiz keşif randevusu: yalnızca takvim slotu + isim + telefon + işletme tipi */
export function DiscoveryBooking() {
  const router = useRouter();
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [pending, start] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const [hp, setHp] = useState("");
  // Tarihler istemcide hesaplanır (SSG çıktısında eski tarih kalmaması için)
  useEffect(() => setDays(nextWorkdays()), []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = (data: BookingInput) =>
    start(async () => {
      setServerError(undefined);
      const res = await submitLead({
        ...data,
        company: "Belirtilmedi (keşif randevusu)",
        source: "ucretsiz-kesif",
        website: hp,
      });
      if (!res.ok) return setServerError(res.error);
      track("generate_lead", { form: "booking", source: "ucretsiz-kesif" });
      router.push("/tesekkurler?kaynak=ucretsiz-kesif");
    });

  const fmtDay = (d: Date) => d.toLocaleDateString("tr-TR", { weekday: "short" });
  const fmtDate = (d: Date) => d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  const slotValue = (d: Date, t: string) => `${d.toISOString().slice(0, 10)} ${t}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <Controller
        control={control}
        name="slot"
        render={({ field }) => (
          <fieldset>
            <legend className="mb-3 flex items-center gap-2 font-semibold">
              <CalendarCheck className="size-4 text-accent" aria-hidden /> Keşif günü ve saati seçin
            </legend>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Gün seçimi">
              {days.map((d, i) => (
                <button
                  key={d.toISOString()}
                  type="button"
                  role="tab"
                  aria-selected={i === day}
                  onClick={() => setDay(i)}
                  className={cn(
                    "flex min-w-16 shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 text-sm transition-colors",
                    i === day ? "border-accent bg-accent/15" : "border-border text-muted hover:text-fg",
                  )}
                >
                  <span className="text-xs uppercase">{fmtDay(d)}</span>
                  <span className="font-semibold">{fmtDate(d)}</span>
                </button>
              ))}
              {!days.length && <div className="h-[62px]" />}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Saat seçimi">
              {days[day] &&
                SLOT_TIMES.map((t) => {
                  const v = slotValue(days[day], t);
                  const sel = field.value === v;
                  return (
                    <m.button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => field.onChange(v)}
                      className={cn(
                        "h-12 rounded-xl border font-mono text-sm transition-colors",
                        sel ? "border-primary bg-primary text-primary-fg" : "border-border hover:border-accent/60",
                      )}
                    >
                      {t}
                    </m.button>
                  );
                })}
            </div>
            <FieldError message={errors.slot?.message} />
          </fieldset>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="bk-name">Ad Soyad</Label>
          <Input id="bk-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="bk-phone">Telefon</Label>
          <Input id="bk-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" aria-invalid={!!errors.contact} {...register("contact")} />
          <FieldError message={errors.contact?.message} />
        </div>
      </div>

      <Controller
        control={control}
        name="businessType"
        render={({ field }) => (
          <ChipGroup name="bk-type" label="İşletme tipi" options={businessTypes} value={field.value} onChange={(v) => field.onChange(v)} error={errors.businessType ? "İşletme tipini seçin" : undefined} />
        )}
      />

      <Honeypot name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
      <KvkkCheckbox id="bk-kvkk" error={errors.kvkk?.message} {...register("kvkk")} />
      {serverError && (
        <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">
          {serverError}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : <CalendarCheck />} Randevuyu Oluştur
      </Button>
      <TrustNote />
    </form>
  );
}
