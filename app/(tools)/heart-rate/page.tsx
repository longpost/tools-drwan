import HeartRateCalc from "./HeartRateCalc.client";
import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "Heart Rate Zones | Tools",
  description: "Estimated max heart rate and zones.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function HeartRatePage({
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
          <h1 className="h1">{t.hrTitle}</h1>
          <p className="p">{t.hrDesc}</p>
        </div>
        <a
          className="chip"
          href={lang === "zh" ? "/heart-rate" : "/heart-rate?lang=zh"}
        >
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>
      <HeartRateCalc lang={lang} />
      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}

