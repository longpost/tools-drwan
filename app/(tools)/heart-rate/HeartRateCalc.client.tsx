"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

const r0 = (x: number) => Math.round(x);

export default function HeartRateCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [age, setAge] = useState("35");

  const calc = useMemo(() => {
    const a = Number(age);
    if (!(a > 0 && a < 130)) return null;

    const max = 220 - a;

    const zones = [
      { en: "Zone 1 (50–60%)", zh: "区间 1（50–60%）", lo: 0.5, hi: 0.6 },
      { en: "Zone 2 (60–70%)", zh: "区间 2（60–70%）", lo: 0.6, hi: 0.7 },
      { en: "Zone 3 (70–80%)", zh: "区间 3（70–80%）", lo: 0.7, hi: 0.8 },
      { en: "Zone 4 (80–90%)", zh: "区间 4（80–90%）", lo: 0.8, hi: 0.9 },
      { en: "Zone 5 (90–100%)", zh: "区间 5（90–100%）", lo: 0.9, hi: 1.0 },
    ];

    return {
      max,
      zones: zones.map((z) => ({
        label: lang === "zh" ? z.zh : z.en,
        low: r0(max * z.lo),
        high: r0(max * z.hi),
      })),
    };
  }, [age, lang]);

  return (
    <div className="grid">
      <section className="card" style={{ padding: 16 }}>
        <div className="field">
          <div className="label">{t.age}</div>
          <input
            className="input"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="small">Max HR estimate: 220 − age.</div>
      </section>

      <aside className="card kpi">
        <div className="sub">{t.maxHr}</div>
        <div className="big">{calc ? calc.max : "—"}</div>

        <div className="hr" />
        <div className="sub">{t.zone}</div>

        {calc ? (
          <div style={{ display: "grid", gap: 8 }}>
            {calc.zones.map((z) => (
              <div key={z.label} className="card" style={{ padding: 12 }}>
                <div style={{ fontWeight: 900 }}>{z.label}</div>
                <div className="small">
                  {z.low}–{z.high} bpm
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="small">—</div>
        )}
      </aside>
    </div>
  );
}
