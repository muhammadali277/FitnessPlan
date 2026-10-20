import { NEAT_PLAN, WEEK_GRID } from "@/data/plan";
import { Badge, Section } from "@/components/ui";

export default function Schedule() {
  return (
    <Section
      id="schedule"
      eyebrow="Step 07 · Execution"
      title="Your week, hour by hour"
      lead="A plan that ignores your real life is a plan you quit in week 3. This is built around the 7:00 wake-up, the 7:50 departure, the 9–5:30 desk, the 7:00 homecoming, the 7:40–8:30 gym slot and the 11 PM bedtime you actually have."
    >
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="hidden bg-white/[0.05] px-4 py-2.5 font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase sm:grid sm:grid-cols-[110px_1fr_1fr_1.25fr]">
          <span>Day</span>
          <span>Morning</span>
          <span>Office hours</span>
          <span>Evening & night</span>
        </div>
        <div className="divide-y divide-white/8">
          {WEEK_GRID.map((d) => (
            <div
              key={d.day}
              className="grid gap-2 bg-white/[0.015] px-4 py-3.5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[110px_1fr_1fr_1.25fr] sm:gap-4"
            >
              <div className="font-mono text-[11px] tracking-[0.14em] text-lime-300/90 uppercase">{d.day}</div>
              <div className="text-[12.5px] leading-relaxed text-zinc-400">
                <span className="mr-1.5 font-mono text-[9.5px] text-zinc-600 uppercase sm:hidden">AM · </span>
                {d.am}
              </div>
              <div className="text-[12.5px] leading-relaxed text-zinc-400">
                <span className="mr-1.5 font-mono text-[9.5px] text-zinc-600 uppercase sm:hidden">Work · </span>
                {d.work}
              </div>
              <div className="text-[12.5px] leading-relaxed text-zinc-300">
                <span className="mr-1.5 font-mono text-[9.5px] text-zinc-600 uppercase sm:hidden">PM · </span>
                {d.pm}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-lime-400/25 bg-gradient-to-br from-lime-400/[0.09] to-transparent p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">The NEAT plan — your secret weapon</h3>
            <Badge tone="lime">300–400 kcal / day</Badge>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
            Non-Exercise Activity Thermogenesis. For a desk employee this is worth more than any cardio session: it burns fat with
            zero recovery cost, no hunger spike, and no extra hour in the gym. This is the difference between losing 0.4 kg/week and
            0.7 kg/week on identical food.
          </p>
          <div className="mt-4 space-y-2">
            {NEAT_PLAN.map((n) => (
              <div key={n.time} className="flex gap-3 rounded-xl border border-white/8 bg-black/25 p-3">
                <span className="w-[74px] shrink-0 font-mono text-[10.5px] text-lime-300/80">{n.time}</span>
                <span className="text-[12.5px] leading-snug text-zinc-300">{n.action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <h3 className="text-lg font-semibold text-white">Weekly checklist</h3>
            <div className="mt-3 space-y-2">
              {[
                { k: "3 lifting sessions", v: "50 min each · logged sets" },
                { k: "8,000+ steps × 7", v: "Track on phone / smartwatch" },
                { k: "2 × 25-min brisk walks", v: "Tue & Thu evenings" },
                { k: "7 protein targets hit", v: "160 g+ daily average" },
                { k: "1 free meal", v: "Planned, enjoyed, done" },
                { k: "Weigh-in + waist tape", v: "Sunday morning, fasted" },
                { k: "Progress photos", v: "Every 2 weeks, same light & pose" },
                { k: "Meal prep", v: "90 min on Sunday" },
              ].map((x) => (
                <div key={x.k} className="flex items-center justify-between rounded-lg border border-white/8 bg-black/25 px-3.5 py-2.5">
                  <span className="text-[13px] font-medium text-zinc-200">{x.k}</span>
                  <span className="font-mono text-[10.5px] text-zinc-500">{x.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5">
            <h3 className="text-[15px] font-semibold text-amber-100">Sleep — the cheapest fat-loss drug available</h3>
            <ul className="mt-3 space-y-2">
              {[
                "Move lights-out to 10:45–11:00. Seven and a half hours beats every supplement on this page.",
                "Caffeine cut-off 4:00 PM. Your 9:30 PM tea is costing you an hour of deep sleep every night.",
                "Screens off 30 min before bed, or at minimum night-mode + brightness down.",
                "Dark room, cool, fan on. Core temperature drop = faster sleep onset.",
                "Sleeping under 6.5 h drops fat loss by up to 55% and increases muscle loss by 60% in controlled trials — same calories, worse result.",
              ].map((s) => (
                <li key={s} className="flex gap-2.5 text-[12.5px] leading-relaxed text-zinc-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400/70" />
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
