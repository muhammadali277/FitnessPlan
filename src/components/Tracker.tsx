import { useMemo, useState } from "react";
import { Badge, Bar, Section, useLocal } from "@/components/ui";
import { cn } from "@/utils/cn";
import { round } from "@/lib/calc";

type Entry = { id: string; date: string; weight: number; waist: number };

const HABITS = [
  "Protein 160 g+",
  "8,000 steps",
  "Training session",
  "No sugary drink",
  "3 L water",
  "Sleep 7 h+",
  "No late-night carbs",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const today = () => new Date().toISOString().slice(0, 10);

export default function Tracker() {
  const [entries, setEntries] = useLocal<Entry[]>("lk-entries", []);
  const [habits, setHabits] = useLocal<Record<string, boolean>>("lk-habits", {});
  const [form, setForm] = useState({ date: today(), weight: "", waist: "" });

  const sorted = useMemo(
    () => [...entries].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)),
    [entries],
  );

  const stats = useMemo(() => {
    if (sorted.length === 0) return null;
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const days = Math.max(1, (new Date(last.date).getTime() - new Date(first.date).getTime()) / 86400000);
    const delta = round(last.weight - first.weight, 1);
    const rate = round((delta / days) * 7, 2);
    const min = Math.min(...sorted.map((e) => e.weight));
    const waistDelta = round(last.waist - first.waist, 1);
    return { first, last, days: Math.round(days), delta, rate, min, waistDelta, count: sorted.length };
  }, [sorted]);

  const habitCount = Object.values(habits).filter(Boolean).length;
  const habitTotal = HABITS.length * DAYS.length;

  const add = () => {
    const w = Number(form.weight);
    const wa = Number(form.waist);
    if (!form.date || !w || !wa) return;
    setEntries((e) => [
      ...e.filter((x) => x.date !== form.date),
      { id: `${form.date}-${Date.now()}`, date: form.date, weight: round(w, 1), waist: round(wa, 1) },
    ]);
    setForm({ date: today(), weight: "", waist: "" });
  };

  const W = 640;
  const H = 190;
  const pad = { l: 34, r: 34, t: 18, b: 26 };

  const chart = useMemo(() => {
    if (sorted.length < 2) return null;
    const ws = sorted.map((e) => e.weight);
    const was = sorted.map((e) => e.waist);
    const wMin = Math.min(...ws) - 1;
    const wMax = Math.max(...ws) + 1;
    const aMin = Math.min(...was) - 0.8;
    const aMax = Math.max(...was) + 0.8;
    const x = (i: number) => pad.l + (i / (sorted.length - 1)) * (W - pad.l - pad.r);
    const yw = (v: number) => H - pad.b - ((v - wMin) / (wMax - wMin)) * (H - pad.t - pad.b);
    const ya = (v: number) => H - pad.b - ((v - aMin) / (aMax - aMin)) * (H - pad.t - pad.b);
    const line = (vals: number[], f: (v: number) => number) => vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${f(v).toFixed(1)}`).join(" ");
    const area = `${line(ws, yw)} L ${x(sorted.length - 1).toFixed(1)} ${H - pad.b} L ${x(0).toFixed(1)} ${H - pad.b} Z`;
    return { x, yw, ya, area, wPath: line(ws, yw), aPath: line(was, ya), wMin, wMax, aMin, aMax, ws, was };
  }, [sorted]);

  return (
    <Section
      id="tracker"
      eyebrow="Step 09 · Accountability"
      title="Track it, or it did not happen"
      lead="The scale is the least reliable of the four signals, so log all of them: daily weight (judge the 7-day average only), weekly waist at the navel, weekly photos in the same light, and your lifting numbers. Everything below saves in your browser."
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Weight & waist log</h3>
            {stats ? <Badge tone="lime">{stats.count} entries</Badge> : null}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-[1.2fr_1fr_1fr_auto]">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="col-span-2 rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-lime-400/60 sm:col-span-1"
            />
            <input
              type="number"
              step="0.1"
              placeholder="weight kg"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-lime-400/60"
            />
            <input
              type="number"
              step="0.25"
              placeholder='waist in'
              value={form.waist}
              onChange={(e) => setForm({ ...form, waist: e.target.value })}
              className="rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-lime-400/60"
            />
            <button
              onClick={add}
              className="rounded-lg bg-lime-400 px-4 py-2 text-[13px] font-semibold text-[#07090c] transition hover:bg-lime-300"
            >
              Log
            </button>
          </div>

          {chart ? (
            <div className="mt-5">
              <div className="mb-2 flex flex-wrap items-center gap-4 font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-lime-400" /> weight (kg)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-cyan-400" /> waist (in)
                </span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
                <defs>
                  <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={chart.area} fill="url(#tw)" />
                <path d={chart.wPath} fill="none" stroke="#a3e635" strokeWidth="2.2" strokeLinejoin="round" />
                <path d={chart.aPath} fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="5 4" />
                {sorted.map((e, i) => (
                  <g key={e.id}>
                    <circle cx={chart.x(i)} cy={chart.yw(e.weight)} r="2.8" fill="#07090c" stroke="#a3e635" strokeWidth="1.6" />
                    {i % Math.ceil(sorted.length / 7) === 0 || i === sorted.length - 1 ? (
                      <text x={chart.x(i)} y={H - 8} textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="8">
                        {e.date.slice(5)}
                      </text>
                    ) : null}
                  </g>
                ))}
                <text x={4} y={pad.t + 4} className="fill-zinc-600 font-mono" fontSize="8.5">
                  {chart.wMax.toFixed(0)}
                </text>
                <text x={4} y={H - pad.b} className="fill-zinc-600 font-mono" fontSize="8.5">
                  {chart.wMin.toFixed(0)}
                </text>
              </svg>
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-white/15 p-6 text-center text-[13px] text-zinc-500">
              Log at least two entries to draw your trend line. Weigh every morning, after the toilet, before tea, and record the
              weekly average — never the individual day.
            </p>
          )}

          {stats ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Latest", v: `${stats.last.weight} kg`, t: "text-white" },
                { k: "Total change", v: `${stats.delta > 0 ? "+" : ""}${stats.delta} kg`, t: stats.delta <= 0 ? "text-lime-300" : "text-rose-300" },
                { k: "Rate / week", v: `${stats.rate} kg`, t: "text-cyan-300" },
                { k: "Waist change", v: `${stats.waistDelta > 0 ? "+" : ""}${stats.waistDelta} in`, t: stats.waistDelta <= 0 ? "text-lime-300" : "text-amber-300" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">{s.k}</div>
                  <div className={cn("mt-1 font-mono text-base font-semibold tabular-nums", s.t)}>{s.v}</div>
                </div>
              ))}
            </div>
          ) : null}

          {sorted.length > 0 ? (
            <div className="mt-4 max-h-44 overflow-y-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-[12.5px]">
                <thead className="sticky top-0 bg-[#0d1116] font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">
                  <tr>
                    <th className="px-3.5 py-2">Date</th>
                    <th className="px-3.5 py-2">Weight</th>
                    <th className="px-3.5 py-2">Waist</th>
                    <th className="px-3.5 py-2">BMI</th>
                    <th className="px-3.5 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {[...sorted].reverse().map((e) => (
                    <tr key={e.id} className="hover:bg-white/[0.03]">
                      <td className="px-3.5 py-2 font-mono text-zinc-400">{e.date}</td>
                      <td className="px-3.5 py-2 font-mono text-zinc-200">{e.weight}</td>
                      <td className="px-3.5 py-2 font-mono text-cyan-300/90">{e.waist}</td>
                      <td className="px-3.5 py-2 font-mono text-zinc-500">{round(e.weight / Math.pow(1.803, 2), 1)}</td>
                      <td className="px-3.5 py-2 text-right">
                        <button
                          onClick={() => setEntries((x) => x.filter((y) => y.id !== e.id))}
                          className="font-mono text-[10px] text-zinc-600 uppercase transition hover:text-rose-400"
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-lime-400/25 bg-gradient-to-br from-lime-400/[0.08] to-transparent p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">This week's habits</h3>
              <button
                onClick={() => setHabits({})}
                className="rounded-lg border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-wider text-zinc-400 uppercase transition hover:border-white/30 hover:text-white"
              >
                New week
              </button>
            </div>
            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Adherence</span>
                <span className="font-mono">
                  {habitCount} / {habitTotal}
                </span>
              </div>
              <Bar pct={(habitCount / habitTotal) * 100} />
              <p className="mt-2 text-[11.5px] leading-relaxed text-zinc-500">
                {habitCount / habitTotal >= 0.85
                  ? "Elite. This is exactly what a 12-week transformation looks like from the inside."
                  : habitCount / habitTotal >= 0.7
                    ? "Strong. Above 80% is where visible change happens — you are close."
                    : "Below 70%. Fix the two easiest habits first: water and steps. Then rebuild the rest."}
              </p>
            </div>

            <div className="no-scrollbar mt-4 overflow-x-auto">
              <table className="w-full min-w-[320px] text-[11px]">
                <thead>
                  <tr className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                    <th className="py-1.5 pr-2 text-left">Habit</th>
                    {DAYS.map((d) => (
                      <th key={d} className="px-1 py-1.5 text-center">
                        {d[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HABITS.map((h) => (
                    <tr key={h}>
                      <td className="py-1 pr-2 text-[11.5px] whitespace-nowrap text-zinc-300">{h}</td>
                      {DAYS.map((d) => {
                        const k = `${h}-${d}`;
                        return (
                          <td key={k} className="px-1 py-1 text-center">
                            <button
                              onClick={() => setHabits((x) => ({ ...x, [k]: !x[k] }))}
                              className={cn(
                                "h-5 w-5 rounded border transition",
                                habits[k] ? "border-lime-400 bg-lime-400" : "border-white/15 hover:border-lime-400/60",
                              )}
                              aria-label={`${h} ${d}`}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <h3 className="text-[15px] font-semibold text-white">Measurement protocol</h3>
            <ul className="mt-3 space-y-2">
              {[
                "Weight: every morning, same conditions. Only the 7-day average counts.",
                "Waist: Sunday morning, at the navel, relaxed exhale, tape parallel to the floor, don't suck in.",
                "Photos: every 2 weeks — front relaxed, front flexed, side. Same light, same time, same pose.",
                "Strength: log every set in a notebook or app. Compare month to month, not week to week.",
                "Body-fat estimate: waist ÷ height should end up between 0.43 and 0.45 when you are lean.",
              ].map((s) => (
                <li key={s} className="flex gap-2.5 text-[12.5px] leading-relaxed text-zinc-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime-400/70" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
