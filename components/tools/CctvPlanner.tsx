"use client";

import { useMemo, useState } from "react";
import { EmailGate } from "@/components/forms/EmailGate";
import { ChipGroup } from "@/components/ui/chip";
import { Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cctvConfig as C } from "@/data/tool-config";
import { formatNumber } from "@/lib/utils";
import { NumberField, ResultStat } from "./NumberField";

type Area = keyof typeof C.areaTypes;
type Dori = keyof typeof C.dori;
type Res = keyof typeof C.resolutions;
type Mode = "surekli" | "hareket";

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Bir kameranın istenen DORI seviyesinde kapsadığı alan:
 *   sahne genişliği W = yatay piksel / (px/m)
 *   mesafe D = W / (2·tan(HFOV/2)), alan tipinin pratik menzili ile sınırlı
 *   kapsama ≈ ½·W·D (üçgen koni) × etkin kullanım katsayısı
 */
function coveragePerCamera(res: Res, dori: Dori, area: Area) {
  const lensMm = C.lensByDori[dori];
  const lens = C.lenses.find((l) => l.mm === lensMm)!;
  const half = Math.tan(rad(lens.hfov / 2));
  let width = C.resolutions[res] / C.dori[dori].ppm;
  let distance = width / (2 * half);
  if (distance > C.areaTypes[area].maxRange) {
    distance = C.areaTypes[area].maxRange;
    width = 2 * distance * half;
  }
  return { lens, width, distance, area: 0.5 * width * distance * C.areaTypes[area].efficiency };
}

