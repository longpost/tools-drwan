import GlucoseCalc from "./GlucoseCalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "Glucose Unit Converter | Tools",
  description: "Convert glucose mg/dL and mmol/L.",
};

export default function GlucosePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const lang = getLangFromSearchParams(searchParams);
  const t = T[lang];
  return (
    <div>
      <div className="btnrow" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="h1">{t.gluTitle}</h1>
          <p className="p">{t.gluDesc}</p>
        </div>
        <a
          className="chip"
          href={lang === "zh" ? "/glucose" : "/glucose?lang=zh"}
        >
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <GlucoseCalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}
