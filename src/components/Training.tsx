import { useState } from "react";
import { TRAINING_RULES, WORKOUTS } from "@/data/plan";
import { Badge, Section } from "@/components/ui";
import { cn } from "@/utils/cn";

const PHASES = [
  {
    p: "Weeks 1–4",
    h: "Learn + establish",
    d: "Every exercise at RPE 7 (3 reps in reserve). Focus on technique and finding the right starting loads. Log everything. Add 1 session of 25-min brisk walking on 2 off days.",
  },
  {
    p: "Weeks 5–8",
    h: "Progress",
    d: "Push to RPE 8 on compounds. Double progression kicks in: hit the top of the rep range on all sets, then add 2.5 kg upper / 5 kg lower. Add the optional 4th session (Saturday athletic day).",
  },
  {
    p: "Week 7",
    h: "Deload",
    d: "Same exercises, half the sets, same weights. You will come back stronger in week 8. Non-optional — this is where the adaptation actually happens.",
  },
  {
    p: "Weeks 9–12",
    h: "Intensify",
    d: "Add one set to your two weakest exercises. Accessories go to RPE 9–10 (last rep is slow and ugly but technically clean). Conditioning builds to 10 sprints on legs day.",
  },
  {
    p: "Week 13+",
    h: "Diet break + reassess",
    d: "Eat at maintenance (~2,500 kcal) for 7–10 days, keep training. Hormones, sleep and hunger all recover. Then run the next 12-week block at 76–78 kg starting weight.",
  },
];

export default function Training() {
  const [idx, setIdx] = useState(0);
  const w = WORKOUTS[idx];

  return (
    <Section
      id="training"
      eyebrow="Step 06 · Training"
      title="The gym programme: 3 days, 50 minutes"
      lead="You have 50 minutes, three times a week, after a 9-hour desk day. So this is not a bodybuilding split — it is a dense, superset-driven, full-body-leaning programme engineered to build the shoulder-to-waist ratio that reads as 'athletic'."
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {[
          { h: "Why you won't get bulky", p: "You will be in a ~540 kcal deficit for months. Muscle needs a surplus. Lifting here only tells your body which tissue to KEEP — it is muscle-preserving surgery, not size-building." },
          { h: "Why legs day stays", p: "Legs are 40% of your muscle mass and the biggest metabolic lever you have. Skip legs and you lose the calorie burn, the shape, and the athletic look you asked for." },
          { h: "Why 8–15 reps", p: "The hypertrophy sweet spot: enough load to retain muscle on a cut, enough volume for the pump that shapes delts and arms, without the joint stress of heavy singles." },
        ].map((x) => (
          <div key={x.h} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-4">
            <h4 className="text-[13.5px] font-semibold text-cyan-100">{x.h}</h4>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-400">{x.p}</p>
          </div>
        ))}
      </div>

      <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
        {WORKOUTS.map((wk, i) => (
          <button
            key={wk.id}
            onClick={() => setIdx(i)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2.5 text-left transition",
              i === idx ? "border-lime-400/50 bg-lime-400/12" : "border-white/10 bg-white/[0.02] hover:border-white/25",
              i === 3 && i !== idx && "border-dashed",
            )}
          >
            <div className={cn("font-mono text-[10px] tracking-[0.16em] uppercase", i === idx ? "text-lime-300" : "text-zinc-500")}>{wk.day}</div>
            <div className={cn("text-[12.5px] font-semibold whitespace-nowrap", i === idx ? "text-white" : "text-zinc-400")}>
              {wk.title.split(" · ")[1]}
              {i === 3 ? " (opt)" : ""}
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{w.title}</h3>
            <p className="mt-1 text-[13px] text-zinc-400">{w.focus}</p>
          </div>
          <Badge tone="lime">{w.duration}</Badge>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] p-4">
          <div className="font-mono text-[10px] tracking-[0.16em] text-cyan-300/80 uppercase">Warm-up · 8 minutes · never skip</div>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-3">
            {w.warmup.map((x) => (
              <li key={x} className="flex gap-2 text-[12.5px] leading-snug text-zinc-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400/70" />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 space-y-4">
          {w.blocks.map((b) => (
            <div key={b.label}>
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <h4 className="font-mono text-[11px] tracking-[0.16em] text-lime-300 uppercase">{b.label}</h4>
                {b.note ? <span className="text-[11.5px] text-zinc-500">{b.note}</span> : null}
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-white/[0.05] font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">
                    <tr>
                      <th className="px-3.5 py-2.5">Exercise</th>
                      <th className="px-2.5 py-2.5 text-center">Sets</th>
                      <th className="px-2.5 py-2.5 text-center">Reps</th>
                      <th className="hidden px-2.5 py-2.5 text-center sm:table-cell">Rest</th>
                      <th className="hidden px-3.5 py-2.5 lg:table-cell">Cue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {b.exercises.map((e) => (
                      <tr key={e.name} className={cn("hover:bg-white/[0.03]", e.key && "bg-lime-400/[0.04]")}>
                        <td className="px-3.5 py-3">
                          <span className="font-medium text-zinc-100">{e.name}</span>
                          {e.key ? <span className="ml-2 font-mono text-[9px] tracking-wider text-lime-400/70 uppercase">key lift</span> : null}
                          <span className="mt-1 block text-[11.5px] leading-snug text-zinc-500 lg:hidden">{e.cue}</span>
                        </td>
                        <td className="px-2.5 py-3 text-center font-mono text-zinc-300">{e.sets}</td>
                        <td className="px-2.5 py-3 text-center font-mono text-lime-300/90">{e.reps}</td>
                        <td className="hidden px-2.5 py-3 text-center font-mono text-[11.5px] text-zinc-500 sm:table-cell">{e.rest}</td>
                        <td className="hidden px-3.5 py-3 text-[11.5px] leading-snug text-zinc-500 lg:table-cell">{e.cue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Finisher</div>
          <p className="mt-1.5 text-[13px] text-zinc-300">{w.finisher}</p>
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-zinc-500">
          Home backup for missed days: 4 rounds, no rest between exercises, 90 s between rounds — 15 push-ups, 20 squats, 20 lunges
          (10/leg), 30 s plank, 15 pike push-ups. It is not the gym, but it is 400 kcal and zero excuse.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="text-lg font-semibold text-white">Progression rules</h3>
          <p className="mt-1.5 mb-4 text-[13px] text-zinc-500">The programme only works if the numbers go up. That is the entire job.</p>
          <div className="space-y-2.5">
            {TRAINING_RULES.map((r) => (
              <div key={r.rule} className="rounded-xl border border-white/8 bg-black/25 p-3.5">
                <div className="text-[13px] font-semibold text-lime-200">{r.rule}</div>
                <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="text-lg font-semibold text-white">12-week periodisation</h3>
          <p className="mt-1.5 mb-4 text-[13px] text-zinc-500">Exactly how the intensity should rise, week by week.</p>
          <div className="space-y-2.5">
            {PHASES.map((p, i) => (
              <div key={p.p} className="relative border-l border-white/10 pl-5">
                <span className="absolute top-1.5 -left-[7px] h-3 w-3 rounded-full border-2 border-lime-400 bg-[#07090c]" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.16em] text-lime-300 uppercase">{p.p}</span>
                  <span className="text-[13px] font-semibold text-white">{p.h}</span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">{p.d}</p>
                {i < PHASES.length - 1 ? null : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