export function CctvPlanner() {
  const [area, setArea] = useState<Area>("ic");
  const [m2, setM2] = useState(1500);
  const [entrances, setEntrances] = useState(3);
  const [dori, setDori] = useState<Dori>("recognition");
  const [res, setRes] = useState<Res>("4MP");
  const [days, setDays] = useState<"30" | "60" | "90">("30");
  const [mode, setMode] = useState<Mode>("surekli");

  const r = useMemo(() => {
    const cov = coveragePerCamera(res, dori, area);
    const areaCams = Math.max(1, Math.ceil(m2 / cov.area));
    const entranceCov = coveragePerCamera(res, "identification", "ic");
    const total = areaCams + entrances;
    const mbps = C.bitrateMbps[res] * (mode === "hareket" ? C.motionRecordingFactor : 1);
    const totalMbps = total * mbps;
    // 1 Mbps × 86.400 sn = 10,8 GB/gün
    const storageTB = (totalMbps * 10.8 * Number(days)) / 1000;
    const disks = Math.max(1, Math.ceil(storageTB / C.diskSizeTB));
    const nvr = C.nvrChannelTiers.find((t) => t >= total) ?? C.nvrChannelTiers.at(-1)!;
    const poe = total * C.poeWattsPerCamera * C.poeHeadroom;
    return { cov, entranceCov, areaCams, total, totalMbps, storageTB, disks, nvr, poe };
  }, [area, m2, entrances, dori, res, days, mode]);

  const summary = [
    `Alan: ${C.areaTypes[area].label}, ${m2} m², giriş: ${entrances}, DORI: ${C.dori[dori].label}, ${res}`,
    `Kamera: ${r.total} (${r.areaCams} alan + ${entrances} giriş), lens ${r.cov.lens.mm} mm`,
    `Depolama: ${formatNumber(r.storageTB, 1)} TB / ${days} gün (${mode}), NVR ${r.nvr} kanal, PoE ${Math.round(r.poe)} W`,
  ].join(" | ");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <form className="space-y-5 rounded-2xl border border-border bg-surface p-6" onSubmit={(e) => e.preventDefault()} aria-label="Planlayıcı girdileri">
        <div>
          <Label htmlFor="area">Alan tipi</Label>
          <Select id="area" value={area} onChange={(e) => setArea(e.target.value as Area)}>
            {Object.entries(C.areaTypes).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </Select>
        </div>
        <NumberField id="m2" label="İzlenecek alan" value={m2} onChange={setM2} min={10} max={500000} suffix="m²" />
        <NumberField id="entrances" label="Giriş / çıkış sayısı" value={entrances} onChange={setEntrances} max={200} hint="Her girişe kimlik seviyesinde bir kamera eklenir." />
        <ChipGroup
          name="dori"
          label="Alan için istenen DORI seviyesi"
          options={Object.entries(C.dori).map(([k, v]) => ({ value: k as Dori, label: `${v.label} (${v.ppm} px/m)` }))}
          value={dori}
          onChange={(v) => setDori(v as Dori)}
        />
        <ChipGroup name="res" label="Kamera çözünürlüğü" options={[{ value: "4MP", label: "4 MP" }, { value: "8MP", label: "8 MP (4K)" }] as const} value={res} onChange={(v) => setRes(v as Res)} />
        <ChipGroup name="days" label="Kayıt saklama süresi" options={[{ value: "30", label: "30 gün" }, { value: "60", label: "60 gün" }, { value: "90", label: "90 gün" }] as const} value={days} onChange={(v) => setDays(v as typeof days)} />
        <ChipGroup name="mode" label="Kayıt modu" options={[{ value: "surekli", label: "Sürekli" }, { value: "hareket", label: "Hareket bazlı" }] as const} value={mode} onChange={(v) => setMode(v as Mode)} />
      </form>

      <section aria-live="polite" aria-label="Planlama sonucu" className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ResultStat label="Önerilen kamera" value={r.total} sub={`${r.areaCams} alan + ${entrances} giriş`} />
          <ResultStat label="Lens" value={`${r.cov.lens.mm} mm`} sub={`~${r.cov.lens.hfov}° yatay açı`} />
          <ResultStat label="Depolama" value={`${formatNumber(r.storageTB, 1)} TB`} sub={`${days} gün · ${r.disks} × ${C.diskSizeTB} TB disk`} />
          <ResultStat label="NVR kapasitesi" value={`${r.nvr} kanal`} sub={`Gelen bant: ${formatNumber(r.totalMbps, 0)} Mbps`} />
          <ResultStat label="PoE bütçesi" value={`${Math.round(r.poe)} W`} sub={`%${Math.round((C.poeHeadroom - 1) * 100)} güç payı dahil`} />
          <ResultStat label="Kamera başı kapsama" value={`~${Math.round(r.cov.area)} m²`} sub={`${formatNumber(r.cov.distance, 1)} m mesafe · ${formatNumber(r.cov.width, 1)} m genişlik`} />
        </div>

        <EmailGate tool="cctv-planlayici" summary={summary}>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-bold">CCTV ön planlama raporu</h2>
            <table className="mt-4 w-full text-sm">
              <caption className="sr-only">Hesaplama detayları</caption>
              <tbody className="[&_td]:py-2 [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-medium [&_tr]:border-b [&_tr]:border-border">
                <tr><th scope="row">DORI hedefi</th><td>{C.dori[dori].label} — {C.dori[dori].ppm} px/m</td></tr>
                <tr><th scope="row">Sahne genişliği / mesafe</th><td>{formatNumber(r.cov.width, 1)} m / {formatNumber(r.cov.distance, 1)} m</td></tr>
                <tr><th scope="row">Etkin kapsama katsayısı</th><td>%{Math.round(C.areaTypes[area].efficiency * 100)} (engeller ve örtüşme payı)</td></tr>
                <tr><th scope="row">Giriş kameraları</th><td>{entrances} adet, {r.entranceCov.lens.mm} mm, kimlik seviyesi ({formatNumber(r.entranceCov.distance, 1)} m'ye kadar)</td></tr>
                <tr><th scope="row">Bit hızı</th><td>{C.bitrateMbps[res]} Mbps/kamera (H.265){mode === "hareket" ? `, hareket bazlı ×${C.motionRecordingFactor}` : ""}</td></tr>
                <tr><th scope="row">Depolama formülü</th><td>{formatNumber(r.totalMbps, 1)} Mbps × 10,8 GB/gün × {days} gün = {formatNumber(r.storageTB, 1)} TB</td></tr>
                <tr><th scope="row">Önerilen PoE switch</th><td>{r.total} port ve en az {Math.round(r.poe)} W PoE bütçesi</td></tr>
              </tbody>
            </table>
            <h3 className="mt-6 font-semibold">Öneriler</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Disk sayısı 3 ve üzerindeyse RAID 5/6 ile bir disk arızasında kayıt kaybını önleyin.</li>
              <li>Kamera ağını ayrı bir VLAN'da tutun, uzaktan erişimi VPN veya üretici bulutu üzerinden yetkili kullanıcılarla sınırlayın.</li>
              <li>Karanlık veya geniş çevre alanlarında termal kamera ve video analitiği değerlendirin.</li>
              <li>KVKK için kamera alanlarına aydınlatma levhası koyun ve saklama süresini politikanıza yazın.</li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              Lens açıları ve bit hızları tipik değerlerdir; kesin yerleşim kat planı üzerinde görüş konisi analizi ile belirlenir.
            </p>
          </div>
        </EmailGate>
      </section>
    </div>
  );
}
