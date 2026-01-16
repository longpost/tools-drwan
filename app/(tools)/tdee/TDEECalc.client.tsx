"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

type UnitMode = "metric" | "us";
type Sex = "male" | "female";
const r0 = (x: number) => Math.round(x);

const activity = [
  {
    k: "sedentary",
    f: 1.2,
    en: "Sedentary (little/no exercise)",
    zh: "久坐（几乎不运动）",
  },
  {
    k: "light",
    f: 1.375,
    en: "Light (1–3 days/week)",
    zh: "轻度（每周 1–3 天）",
  },
  {
    k: "moderate",
    f: 1.55,
    en: "Moderate (3–5 days/week)",
    zh: "中等（每周 3–5 天）",
  },
  {
    k: "active",
    f: 1.725,
    en: "Active (6–7 days/week)",
    zh: "较高（每周 6–7 天）",
  },
  {
    k: "very",
    f: 1.9,
    en: "Very active (physical job/training)",
    zh: "非常高（体力劳动/高强度训练）",
  },
];

export default function TDEECalc({ lang }: { lang: Lang }) {
  const t = T[lang];

  const [mode, setMode] = useState<UnitMode>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("35");
  const [act, setAct] = useState("moderate");

  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");

  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const { bmr, tdee } = useMemo(() => {
    const a = Number(age);
    if (!(a > 0 && a < 130)) return { bmr: NaN, tdee: NaN };

    let hcm = 0;
    let wkg = 0;

    if (mode === "metric") {
      hcm = Number(cm);
      wkg = Number(kg);
    } else {
      const total = (Number(ft) || 0) * 12 + (Number(inch) || 0);
      hcm = total * 2.54;
      wkg = (Number(lb) || 0) * 0.45359237;
    }

    if (!(hcm > 0 && wkg > 0)) return { bmr: NaN, tdee: NaN };

    const s = sex === "male" ? 5 : -161;
    const b = 10 * wkg + 6.25 * hcm - 5 * a + s;
    const opt = activity.find((x) => x.k === act) ?? activity[2];

    return { bmr: b, tdee: b * opt.f };
  }, [mode, sex, age, act, cm, kg, ft, inch, lb]);

  const plans = useMemo(() => {
    if (!isFinite(tdee)) return null;
    return {
      mild: { cut: tdee - 250, bulk: tdee + 250 },
      standard: { cut: tdee - 500, bulk: tdee + 500 },
      aggressive: { cut: tdee - 750, bulk: tdee + 750 },
    };
  }, [tdee]);

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

        <div className="row">
          <div className="field">
            <div className="label">{t.sex}</div>
            <select
              className="select"
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
            >
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
            </select>
          </div>
          <div className="field">
            <div className="label">{t.age}</div>
            <input
              className="input"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="label">{t.activity}</div>
          <select
            className="select"
            value={act}
            onChange={(e) => setAct(e.target.value)}
          >
            {activity.map((x) => (
              <option key={x.k} value={x.k}>
                {lang === "zh" ? x.zh : x.en}
              </option>
            ))}
          </select>
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
        <div className="sub">BMR (kcal/day)</div>
        <div className="big">{isFinite(bmr) ? r0(bmr) : "—"}</div>

        <div className="hr" />
        <div className="sub">{t.tdeeKcalDay}</div>
        <div className="big">{isFinite(tdee) ? r0(tdee) : "—"}</div>

        <div className="hr" />
        <div className="sub">{t.goalCalories}</div>

        {plans ? (
          <div className="kpiRow">
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>{t.mild}</div>
              <div className="small">
                {t.deficit}: {r0(plans.mild.cut)}
              </div>
              <div className="small">
                {t.surplus}: {r0(plans.mild.bulk)}
              </div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>{t.standard}</div>
              <div className="small">
                {t.deficit}: {r0(plans.standard.cut)}
              </div>
              <div className="small">
                {t.surplus}: {r0(plans.standard.bulk)}
              </div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>{t.aggressive}</div>
              <div className="small">
                {t.deficit}: {r0(plans.aggressive.cut)}
              </div>
              <div className="small">
                {t.surplus}: {r0(plans.aggressive.bulk)}
              </div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>Tip</div>
              <div className="small">Use mild/standard for most people.</div>
            </div>
          </div>
        ) : (
          <div className="small">—</div>
        )}
      </aside>
    </div>
  );
}
