import { useState } from "react";
import { MEAL_DAYS } from "@/data/plan";
import { Badge, Bar, Section } from "@/components/ui";
import { cn } from "@/utils/cn";

const PORTION_GUIDE = [
  { item: "Chicken breast / fish / paneer", measure: "Palm + half (150–180 g cooked)", kcal: "~200–240 · 45 g P" },
  { item: "Eggs", measure: "2–3 whole + 2–3 whites", kcal: "~230–300 · 24–28 g P" },
  { item: "Roti / chapati (no ghee)", measure: "1 = 1 open hand · 3–4 per day", kcal: "~100 · 3 g P" },
  { item: "Cooked rice", measure: "¾ katori = 1 cupped hand", kcal: "~130 · 3 g P" },
  { item: "Dal / channa (cooked)", measure: "1–1.5 katori", kcal: "~180–230 · 9–12 g P" },
  { item: "Hung curd / Greek yoghurt", measure: "200 g = 1 large katori", kcal: "~120–160 · 20 g P" },
  { item: "Cooking oil", measure: "3 tsp/day max — measured, never poured", kcal: "135 · 0 g P" },
  { item: "Salad / vegetables", measure: "Unlimited. 2 katori minimum per meal", kcal: "~50 · 2 g P" },
  { item: "Fruit", measure: "2 fists / day, whole not juiced", kcal: "~80 · 1 g P" },
  { item: "Nuts / seeds", measure: "1 small handful cap (30 g)", kcal: "~180 · 6 g P" },
];

const EATING_OUT = [
  { ctx: "Office biryani day", order: "Half plate + extra raita + big salad. Skip the second serving and the cold drink." },
  { ctx: "Wedding / dawat", order: "Tandoori chicken, seekh, fish, salad. One carb portion. No fried starters, no creamy curry, one dessert only if you truly want it." },
  { ctx: "Fast food", order: "Grilled chicken burger without mayo + side salad, or a shawarma without the extra sauce and no fries." },
  { ctx: "Tea / chai break", order: "Milk tea, no sugar, or black coffee. Ask for it — nobody cares, and in two weeks you stop noticing." },
  { ctx: "Cheat meal (1×/week)", order: "Plan it, order what you actually want, eat it slowly, then return to the plan at the NEXT meal. Not next Monday." },
];

export default function MealPlan() {
  const [idx, setIdx] = useState(0);
  const day = MEAL_DAYS[idx];
  const totals = day.meals.reduce(
    (a, m) => ({ kcal: a.kcal + m.kcal, protein: a.protein + m.protein }),
    { kcal: 0, protein: 0 },
  );

  return (
    <Section
      id="meals"
      eyebrow="Step 04 · Nutrition"
      title="The 7-day meal plan"
      lead="Built around your real day: office at 9:00, lunch at 1:30, gym at 7:40 PM, dinner at 9:00. Same skeleton every day so it becomes automatic — only the protein and carb sources rotate. Each day lands within ±5% of your 2,090 kcal target and 155–175 g of protein."
    >
      {/* day switcher */}
      <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
        {MEAL_DAYS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setIdx(i)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2.5 text-left transition",
              i === idx ? "border-lime-400/50 bg-lime-400/12" : "border-white/10 bg-white/[0.02] hover:border-white/25",
            )}
          >
            <div className={cn("font-mono text-[10px] tracking-[0.16em] uppercase", i === idx ? "text-lime-300" : "text-zinc-500")}>{d.day}</div>
            <div className={cn("text-[12px] font-medium", i === idx ? "text-white" : "text-zinc-400")}>{d.tag.split(" · ")[0]}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone={day.accent}>{day.tag}</Badge>
            <h3 className="mt-3 text-xl font-semibold text-white">{day.day}day template</h3>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-center">
              <div className="font-mono text-lg font-semibold text-lime-300 tabular-nums">{totals.kcal.toLocaleString()}</div>
              <div className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">kcal</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-center">
              <div className="font-mono text-lg font-semibold text-cyan-300 tabular-nums">{totals.protein} g</div>
              <div className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">protein</div>
            </div>
            <div className="hidden rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-center sm:block">
              <div className="font-mono text-lg font-semibold text-amber-300 tabular-nums">{Math.round((totals.protein * 400) / totals.kcal)}</div>
              <div className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">% from P</div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Protein target</span>
            <span className="font-mono">{totals.protein} / 165 g</span>
          </div>
          <Bar pct={(totals.protein / 165) * 100} />
        </div>

        <ol className="relative mt-6 space-y-3 border-l border-white/10 pl-5">
          {day.meals.map((m) => (
            <li key={m.time + m.slot} className="relative">
              <span className="absolute top-2 -left-[26px] grid h-3 w-3 place-items-center rounded-full border-2 border-lime-400 bg-[#07090c]" />
              <div className="rounded-xl border border-white/8 bg-black/25 p-4 transition-colors hover:border-white/20">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md bg-white/8 px-2 py-0.5 font-mono text-[11px] text-lime-300">{m.time}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{m.slot}</span>
                  <span className="ml-auto font-mono text-[11px] text-zinc-500 tabular-nums">
                    {m.kcal} kcal · {m.protein} g P
                  </span>
                </div>
                <h4 className="mt-2.5 text-[15px] font-semibold text-white">{m.title}</h4>
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2 text-[12.5px] leading-snug text-zinc-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime-400/70" />
                      {it}
                    </li>
                  ))}
                </ul>
                {m.note ? (
                  <p className="mt-2.5 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-2 text-[11.5px] leading-relaxed text-cyan-100/70">
                    {m.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="text-lg font-semibold text-white">Portion guide — no weighing scale needed</h3>
          <p className="mt-1.5 mb-4 text-[13px] text-zinc-500">
            For the first 2 weeks, weigh everything once so your eyes get calibrated. After that, these hand measures are accurate
            enough to hold 5% body fat.
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-white/[0.05] font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">
                <tr>
                  <th className="px-3.5 py-2.5">Food</th>
                  <th className="px-3.5 py-2.5">Portion</th>
                  <th className="px-3.5 py-2.5">Per portion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {PORTION_GUIDE.map((p) => (
                  <tr key={p.item} className="hover:bg-white/[0.03]">
                    <td className="px-3.5 py-2.5 font-medium text-zinc-200">{p.item}</td>
                    <td className="px-3.5 py-2.5 text-zinc-400">{p.measure}</td>
                    <td className="px-3.5 py-2.5 font-mono text-[11.5px] text-lime-300/80 whitespace-nowrap">{p.kcal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5">
            <Badge tone="amber">Eating out · survival rules</Badge>
            <div className="mt-4 space-y-3">
              {EATING_OUT.map((e) => (
                <div key={e.ctx}>
                  <div className="text-[13px] font-semibold text-amber-100">{e.ctx}</div>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-zinc-400">{e.order}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <h4 className="text-[15px] font-semibold text-white">The 3-step plate method (works anywhere)</h4>
            <ol className="mt-3 space-y-2.5">
              {[
                "Half the plate: vegetables or salad — volume, fibre, almost no calories.",
                "One quarter: protein the size of your palm and a half — this is the non-negotiable part.",
                "One quarter: one carb you can actually name (roti, rice, potato, oats) — measured, not heaped.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-lime-400/15 font-mono text-[10px] text-lime-300">
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] leading-relaxed text-zinc-400">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
