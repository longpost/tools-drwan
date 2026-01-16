"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

type UnitMode = "metric" | "us";

const round1 = (x: number) => Math.round(x * 10) / 10;

function bmiCategory(bmi: number) {
  if (!isFinite(bmi) || bmi <= 0) return "";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}
function bmiCategoryZh(bmi: number) {
  if (!isFinite(bmi) || bmi <= 0) return "";
  if (bmi < 18.5) return "偏瘦";
  if (bmi < 25) return "正常";
  if (bmi < 30) return "超重";
  return "肥胖";
}

export default function BMICalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [mode, setMode] = useState<UnitMode>("metric");

  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const computed = useMemo(() => {
    let heightM = 0;
    let weightKg = 0;

    if (mode === "metric") {
      const h = Number(cm);
      const w = Number(kg);
      heightM = h > 0 ? h / 100 : 0;
      weightKg = w > 0 ? w : 0;
    } else {
      const totalIn = (Number(ft) || 0) * 12 + (Number(inch) || 0);
      heightM = totalIn > 0 ? totalIn * 0.0254 : 0;
      weightKg = (Number(lb) || 0) * 0.45359237;
    }

    const bmi =
      heightM > 0 && weightKg > 0 ? weightKg / (heightM * heightM) : NaN;

    const minKg = heightM > 0 ? 18.5 * heightM * heightM : NaN;
    const maxKg = heightM > 0 ? 24.9 * heightM * heightM : NaN;

    const minLb = isFinite(minKg) ? minKg / 0.45359237 : NaN;
    const maxLb = isFinite(maxKg) ? maxKg / 0.45359237 : NaN;

    return { bmi, minKg, maxKg, minLb, maxLb };
  }, [mode, cm, kg, ft, inch, lb]);

  const cat =
    lang === "zh" ? bmiCategoryZh(computed.bmi) : bmiCategory(computed.bmi);

  return (
    <div className="grid">
      <section className="card" style={{ padding: 16 }}>
        <div className="btnrow" style={{ marginBottom: 8 }}>
          <button
            className="chip"
            aria-pressed={mode === "metric"}
            onClick={() => setMode("metric")}
          >
            {t.unitMetric}
          </button>
          <button
            className="chip"
            aria-pressed={mode === "us"}
            onClick={() => setMode("us")}
          >
            {t.unitUS}
          </button>
        </div>

        {mode === "metric" ? (
          <>
            <div className="field">
              <div className="label">
                {t.height} ({t.cm})
              </div>
              <input
                className="input"
                inputMode="decimal"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
              />
            </div>
            <div className="field">
              <div className="label">
                {t.weight} ({t.kg})
              </div>
              <input
                className="input"
                inputMode="decimal"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="field">
                <div className="label">
                  {t.height} ({t.ft})
                </div>
                <input
                  className="input"
                  inputMode="numeric"
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                />
              </div>
              <div className="field">
                <div className="label">
                  {t.height} ({t.inch})
                </div>
                <input
                  className="input"
                  inputMode="numeric"
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="label">
                {t.weight} ({t.lb})
              </div>
              <input
                className="input"
                inputMode="decimal"
                value={lb}
                onChange={(e) => setLb(e.target.value)}
              />
            </div>
          </>
        )}
      </section>

      <aside className="card kpi">
        <div className="sub">{t.result}</div>
        <div className="big">
          {isFinite(computed.bmi) ? round1(computed.bmi) : "—"}
        </div>

        <div className="hr" />
        <div className="sub">{t.category}</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>{cat || "—"}</div>

        <div className="hr" />
        <div className="sub">{t.healthyRange}</div>
        {isFinite(computed.minKg) && isFinite(computed.maxKg) ? (
          <div className="small" style={{ fontSize: 14 }}>
            {mode === "metric" ? (
              <>
                {Math.round(computed.minKg)}–{Math.round(computed.maxKg)} {t.kg}
              </>
            ) : (
              <>
                {Math.round(computed.minLb)}–{Math.round(computed.maxLb)} {t.lb}
              </>
            )}
          </div>
        ) : (
          <div className="small">—</div>
        )}
      </aside>
    </div>
  );
}
