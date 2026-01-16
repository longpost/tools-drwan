"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

type Mode = "mgdl" | "mmoll";
const r1 = (x: number) => Math.round(x * 10) / 10;

export default function GlucoseCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [mode, setMode] = useState<Mode>("mgdl");
  const [val, setVal] = useState("100");

  const out = useMemo(() => {
    const x = Number(val);
    if (!(x > 0)) return { mgdl: NaN, mmoll: NaN };
    return { mmoll: x / 18, mgdl: x * 18 };
  }, [val]);

  return (
    <div className="grid">
      <section className="card" style={{ padding: 16 }}>
        <div className="btnrow" style={{ marginBottom: 8 }}>
          <button
            className="chip"
            aria-pressed={mode === "mgdl"}
            onClick={() => setMode("mgdl")}
          >
            {t.mgdl} → {t.mmoll}
          </button>
          <button
            className="chip"
            aria-pressed={mode === "mmoll"}
            onClick={() => setMode("mmoll")}
          >
            {t.mmoll} → {t.mgdl}
          </button>
        </div>

        <div className="field">
          <div className="label">{mode === "mgdl" ? t.mgdl : t.mmoll}</div>
          <input
            className="input"
            inputMode="decimal"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>

        <div className="small">Formula: mmol/L = mg/dL ÷ 18</div>
      </section>

      <aside className="card kpi">
        <div className="sub">{t.result}</div>
        {mode === "mgdl" ? (
          <>
            <div className="big">
              {isFinite(out.mmoll) ? r1(out.mmoll) : "—"}
            </div>
            <div className="small">{t.mmoll}</div>
          </>
        ) : (
          <>
            <div className="big">{isFinite(out.mgdl) ? r1(out.mgdl) : "—"}</div>
            <div className="small">{t.mgdl}</div>
          </>
        )}
      </aside>
    </div>
  );
}
