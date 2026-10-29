"use client";

import { AlertTriangle, CheckCircle2, OctagonAlert } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { EmailGate } from "@/components/forms/EmailGate";
import { Button } from "@/components/ui/button";
import { riskQuestions } from "@/data/tool-config";
import { cn } from "@/lib/utils";

type Answers = Record<string, boolean | undefined>;

const levels = [
  { max: 25, label: "Düşük risk", color: "var(--success)", Icon: CheckCircle2, text: "Temel 5651 gereksinimleri büyük ölçüde karşılanıyor." },
  { max: 55, label: "Orta risk", color: "var(--amber)", Icon: AlertTriangle, text: "Önemli eksikler var; denetim öncesi giderilmesi önerilir." },
  { max: 101, label: "Yüksek risk", color: "var(--danger)", Icon: OctagonAlert, text: "Kayıtlarınız denetimde ispat değeri taşımayabilir." },
];

/** Yarım daire gösterge: yay pathLength ile dolar, ibre rotate ile döner (yalnızca transform) */
function Gauge({ score, color }: { score: number; color: string }) {
  const reduce = useReducedMotion();
  const pct = score / 100;
  return (
    <svg viewBox="0 0 220 130" className="mx-auto w-full max-w-xs" role="img" aria-label={`Risk skoru 100 üzerinden ${score}`}>
      <path d="M20 115 A90 90 0 0 1 200 115" fill="none" stroke="var(--surface-2)" strokeWidth="16" strokeLinecap="round" />
      <m.path
        d="M20 115 A90 90 0 0 1 200 115"
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.max(0.001, pct) }}
        transition={{ duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.g
        initial={{ rotate: -90 }}
        animate={{ rotate: -90 + pct * 180 }}
        transition={{ duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "110px 115px", transformBox: "view-box" }}
      >
        <line x1="110" y1="115" x2="110" y2="42" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" />
      </m.g>
      <circle cx="110" cy="115" r="7" fill="var(--fg)" />
      <text x="20" y="128" fontSize="10" fill="var(--muted)" textAnchor="middle">0</text>
      <text x="200" y="128" fontSize="10" fill="var(--muted)" textAnchor="middle">100</text>
    </svg>
  );
}

export function RiskScorecard() {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const answered = riskQuestions.filter((q) => answers[q.id] !== undefined).length;

  const result = useMemo(() => {
    const risky = riskQuestions.filter((q) => answers[q.id] === q.riskyAnswer);
    const score = risky.reduce((s, q) => s + q.weight, 0);
    const level = levels.find((l) => score < l.max)!;
    return { risky, score, level };
  }, [answers]);

  const summary = `5651 risk skoru: ${result.score}/100 (${result.level.label}). Eksikler: ${result.risky.map((q) => q.id).join(", ") || "yok"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <form
        aria-label="5651 risk soruları"
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        <ol className="space-y-3">
          {riskQuestions.map((q, i) => (
            <li key={q.id} className="rounded-2xl border border-border bg-surface p-5">
              <fieldset>
                <legend className="font-medium">
                  <span className="mr-2 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {q.q}
                </legend>
                <div className="mt-3 flex gap-2">
                  {[
                    { v: true, l: "Evet" },
                    { v: false, l: "Hayır" },
                  ].map((o) => (
                    <label
                      key={o.l}
                      className={cn(
                        "cursor-pointer rounded-full border px-5 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                        answers[q.id] === o.v ? "border-accent bg-accent/15" : "border-border text-muted hover:text-fg",
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        className="sr-only"
                        checked={answers[q.id] === o.v}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.v }))}
                      />
                      {o.l}
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        <Button type="submit" size="lg" className="w-full" disabled={answered < riskQuestions.length}>
          {answered < riskQuestions.length ? `${answered}/${riskQuestions.length} soru yanıtlandı` : "Risk skorumu göster"}
        </Button>
      </form>

      <section aria-live="polite" aria-label="Risk sonucu" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          {showResult ? (
            <>
              <Gauge score={result.score} color={result.level.color} />
              <p className="mt-2 text-4xl font-bold tabular-nums">{result.score}<span className="text-lg text-muted">/100</span></p>
              <p className="mt-2 inline-flex items-center gap-2 font-semibold" style={{ color: result.level.color }}>
                <result.level.Icon className="size-5" aria-hidden /> {result.level.label}
              </p>
              <p className="mt-2 text-sm text-muted">{result.level.text}</p>
              <p className="mt-4 text-sm">
                <strong>{result.risky.length}</strong> kritik eksik tespit edildi.
              </p>
            </>
          ) : (
            <>
              <Gauge score={0} color="var(--muted)" />
              <p className="mt-2 text-muted">Soruları yanıtlayın, risk skorunuz burada görünsün.</p>
            </>
          )}
        </div>

        {showResult && (
          <div className="mt-5">
            <EmailGate tool="5651-risk-testi" summary={summary}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-left">
                <h2 className="text-xl font-bold">5651 uyumluluk önerileri</h2>
                {result.risky.length ? (
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
                    {[...result.risky]
                      .sort((a, b) => b.weight - a.weight)
                      .map((q) => (
                        <li key={q.id}>
                          <span className="font-medium">{q.fix}</span>
                          <span className="ml-1 text-muted">(risk ağırlığı: {q.weight})</span>
                        </li>
                      ))}
                  </ol>
                ) : (
                  <p className="mt-3 text-sm text-muted">Tüm temel kontroller olumlu. Yıllık bir yapılandırma denetimi ile durumu koruyun.</p>
                )}
                <p className="mt-4 text-xs text-muted">Bu test hukuki görüş değildir; güncel mevzuatı hukuk danışmanınızla doğrulayın.</p>
              </div>
            </EmailGate>
          </div>
        )}
      </section>
    </div>
  );
}
