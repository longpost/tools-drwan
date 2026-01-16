import A1cCalc from "./A1cCalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "HbA1c ↔ eAG | Tools",
  description: "Convert HbA1c (%) and eAG.",
};

export default function A1cPage({
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
          <h1 className="h1">{t.a1cTitle}</h1>
          <p className="p">{t.a1cDesc}</p>
        </div>
        <a className="chip" href={lang === "zh" ? "/a1c" : "/a1c?lang=zh"}>
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <A1cCalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}
