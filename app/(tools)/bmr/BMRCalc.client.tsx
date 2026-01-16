"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

type UnitMode = "metric" | "us";
type Sex = "male" | "female";
const r0 = (x: number) => Math.round(x);

export default function BMRCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [mode, setMode] = useState<UnitMode>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("35");

  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");

  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const bmr = useMemo(() => {
    const a = Number(age);
    if (!(a > 0 && a < 130)) return NaN;

    let heightCm = 0;
    let weightKg = 0;

    if (mode === "metric") {
      heightCm = Number(cm);
      weightKg = Number(kg);
    } else {
      const totalIn = (Number(ft) || 0) * 12 + (Number(inch) || 0);
      heightCm = totalIn * 2.54;
      weightKg = (Number(lb) || 0) * 0.45359237;
    }

    if (!(heightCm > 0 && weightKg > 0)) return NaN;

    const s = sex === "male" ? 5 : -161;
    return 10 * weightKg + 6.25 * heightCm - 5 * a + s;
  }, [mode, sex, age, cm, kg, ft, inch, lb]);

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
        <div className="sub">{t.bmrKcalDay}</div>
        <div className="big">{isFinite(bmr) ? r0(bmr) : "—"}</div>
        <div className="small">Mifflin–St Jeor</div>
      </aside>
    </div>
  );
}
