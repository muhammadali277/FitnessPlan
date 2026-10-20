import { useMemo, useState } from "react";
import { ACTIVITY_FACTORS, bmr, estimateBodyFat, macros, round, targetWeight, weeksToGoal, type Activity } from "@/lib/calc";
import { MACRO_CARDS, NON_NEGOTIABLES } from "@/data/plan";
import { Badge, Bar, Donut, Section } from "@/components/ui";
import { cn } from "@/utils/cn";

const TRAIN_DAYS = [3, 4, 5];

function Slider({
  label,
  value,
  min,
  max,
  step = 0.5,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{label}</span>
        <span className="font-mono text-sm font-semibold text-lime-300 tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}

function Projection({ startKg, weeklyKg, goalKg }: { startKg: number; weeklyKg: number; goalKg: number }) {
  const weeks = Math.min(52, weeksToGoal(startKg, goalKg, weeklyKg) || 52);
  const pts = Array.from({ length: weeks + 1 }, (_, i) => ({
    w: i,
    kg: Math.max(goalKg, startKg - weeklyKg * i),
  }));
  const W = 520;
  const H = 150;
  const x = (w: number) => (w / Math.max(weeks, 1)) * (W - 34) + 26;
  const y = (kg: number) => H - 20 - ((kg - goalKg) / Math.max(startKg - goalKg, 0.5)) * (H - 42);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.w).toFixed(1)} ${y(p.kg).toFixed(1)}`).join(" ");
  const area = `${path} L ${x(weeks).toFixed(1)} ${H - 20} L ${x(0).toFixed(1)} ${H - 20} Z`;
  const marks = [12, 24, 36, weeks].filter((w, i, a) => w <= weeks && a.indexOf(w) === i);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Projected scale weight</span>
        <span className="font-mono text-[10px] text-zinc-500">
          {startKg.toFixed(1)} → {goalKg} kg
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="proj" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#proj)" />
        <path d={path} fill="none" stroke="#a3e635" strokeWidth="2.2" strokeLinecap="round" />
        {marks.map((w) => {
          const p = pts[Math.min(w, pts.length - 1)];
          return (
            <g key={w}>
              <circle cx={x(p.w)} cy={y(p.kg)} r="3.2" fill="#07090c" stroke="#a3e635" strokeWidth="1.8" />
              <text x={x(p.w)} y={y(p.kg) - 8} textAnchor="middle" className="fill-zinc-400 font-mono" fontSize="9">
                {p.kg.toFixed(1)}
              </text>
              <text x={x(p.w)} y={H - 6} textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="8.5">
                w{w}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-[11.5px] leading-relaxed text-zinc-500">
        Assumes {weeklyKg.toFixed(2)} kg/week. Real curves are stair-steps, not straight lines — water, sodium and cycle shifts of ±1.5 kg
        are normal and mean nothing.
      </p>
    </div>
  );
}

export default function MacroLab() {
  const [weight, setWeight] = useState(87);
  const [waist, setWaist] = useState(34.75);
  const [activity, setActivity] = useState<Activity>("desk_moderate");
  const [days, setDays] = useState(3);
  const [loss, setLoss] = useState(0.6);

  const calc = useMemo(() => {
    const b = bmr(weight, 180.3, 25);
    const t = b * ACTIVITY_FACTORS[activity].factor;
    const m = macros({ weightKg: weight, goalKg: 76, tdeeKcal: t, lossPctBodyWeightPerWeek: loss, trainingDays: days });
    const bf = estimateBodyFat(weight, 180.3, 25, waist);
    const fatMass = round((weight * bf) / 100, 1);
    // Lean mass on a deficit also loses 1–2 kg of glycogen + water, so the
    // "shredded athletic" weight is computed from a slightly reduced lean figure.
    const lean = round(weight - fatMass, 1);
    const goalW = targetWeight(lean - 1.5, 13);
    const weeks = weeksToGoal(weight, goalW, m.weeklyLossKg);
    return { b, t, m, bf, fatMass, lean, goalW, weeks };
  }, [weight, waist, activity, days, loss]);

  return (
    <Section
      id="macros"
      eyebrow="Step 03 · Prescription"
      title="Your macro prescription"
      lead="Every number below recalculates live as your weight drops or your activity changes. Re-run this at the end of every 4-week block and update your portions — the plan must shrink as you do."
    >
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ── controls ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Badge tone="cyan">Adjust inputs</Badge>
          <div className="mt-5 space-y-5">
            <Slider label="Current weight" value={weight} min={70} max={105} suffix=" kg" onChange={setWeight} />
            <Slider label="Waist (at navel)" value={waist} min={28} max={46} step={0.25} suffix=" in" onChange={setWaist} />
            <div>
              <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Daily activity</div>
              <div className="grid gap-1.5">
                {(Object.keys(ACTIVITY_FACTORS) as Activity[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActivity(k)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left transition",
                      activity === k
                        ? "border-lime-400/50 bg-lime-400/12"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25",
                    )}
                  >
                    <div className={cn("text-[13px] font-semibold", activity === k ? "text-lime-300" : "text-zinc-300")}>
                      {ACTIVITY_FACTORS[k].label}
                    </div>
                    <div className="text-[11px] text-zinc-500">{ACTIVITY_FACTORS[k].hint}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Lifting days / week</div>
              <div className="flex gap-1.5">
                {TRAIN_DAYS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={cn(
                      "flex-1 rounded-lg border py-2 font-mono text-sm font-semibold transition",
                      days === d ? "border-lime-400/50 bg-lime-400/12 text-lime-300" : "border-white/10 bg-white/[0.02] text-zinc-400",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <Slider label="Loss rate (aggressiveness)" value={loss} min={0.35} max={0.9} step={0.05} suffix=" % BW/wk" onChange={setLoss} />
            <p className="rounded-lg border border-amber-400/20 bg-amber-400/[0.06] p-3 text-[11.5px] leading-relaxed text-amber-200/80">
              {loss >= 0.8
                ? "Above 0.75%/week you start burning muscle and your gym numbers stall. Only use this for the final 3–4 weeks before an event."
                : loss <= 0.45
                  ? "Very safe and very slow. Great for maintaining strength, frustrating for the mirror. Use it if sleep or recovery is poor."
                  : "The sweet spot: 0.5–0.7% of body weight per week. Fast enough to see change, slow enough to keep muscle."}
            </p>
          </div>
        </div>

        {/* ── outputs ── */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-lime-400/25 bg-gradient-to-br from-lime-400/[0.09] to-transparent p-5">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="relative grid place-items-center">
                <Donut
                  slices={[
                    { label: "P", value: calc.m.proteinKcal, color: "#a3e635" },
                    { label: "C", value: calc.m.carbKcal, color: "#22d3ee" },
                    { label: "F", value: calc.m.fatKcal, color: "#fbbf24" },
                  ]}
                />
                <div className="absolute text-center">
                  <div className="font-mono text-xl font-semibold text-white tabular-nums">{calc.m.kcal.toLocaleString()}</div>
                  <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">kcal / day</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { k: "Protein", v: `${calc.m.protein} g`, sub: `${round((calc.m.proteinKcal / calc.m.kcal) * 100)}% of kcal · muscle retention`, tone: "lime" },
                  { k: "Carbs", v: `${calc.m.carbs} g`, sub: `${round((calc.m.carbKcal / calc.m.kcal) * 100)}% of kcal · training fuel`, tone: "cyan" },
                  { k: "Fat", v: `${calc.m.fat} g`, sub: `${round((calc.m.fatKcal / calc.m.kcal) * 100)}% of kcal · hormone floor`, tone: "amber" },
                  { k: "Fibre", v: `${calc.m.fibre} g`, sub: "hunger control, cholesterol, gut", tone: "zinc" },
                ].map((r) => (
                  <div key={r.k}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] font-medium text-zinc-300">{r.k}</span>
                      <span className="font-mono text-sm font-semibold text-white tabular-nums">{r.v}</span>
                    </div>
                    <p className="mb-1 text-[11px] text-zinc-500">{r.sub}</p>
                    <Bar
                      pct={r.tone === "cyan" ? (calc.m.carbs / 260) * 100 : r.tone === "amber" ? (calc.m.fat / 90) * 100 : (calc.m.protein / 180) * 100}
                      tone={r.tone}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { k: "BMR", v: Math.round(calc.b).toLocaleString(), u: "kcal" },
              { k: "Maintenance", v: Math.round(calc.t).toLocaleString(), u: "kcal" },
              { k: "Daily deficit", v: `−${calc.m.deficit}`, u: "kcal" },
              { k: "Weekly loss", v: `${calc.m.weeklyLossKg.toFixed(2)}`, u: "kg" },
            ].map((x) => (
              <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="font-mono text-[9.5px] tracking-[0.16em] text-zinc-500 uppercase">{x.k}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-lg font-semibold text-white tabular-nums">{x.v}</span>
                  <span className="text-[10px] text-zinc-500">{x.u}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2.5">
                {[
                  ["Estimated body fat", `${calc.bf}%`],
                  ["Fat mass", `${calc.fatMass} kg`],
                  ["Lean mass", `${calc.lean} kg`],
                  ["Athletic target weight", `${calc.goalW} kg`],
                  ["Time to reach it", calc.weeks === Infinity ? "—" : `${calc.weeks} weeks`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-dashed border-white/10 pb-2">
                    <span className="text-[12.5px] text-zinc-500">{k}</span>
                    <span className="font-mono text-[13px] font-semibold text-zinc-100 tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
              <Projection startKg={weight} weeklyKg={calc.m.weeklyLossKg} goalKg={calc.goalW} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MACRO_CARDS.map((c) => (
          <div key={c.key} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{c.label}</span>
              <span className="font-mono text-lg font-semibold text-lime-300 tabular-nums">{c.value}</span>
            </div>
            <div className="mt-1 mb-2 text-[11px] text-zinc-500">{c.unit}</div>
            <Bar pct={c.pct} />
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-zinc-500">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-rose-400/25 bg-gradient-to-br from-rose-400/[0.08] to-transparent p-6">
        <Badge tone="rose">The 8 non-negotiables</Badge>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {NON_NEGOTIABLES.map((n, i) => (
            <div key={n} className="flex gap-3 rounded-lg border border-white/8 bg-black/25 p-3">
              <span className="font-mono text-[11px] text-rose-300">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[13px] leading-snug text-zinc-300">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
