export type Lang = "en" | "zh";

export function getLangFromSearchParams(sp: Record<string, string | string[] | undefined>): Lang {
  const v = sp.lang;
  const s = Array.isArray(v) ? v[0] : v;
  return s === "zh" ? "zh" : "en";
}

export const T = {
  en: {
    toolsTitle: "Health Tools",
    toolsDesc: "Fast, simple calculators for everyday use. Educational only.",
    note: "Educational only. Not medical advice.",

    // common
    unitMetric: "Metric",
    unitUS: "US",
    height: "Height",
    weight: "Weight",
    cm: "cm",
    kg: "kg",
    ft: "ft",
    inch: "in",
    lb: "lb",
    age: "Age",
    sex: "Sex",
    male: "Male",
    female: "Female",
    activity: "Activity level",
    result: "Result",
    category: "Category",

    // BMI
    bmiTitle: "BMI Calculator",
    bmiDesc: "Calculate BMI using metric or US units. Shows category and a healthy weight range.",
    healthyRange: "Healthy weight range (BMI 18.5–24.9)",

    // BMR
    bmrTitle: "BMR Calculator",
    bmrDesc: "Estimate Basal Metabolic Rate (Mifflin–St Jeor).",
    bmrKcalDay: "BMR (kcal/day)",

    // TDEE
    tdeeTitle: "TDEE Calculator",
    tdeeDesc: "Estimate daily calories burned (TDEE) from BMR and activity level.",
    tdeeKcalDay: "TDEE (kcal/day)",
    goalCalories: "Suggested daily calories",
    mild: "Mild",
    standard: "Standard",
    aggressive: "Aggressive",
    deficit: "Deficit",
    surplus: "Surplus",

    // Heart rate
    hrTitle: "Heart Rate Zones",
    hrDesc: "Estimate max heart rate and common training zones (age-based).",
    maxHr: "Estimated max HR",
    zone: "Zone",

    // Glucose converter
    gluTitle: "Glucose Unit Converter",
    gluDesc: "Convert glucose between mg/dL and mmol/L.",
    mgdl: "mg/dL",
    mmoll: "mmol/L",

    // A1c
    a1cTitle: "HbA1c ↔ eAG",
    a1cDesc: "Convert HbA1c (%) to estimated average glucose (eAG) and back.",
    a1c: "HbA1c (%)",
    eag: "eAG (mg/dL)"
  },
  zh: {
    toolsTitle: "健康小工具",
    toolsDesc: "快速、简单、日常可用。仅用于科普教育。",
    note: "仅用于科普教育，不构成医疗建议。",

    unitMetric: "公制",
    unitUS: "美制",
    height: "身高",
    weight: "体重",
    cm: "厘米",
    kg: "公斤",
    ft: "英尺",
    inch: "英寸",
    lb: "磅",
    age: "年龄",
    sex: "性别",
    male: "男",
    female: "女",
    activity: "活动水平",
    result: "结果",
    category: "分级",

    bmiTitle: "BMI 计算器",
    bmiDesc: "支持公制/美制输入，显示 BMI、分级，以及健康体重范围（按 BMI 18.5–24.9）。",
    healthyRange: "健康体重范围（BMI 18.5–24.9）",

    bmrTitle: "BMR 基础代谢",
    bmrDesc: "估算基础代谢率（Mifflin–St Jeor 公式）。",
    bmrKcalDay: "BMR（千卡/天）",

    tdeeTitle: "TDEE 每日消耗",
    tdeeDesc: "基于 BMR + 活动水平估算每日总能量消耗（TDEE）。",
    tdeeKcalDay: "TDEE（千卡/天）",
    goalCalories: "建议每日摄入",
    mild: "温和",
    standard: "标准",
    aggressive: "激进",
    deficit: "减脂",
    surplus: "增肌",

    hrTitle: "心率训练区间",
    hrDesc: "根据年龄估算最大心率与常见训练区间。",
    maxHr: "估算最大心率",
    zone: "区间",

    gluTitle: "血糖单位换算",
    gluDesc: "mg/dL 与 mmol/L 相互换算。",
    mgdl: "mg/dL",
    mmoll: "mmol/L",

    a1cTitle: "糖化血红蛋白 HbA1c ↔ eAG",
    a1cDesc: "HbA1c（%）与估算平均血糖 eAG 相互换算。",
    a1c: "HbA1c（%）",
    eag: "eAG（mg/dL）"
  }
} as const;
