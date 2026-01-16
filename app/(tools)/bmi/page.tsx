import BMICalc from "./BMICalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "BMI Calculator | Tools",
  description:
    "BMI calculator with metric and US units, category, and healthy weight range.",
};

export default function BMIPage({
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
          <h1 className="h1">{t.bmiTitle}</h1>
          <p className="p">{t.bmiDesc}</p>
        </div>
        <a className="chip" href={lang === "zh" ? "/bmi" : "/bmi?lang=zh"}>
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <BMICalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}
