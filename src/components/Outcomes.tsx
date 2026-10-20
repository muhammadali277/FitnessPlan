import { HONEST_EXPECTATIONS, OUTCOME_MILESTONES, STRENGTH_TARGETS, TROUBLESHOOT } from "@/data/plan";
import { Badge, Section } from "@/components/ui";
import { cn } from "@/utils/cn";

const TONE_RING: Record<string, string> = {
  cyan: "border-cyan-400/40",
  lime: "border-lime-400/40",
  amber: "border-amber-400/40",
  violet: "border-violet-400/40",
  rose: "border-rose-400/40",
};

const TONE_TEXT: Record<string, string> = {
  cyan: "text-cyan-300",
  lime: "text-lime-300",
  amber: "text-amber-300",
  violet: "text-violet-300",
  rose: "text-rose-300",
};

export default function Outcomes() {
  return (
    <Section
      id="outcomes"
      eyebrow="Step 08 · Projections"
      title="Exactly what to expect, and when"
      lead="Honest numbers, based on your starting point, your 25-year-old recovery capacity and a 0.6 kg/week loss rate with 165 g protein and three progressive sessions. Read this twice — it is the part that keeps you going in week 6."
    >
      <div className="relative space-y-3 border-l border-white/12 pl-5 sm:pl-7">
        {OUTCOME_MILESTONES.map((m, i) => (
          <div key={m.phase} className="relative">
            <span className={cn("absolute top-3 -left-[26px] h-3.5 w-3.5 rounded-full border-2 bg-[#07090c] sm:-left-[34px]", TONE_RING[m.tone])} />
            <div className={cn("card-sheen rounded-2xl border bg-white/[0.025] p-5", TONE_RING[m.tone])}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("font-mono text-[11px] tracking-[0.16em] uppercase", TONE_TEXT[m.tone])}>{m.phase}</span>
                {i === 2 ? <Badge tone="amber">Where this 12-week plan ends</Badge> : null}
                {i === 3 ? <Badge tone="violet">The look you described</Badge> : null}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-[150px_150px_1fr]">
                <div className="rounded-lg border border-white/8 bg-black/30 px-3 py-2">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">Weight</div>
                  <div className="mt-0.5 font-mono text-[15px] font-semibold text-white">{m.weight}</div>
                </div>
                <div className="rounded-lg border border-white/8 bg-black/30 px-3 py-2">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">Waist</div>
                  <div className="mt-0.5 font-mono text-[15px] font-semibold text-white">{m.waist}</div>
                </div>
                <div className="sm:col-span-1 sm:col-start-1 sm:col-end-4">
                  <p className="text-[13px] leading-relaxed text-zinc-300">{m.body}</p>
                  <p className="mt-2 border-l-2 border-white/15 pl-3 text-[12.5px] leading-relaxed text-zinc-500">{m.feels}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Strength benchmarks</h3>
            <Badge tone="cyan">These matter more than the scale</Badge>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-white/[0.05] font-mono text-[9.5px] tracking-[0.14em] text-zinc-500 uppercase">
                <tr>
                  <th className="px-3.5 py-2.5">Lift</th>
                  <th className="px-2.5 py-2.5">Now</th>
                  <th className="px-2.5 py-2.5 text-cyan-300">Week 12</th>
                  <th className="px-3.5 py-2.5 text-lime-300">Month 6</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {STRENGTH_TARGETS.map((s) => (
                  <tr key={s.lift} className="hover:bg-white/[0.03]">
                    <td className="px-3.5 py-2.5 font-medium text-zinc-200">{s.lift}</td>
                    <td className="px-2.5 py-2.5 font-mono text-[11.5px] text-zinc-500">{s.now}</td>
                    <td className="px-2.5 py-2.5 font-mono text-[11.5px] text-cyan-300/90">{s.w12}</td>
                    <td className="px-3.5 py-2.5 font-mono text-[11.5px] text-lime-300/90">{s.w24}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-zinc-500">
            If these numbers are going up while your waist goes down, you are doing a textbook body recomposition — even on weeks the
            scale refuses to move.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-400/25 bg-gradient-to-br from-rose-400/[0.08] to-transparent p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">The honest part</h3>
            <Badge tone="rose">No sugar-coating</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {HONEST_EXPECTATIONS.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                <span className="text-[13px] leading-relaxed text-zinc-300">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <h3 className="text-lg font-semibold text-white">Troubleshooting — what to do when it stalls</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TROUBLESHOOT.map((t) => (
            <div key={t.problem} className="rounded-xl border border-white/8 bg-black/25 p-4">
              <div className="text-[13px] font-semibold text-amber-200">{t.problem}</div>
              <p className="mt-1.5 text-[11.5px] text-zinc-500">
                <span className="font-mono text-[9.5px] tracking-wider text-zinc-600 uppercase">Cause · </span>
                {t.cause}
              </p>
              <p className="mt-2 rounded-lg border border-lime-400/20 bg-lime-400/[0.06] px-3 py-2 text-[12px] leading-relaxed text-zinc-300">
                <span className="font-mono text-[9.5px] tracking-wider text-lime-400/80 uppercase">Fix · </span>
                {t.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { h: "Days 1–14", p: "Delete white bread, rusk, mayo, sugar in tea. Add protein to breakfast. Hit 8k steps. Start creatine. Nothing else changes yet — habit first, optimise later." },
          { h: "Days 15–60", p: "Full macro targets, all three sessions logged, Sunday meal prep, weekly measurements. This is where 80% of the result is earned." },
          { h: "Day 61+", p: "Reassess: new macros, optional 4th session, one diet-break week at maintenance, then run it again from 79 kg." },
        ].map((x, i) => (
          <div key={x.h} className="rounded-2xl border border-lime-400/25 bg-gradient-to-b from-lime-400/[0.08] to-transparent p-5">
            <span className="font-mono text-[10px] tracking-[0.16em] text-lime-300/80 uppercase">Phase {i + 1}</span>
            <h4 className="mt-1 text-[15px] font-semibold text-white">{x.h}</h4>
            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-400">{x.p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
