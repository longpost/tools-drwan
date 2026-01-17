import BMRCalc from "./BMRCalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "BMR Calculator | Tools",
  description: "BMR calculator using Mifflin–St Jeor.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function BMRPage({
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
          <h1 className="h1">{t.bmrTitle}</h1>
          <p className="p">{t.bmrDesc}</p>
        </div>
        <a className="chip" href={lang === "zh" ? "/bmr" : "/bmr?lang=zh"}>
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <BMRCalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}
