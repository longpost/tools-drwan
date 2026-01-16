"use client";

import React, { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { T } from "@/lib/i18n";

type Mode = "a1c_to_eag" | "eag_to_a1c";
const r1 = (x: number) => Math.round(x * 10) / 10;

export default function A1cCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [mode, setMode] = useState<Mode>("a1c_to_eag");
  const [val, setVal] = useState("5.7");

  const out = useMemo(() => {
    const x = Number(val);
    if (!(x > 0)) return { a1c: NaN, eag: NaN };
    const eag = 28.7 * x - 46.7;
    const a1c = (x + 46.7) / 28.7;
    return { a1c, eag };
  }, [val]);

  return (
    <div className="grid">
      <section className="card" style={{ padding: 16 }}>
        <div className="btnrow" style={{ marginBottom: 8 }}>
          <button
            className="chip"
            aria-pressed={mode === "a1c_to_eag"}
            onClick={() => setMode("a1c_to_eag")}
          >
            {t.a1c} → {t.eag}
          </button>
          <button
            className="chip"
            aria-pressed={mode === "eag_to_a1c"}
            onClick={() => setMode("eag_to_a1c")}
          >
            {t.eag} → {t.a1c}
          </button>
        </div>

        <div className="field">
          <div className="label">{mode === "a1c_to_eag" ? t.a1c : t.eag}</div>
          <input
            className="input"
            inputMode="decimal"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>

        <div className="small">Formula: eAG = 28.7×A1c − 46.7</div>
      </section>

      <aside className="card kpi">
        <div className="sub">{t.result}</div>
        {mode === "a1c_to_eag" ? (
          <>
            <div className="big">{isFinite(out.eag) ? r1(out.eag) : "—"}</div>
            <div className="small">{t.eag}</div>
          </>
        ) : (
          <>
            <div className="big">{isFinite(out.a1c) ? r1(out.a1c) : "—"}</div>
            <div className="small">{t.a1c}</div>
          </>
        )}
      </aside>
    </div>
  );
}
