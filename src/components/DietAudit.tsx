import { AUDIT_TOTAL, CURRENT_DIET_VERDICTS, DIET_AUDIT, MEAL_SWAPS, type AuditItem } from "@/data/plan";
import { Badge, Bar, Section } from "@/components/ui";
import { cn } from "@/utils/cn";

const VERDICT: Record<AuditItem["verdict"], { label: string; cls: string }> = {
  bad: { label: "Fix now", cls: "border-rose-400/40 bg-rose-400/10 text-rose-300" },
  ok: { label: "Upgrade", cls: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  good: { label: "Keep", cls: "border-lime-400/40 bg-lime-400/10 text-lime-300" },
};

export default function DietAudit() {
  return (
    <Section
      id="audit"
      eyebrow="Step 02 · Diet audit"
      title="Your current day, item by item"
      lead="I mapped your exact routine — sandwich at 9:30, channa chat at 1:30, coffee at 3:30, gym at 7:40, dinner at 9, tea and rusk at 9:30 — into calories and protein. Here is the diagnosis and the swap for each one."
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-4">
          <div className="font-mono text-[10px] tracking-[0.16em] text-rose-300/80 uppercase">Current intake</div>
          <div className="mt-1.5 font-mono text-2xl font-semibold text-rose-200 tabular-nums">{AUDIT_TOTAL.kcal.toLocaleString()} kcal</div>
          <p className="mt-1 text-[11.5px] text-zinc-500">Estimated, including the hidden oil in gravies and sugar in tea.</p>
        </div>
        <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.07] p-4">
          <div className="font-mono text-[10px] tracking-[0.16em] text-amber-300/80 uppercase">Current protein</div>
          <div className="mt-1.5 font-mono text-2xl font-semibold text-amber-200 tabular-nums">{AUDIT_TOTAL.protein} g</div>
          <p className="mt-1 text-[11.5px] text-zinc-500">0.85 g/kg — roughly 40% of what muscle retention requires.</p>
        </div>
        <div className="rounded-xl border border-lime-400/25 bg-lime-400/[0.07] p-4">
          <div className="font-mono text-[10px] tracking-[0.16em] text-lime-300/80 uppercase">Target protein</div>
          <div className="mt-1.5 font-mono text-2xl font-semibold text-lime-200 tabular-nums">165 g</div>
          <p className="mt-1 text-[11.5px] text-zinc-500">2.2 g/kg of goal weight — this is the whole game.</p>
        </div>
      </div>

      <div className="space-y-3">
        {DIET_AUDIT.map((item) => (
          <div key={item.slot} className="card-sheen rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">{item.time}</span>
              <span className="text-base font-semibold text-white">{item.slot}</span>
              <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase", VERDICT[item.verdict].cls)}>
                {VERDICT[item.verdict].label}
              </span>
              <span className="ml-auto font-mono text-xs text-zinc-500 tabular-nums">
                ~{item.kcal} kcal · {item.protein} g P
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-zinc-300">{item.eats}</p>
            <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/8 bg-black/25 p-3.5">
                <div className="font-mono text-[10px] tracking-[0.16em] text-rose-300/80 uppercase">The problem</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{item.issue}</p>
              </div>
              <div className="rounded-xl border border-lime-400/20 bg-lime-400/[0.06] p-3.5">
                <div className="font-mono text-[10px] tracking-[0.16em] text-lime-300/80 uppercase">The swap</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-300">{item.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Gap analysis</h3>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-white/[0.05] font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
                <tr>
                  <th className="px-4 py-2.5">Metric</th>
                  <th className="px-3 py-2.5">Now</th>
                  <th className="px-3 py-2.5">Target</th>
                  <th className="hidden px-4 py-2.5 sm:table-cell">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {CURRENT_DIET_VERDICTS.map((r) => (
                  <tr key={r.label} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-2.5 font-medium text-zinc-200">{r.label}</td>
                    <td className="px-3 py-2.5 font-mono text-rose-300/90 whitespace-nowrap">{r.now}</td>
                    <td className="px-3 py-2.5 font-mono text-lime-300 whitespace-nowrap">{r.need}</td>
                    <td className="hidden px-4 py-2.5 text-[12.5px] text-zinc-500 sm:table-cell">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Swap list — pin this on the fridge</h3>
          <div className="space-y-2">
            {MEAL_SWAPS.map((s) => (
              <div key={s.from} className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 text-rose-400">✕</span>
                  <span className="text-[13px] text-zinc-400 line-through decoration-rose-400/50">{s.from}</span>
                </div>
                <div className="mt-1 flex items-start gap-2.5">
                  <span className="mt-1 text-lime-400">✓</span>
                  <span className="text-[13px] font-medium text-zinc-200">{s.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <Badge tone="amber">Why you are stuck at 87 kg on 1,650 kcal</Badge>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { h: "Protein is 2× too low", p: "With ~80 g/day, up to 30–40% of the weight you lose on a cut is muscle. You get lighter and softer at the same time." },
            { h: "The deficit is too deep", p: "900 kcal under maintenance with no protein and no progression = adaptive down-regulation, cold hands, bad sleep, zero gym progress." },
            { h: "The extras are invisible", p: "Mayo, sugar in three teas, rusk at 9:30, oil poured freely in the salan. Roughly 450–550 kcal a day that never get counted." },
          ].map((x) => (
            <div key={x.h} className="rounded-xl border border-white/8 bg-black/25 p-4">
              <div className="text-sm font-semibold text-amber-200">{x.h}</div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-400">{x.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Protein target achieved (current diet)</span>
            <span className="font-mono">73 / 165 g</span>
          </div>
          <Bar pct={44} tone="rose" />
        </div>
      </div>
    </Section>
  );
}
