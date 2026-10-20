/** Body-comp + nutrition math used across the plan. */

export const KCAL_PER_KG_FAT = 7700;

export const round = (n: number, d = 0) => {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
};

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Mifflin–St Jeor */
export function bmr(weightKg: number, heightCm: number, ageYr: number, male = true) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYr;
  return male ? base + 5 : base - 161;
}

export type Activity = "desk_light" | "desk_moderate" | "desk_high";

export const ACTIVITY_FACTORS: Record<Activity, { label: string; factor: number; hint: string }> = {
  desk_light: { label: "Desk job · <6k steps", factor: 1.3, hint: "Office + 3 gym days, no deliberate walking (you today)" },
  desk_moderate: { label: "Desk job · 8–10k steps", factor: 1.42, hint: "Office + gym + daily walks (recommended)" },
  desk_high: { label: "Desk job · 12k+ steps", factor: 1.55, hint: "Office + gym + walking + weekend sport" },
};

export function tdee(bmrVal: number, activity: Activity) {
  return bmrVal * ACTIVITY_FACTORS[activity].factor;
}

/**
 * Hybrid field estimate for men: Deurenberg's BMI equation corrected by
 * waist-to-height ratio. Circumference-only formulas (US Navy) read absurdly low
 * on wide-necked, broad-framed men, so we blend two methods instead.
 */
export function estimateBodyFat(weightKg: number, heightCm: number, ageYr: number, waistInch: number) {
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  const whtr = (waistInch * 2.54) / heightCm;
  const deurenberg = 1.2 * bmi + 0.23 * ageYr - 16.2;
  // Waist-to-height then nudges the BMI estimate up or down for your build.
  const adjusted = deurenberg + (whtr - 0.48) * 55;
  return clamp(round(adjusted, 1), 6, 38);
}

export type MacroPlan = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  proteinKcal: number;
  carbKcal: number;
  fatKcal: number;
  deficit: number;
  weeklyLossKg: number;
};

/**
 * Protein is anchored to goal/lean body mass (1.9–2.3 g/kg), fat kept at the
 * hormone-sparing floor (~0.7 g/kg), carbs fill the rest.
 */
export function macros(args: {
  weightKg: number;
  goalKg: number;
  tdeeKcal: number;
  lossPctBodyWeightPerWeek: number;
  trainingDays: number;
}): MacroPlan {
  const { weightKg, goalKg, tdeeKcal, trainingDays } = args;
  const target = Math.min(weightKg, goalKg + 4);
  const weeklyLossKg = (weightKg * args.lossPctBodyWeightPerWeek) / 100;
  const deficit = clamp(weeklyLossKg * KCAL_PER_KG_FAT / 7, 250, 950);
  const kcal = Math.max(tdeeKcal - deficit, bmr(weightKg, 180, 25) * 0.95);

  const proteinPerKg = trainingDays >= 4 ? 2.2 : 2.05;
  const protein = Math.round(clamp(target * proteinPerKg, 120, 220) / 5) * 5;
  const fat = Math.round(clamp(weightKg * 0.72, 40, 90) / 5) * 5;
  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbs = Math.max(80, Math.round((kcal - proteinKcal - fatKcal) / 4));
  const fibre = Math.round(clamp(kcal / 1000 * 14, 25, 45));

  return {
    kcal: Math.round(kcal / 5) * 5,
    protein,
    carbs,
    fat,
    fibre,
    proteinKcal,
    carbKcal: carbs * 4,
    fatKcal,
    deficit: Math.round(deficit),
    weeklyLossKg: round(weeklyLossKg, 2),
  };
}

export function weeksToGoal(currentKg: number, goalKg: number, weeklyLossKg: number) {
  if (weeklyLossKg <= 0.02) return Infinity;
  return Math.ceil((currentKg - goalKg) / weeklyLossKg);
}

/** Lean-mass preserving target weight for a desired body-fat %. */
export function targetWeight(leanKg: number, bodyFatPct: number) {
  return round(leanKg / (1 - bodyFatPct / 100), 1);
}
