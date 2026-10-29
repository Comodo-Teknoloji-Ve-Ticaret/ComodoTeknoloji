import { z } from "zod";

const phoneRe = /^\+?[\d\s()-]{10,18}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const businessTypes = [
  { value: "otel", label: "Otel / Resort" },
  { value: "fabrika", label: "Fabrika / Depo" },
  { value: "site", label: "Site / Rezidans" },
  { value: "avm", label: "AVM / Mağaza" },
  { value: "restoran", label: "Restoran / Kafe" },
  { value: "ofis", label: "Ofis / Klinik" },
  { value: "diger", label: "Diğer" },
] as const;

export const needs = [
  { value: "network", label: "Network / Wi-Fi" },
  { value: "kamera", label: "Güvenlik kamerası" },
  { value: "pts", label: "Plaka tanıma / bariyer" },
  { value: "5651", label: "5651 loglama / hotspot" },
  { value: "zayif-akim", label: "Zayıf akım / kablolama" },
  { value: "siber", label: "Siber güvenlik" },
  { value: "yazilim", label: "Yazılım / entegrasyon" },
  { value: "bakim", label: "Bakım ve destek" },
] as const;

export const sizes = [
  { value: "kucuk", label: "1–50 oda / kişi" },
  { value: "orta", label: "51–250" },
  { value: "buyuk", label: "251–750" },
  { value: "cok-buyuk", label: "750+" },
] as const;

type V<T extends readonly { value: string }[]> = T[number]["value"];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Adınızı yazın").max(80),
  contact: z
    .string()
    .trim()
    .refine((v) => emailRe.test(v) || phoneRe.test(v), "Geçerli bir e-posta veya telefon girin"),
  company: z.string().trim().min(2, "Şirket adını yazın").max(120),
  kvkk: z.literal(true, { errorMap: () => ({ message: "Devam etmek için aydınlatma metnini onaylayın" }) }),
  needs: z.array(z.enum(needs.map((n) => n.value) as [V<typeof needs>, ...V<typeof needs>[]])).optional(),
  businessType: z.enum(businessTypes.map((b) => b.value) as [V<typeof businessTypes>, ...V<typeof businessTypes>[]]).optional(),
  size: z.enum(sizes.map((s) => s.value) as [V<typeof sizes>, ...V<typeof sizes>[]]).optional(),
  slot: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
  toolResult: z.string().max(4000).optional(),
  source: z.string().max(200),
  /** honeypot: insanlar görmez, botlar doldurur */
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Kısa form (ilk temas): yalnızca ad, iletişim, şirket */
export const shortLeadSchema = leadSchema.pick({ name: true, contact: true, company: true, kvkk: true });
export type ShortLeadInput = z.infer<typeof shortLeadSchema>;

/** Keşif randevusu: slot + ad + telefon + işletme tipi */
export const bookingSchema = z.object({
  slot: z.string().min(1, "Bir zaman dilimi seçin"),
  name: z.string().trim().min(2, "Adınızı yazın"),
  contact: z.string().trim().regex(phoneRe, "Geçerli bir telefon girin"),
  businessType: leadSchema.shape.businessType.unwrap(),
  kvkk: leadSchema.shape.kvkk,
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const gateSchema = z.object({
  contact: z.string().trim().regex(emailRe, "Geçerli bir iş e-postası girin"),
  company: z.string().trim().min(2, "Şirket adını yazın"),
  kvkk: leadSchema.shape.kvkk,
});
export type GateInput = z.infer<typeof gateSchema>;
