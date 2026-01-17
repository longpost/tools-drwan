import TDEECalc from "./TDEECalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "TDEE Calculator | Tools",
  description: "TDEE calculator.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function TDEEPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const lang = getLangFromSearchParams(sp);
  const t = T[lang];

  return (
    <div>
      <div className="btnrow" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="h1">{t.tdeeTitle}</h1>
          <p className="p">{t.tdeeDesc}</p>
        </div>
        <a className="chip" href={lang === "zh" ? "/tdee" : "/tdee?lang=zh"}>
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <TDEECalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}

