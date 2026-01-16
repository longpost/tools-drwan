import { getLangFromSearchParams, T } from "@/lib/i18n";

export const metadata = {
  title: "Tools | DrWan",
  description:
    "Health calculators: BMI, BMR, TDEE, heart rate zones, glucose, HbA1c.",
};

const tools = [
  { href: "/bmi", key: "bmiTitle", descKey: "bmiDesc" },
  { href: "/bmr", key: "bmrTitle", descKey: "bmrDesc" },
  { href: "/tdee", key: "tdeeTitle", descKey: "tdeeDesc" },
  { href: "/heart-rate", key: "hrTitle", descKey: "hrDesc" },
  { href: "/glucose", key: "gluTitle", descKey: "gluDesc" },
  { href: "/a1c", key: "a1cTitle", descKey: "a1cDesc" },
] as const;

export default function Home({
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
          <h1 className="h1" style={{ marginBottom: 6 }}>
            {t.toolsTitle}
          </h1>
          <p className="p">{t.toolsDesc}</p>
        </div>
        <a className="chip" href={lang === "zh" ? "/" : "/?lang=zh"}>
          {lang === "zh" ? "EN" : "中文"}
        </a>
      </div>

      <div className="tools-grid">
        {tools.map((x) => (
          <a
            key={x.href}
            className="card tool-card"
            href={lang === "zh" ? `${x.href}?lang=zh` : x.href}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              {(t as any)[x.key]}
            </div>
            <div className="small" style={{ marginTop: 6 }}>
              {(t as any)[x.descKey]}
            </div>
          </a>
        ))}
      </div>

      <div className="hr" />
      <div className="small">{t.note}</div>
    </div>
  );
}
