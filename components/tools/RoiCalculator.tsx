"use client";

import { m } from "motion/react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EmailGate } from "@/components/forms/EmailGate";
import { Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roiConfig as C } from "@/data/tool-config";
import { formatNumber, formatTRY } from "@/lib/utils";
import { NumberField, ResultStat } from "./NumberField";

type Wall = keyof typeof C.roomsPerAp;

const series = [
  { key: "Mevcut", color: "var(--chart-before)" },
  { key: "Yenileme sonrası", color: "var(--chart-after)" },
];

function MiniBar({ title, unit, data }: { title: string; unit: string; data: { name: string; value: number }[] }) {
  return (
    <figure className="rounded-2xl border border-border bg-surface p-4">
      <figcaption className="mb-2 text-sm font-semibold">{title}</figcaption>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 22, right: 8, left: -18, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "var(--surface-2)" }}
              contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--fg)" }}
              formatter={(v) => [`${formatNumber(Number(v))} ${unit}`, title]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={900} maxBarSize={56}>
              {data.map((_, i) => (
                <Cell key={i} fill={series[i].color} />
              ))}
              <LabelList dataKey="value" position="top" formatter={(v) => formatNumber(Number(v))} style={{ fill: "var(--fg)", fontSize: 12, fontWeight: 600 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/** Ağ Yenileme Tasarruf Hesaplayıcı */
export function RoiCalculator() {
  const [rooms, setRooms] = useState(200);
  const [currentAps, setCurrentAps] = useState(30);
  const [complaints, setComplaints] = useState(40);
  const [itHours, setItHours] = useState(30);
  const [wall, setWall] = useState<Wall>("betonarme");
  const [reduction, setReduction] = useState(C.defaultReductionPct);
  const [hourly, setHourly] = useState(C.defaultHourlyCost);

  const r = useMemo(() => {
    const roomAps = Math.ceil(rooms / C.roomsPerAp[wall]);
    const commonAps = Math.max(C.minCommonAps, Math.ceil(rooms / C.commonAreaRoomsPerAp));
    const recommendedAps = roomAps + commonAps;
    const complaintHours = (complaints * C.minutesPerComplaint) / 60;
    const monthlyHoursNow = itHours + complaintHours;
    const monthlyHoursAfter = monthlyHoursNow * (1 - reduction / 100);
    const savedHoursYear = (monthlyHoursNow - monthlyHoursAfter) * 12;
    const savedMoneyYear = savedHoursYear * hourly;
    const complaintsAfter = Math.round(complaints * (1 - reduction / 100));
    const budget = C.apInstalledCost ? { min: recommendedAps * C.apInstalledCost.min, max: recommendedAps * C.apInstalledCost.max } : null;
    return { roomAps, commonAps, recommendedAps, monthlyHoursNow, monthlyHoursAfter, savedHoursYear, savedMoneyYear, complaintsAfter, budget };
  }, [rooms, currentAps, complaints, itHours, wall, reduction, hourly]);

  const summary = [
    `Oda: ${rooms}, mevcut AP: ${currentAps}, duvar: ${wall}`,
    `Aylık şikayet: ${complaints}, IT destek saati: ${itHours}`,
    `Önerilen AP: ${r.recommendedAps} (oda ${r.roomAps} + ortak alan ${r.commonAps})`,
    `Varsayılan azalma: %${reduction}, yıllık tasarruf: ${formatNumber(r.savedHoursYear)} saat / ${formatTRY(r.savedMoneyYear)}`,
  ].join(" | ");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <form className="space-y-5 rounded-2xl border border-border bg-surface p-6" onSubmit={(e) => e.preventDefault()} aria-label="Hesaplayıcı girdileri">
        <NumberField id="rooms" label="Oda sayısı" value={rooms} onChange={setRooms} min={1} max={5000} />
        <NumberField id="aps" label="Mevcut access point sayısı" value={currentAps} onChange={setCurrentAps} max={5000} />
        <NumberField id="complaints" label="Aylık Wi-Fi şikayeti" value={complaints} onChange={setComplaints} max={10000} hint="Resepsiyon ve IT'ye gelen toplam şikayet" />
        <NumberField id="ithours" label="Aylık IT destek saati (ağ kaynaklı)" value={itHours} onChange={setItHours} max={2000} suffix="saat" />
        <div>
          <Label htmlFor="wall">Bina / duvar yapısı</Label>
          <Select id="wall" value={wall} onChange={(e) => setWall(e.target.value as Wall)}>
            <option value="betonarme">Betonarme (kalın duvar)</option>
            <option value="karma">Karma</option>
            <option value="hafif">Hafif / alçıpan</option>
          </Select>
        </div>
        <details className="rounded-xl border border-border p-4">
          <summary className="cursor-pointer text-sm font-medium">Varsayımları düzenle</summary>
          <div className="mt-4 space-y-4">
            <NumberField id="reduction" label="Beklenen şikayet/destek azalması" value={reduction} onChange={setReduction} max={90} suffix="%" hint="Varsayımdır; kendi hedefinizi girin." />
            <NumberField id="hourly" label="Saatlik iş gücü maliyeti" value={hourly} onChange={setHourly} max={100000} suffix="₺" />
          </div>
        </details>
      </form>

      <section aria-live="polite" aria-label="Hesaplama sonucu" className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ResultStat label="Önerilen AP" value={r.recommendedAps} sub={`${r.roomAps} oda + ${r.commonAps} ortak alan`} />
          <ResultStat label="Yıllık kazanılan saat" value={formatNumber(r.savedHoursYear)} sub={`%${reduction} azalma varsayımıyla`} />
          <ResultStat label="Yıllık iş gücü tasarrufu" value={formatTRY(r.savedMoneyYear)} sub="Tahmini" />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted" aria-label="Grafik açıklaması">
          {series.map((s) => (
            <span key={s.key} className="flex items-center gap-2">
              <span aria-hidden className="size-3 rounded-sm" style={{ background: s.color }} />
              {s.key}
            </span>
          ))}
        </div>
        <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2">
          <MiniBar title="Access point sayısı" unit="AP" data={[{ name: "Mevcut", value: currentAps }, { name: "Önerilen", value: r.recommendedAps }]} />
          <MiniBar
            title="Aylık destek yükü"
            unit="saat"
            data={[{ name: "Mevcut", value: Math.round(r.monthlyHoursNow) }, { name: "Sonrası", value: Math.round(r.monthlyHoursAfter) }]}
          />
        </m.div>

        <div className="rounded-2xl border border-border bg-surface p-4 text-sm">
          <p className="font-semibold">Kaba bütçe aralığı</p>
          <p className="mt-1 text-muted">
            {r.budget
              ? `${formatTRY(r.budget.min)} – ${formatTRY(r.budget.max)} (AP, montaj ve lisans; kablolama hariç, KDV hariç)`
              : "Bütçe; AP modeli, kablolama durumu ve switch ihtiyacına göre değişir. Ücretsiz keşif sonrası kalem kalem teklif sunuyoruz."}
          </p>
        </div>

        <EmailGate tool="ag-yenileme-hesaplayici" summary={summary}>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-bold">Ağ yenileme ön raporu</h2>
            <table className="mt-4 w-full text-sm">
              <caption className="sr-only">Hesaplama detayları</caption>
              <tbody className="[&_td]:py-2 [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-medium [&_tr]:border-b [&_tr]:border-border">
                <tr><th scope="row">Oda içi AP ihtiyacı</th><td>{r.roomAps} (her {C.roomsPerAp[wall]} odaya 1 AP)</td></tr>
                <tr><th scope="row">Ortak alan AP ihtiyacı</th><td>{r.commonAps} (her {C.commonAreaRoomsPerAp} odaya 1, en az {C.minCommonAps})</td></tr>
                <tr><th scope="row">Mevcut / önerilen AP farkı</th><td>{r.recommendedAps - currentAps > 0 ? `+${r.recommendedAps - currentAps}` : r.recommendedAps - currentAps}</td></tr>
                <tr><th scope="row">Aylık destek yükü</th><td>{formatNumber(r.monthlyHoursNow, 1)} → {formatNumber(r.monthlyHoursAfter, 1)} saat</td></tr>
                <tr><th scope="row">Aylık şikayet (tahmini)</th><td>{complaints} → {r.complaintsAfter}</td></tr>
                <tr><th scope="row">Yıllık iş gücü tasarrufu</th><td>{formatTRY(r.savedMoneyYear)}</td></tr>
              </tbody>
            </table>
            <h3 className="mt-6 font-semibold">Öneriler</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>{wall === "betonarme" ? "Betonarme yapıda koridor tipi yerleşim yerine oda içi (in-room) AP çözümünü değerlendirin." : "Tavan tipi AP'lerle koridor yerleşimi yeterli olabilir; site survey ile doğrulayın."}</li>
              <li>Misafir, personel, PMS/POS ve kamera trafiğini ayrı VLAN'larda tutun.</li>
              <li>Yeni AP'ler için switch PoE bütçesini ve multi-gigabit port ihtiyacını kontrol edin.</li>
              <li>Misafir ağını 5651 uyumlu hotspot ile birlikte planlayın.</li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              Bu rapor varsayımlara dayalı bir ön tahmindir. Kesin AP sayısı ve bütçe yalnızca saha ölçümü (site survey) ile belirlenir.
            </p>
          </div>
        </EmailGate>
      </section>
    </div>
  );
}
