import { Badge } from "@/components/ui";

const RECAP = [
  { k: "Calories", v: "2,000–2,100 / day" },
  { k: "Protein", v: "160–170 g / day" },
  { k: "Carbs", v: "205–215 g / day" },
  { k: "Fat", v: "60–66 g / day" },
  { k: "Water", v: "3–3.5 L" },
  { k: "Steps", v: "8,000–10,000" },
  { k: "Lifting", v: "3 × 50 min" },
  { k: "Sleep", v: "7.5 h" },
  { k: "Free meal", v: "1 / week" },
  { k: "Loss rate", v: "0.5–0.65 kg / wk" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40">
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,#000_20%,transparent_100%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Badge tone="lime">The whole plan on one screen</Badge>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              87 kg → <span className="text-lime-300">79.5 kg</span> in 12 weeks.
              <br />
              Then <span className="text-cyan-300">76 kg at 13% body fat</span> by month 6.
            </h3>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-400">
              Nothing in this plan is exotic. Protein, a modest deficit, three progressive lifting sessions, 8,000 steps, water and
              sleep — repeated for 90 days without negotiation. The reason it works is not the details; it is that you keep doing it
              on the days you don't feel like it. That is the entire secret, and it is the only part nobody can do for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="glow-lime rounded-xl bg-lime-400 px-5 py-2.5 text-[13px] font-semibold text-[#07090c] transition hover:bg-lime-300"
              >
                Print / save as PDF
              </button>
              <a
                href="#tracker"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-zinc-200 transition hover:border-white/30"
              >
                Start tracking today
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Daily targets</div>
            <div className="mt-3 divide-y divide-white/8">
              {RECAP.map((r) => (
                <div key={r.k} className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-zinc-400">{r.k}</span>
                  <span className="font-mono text-[13px] font-semibold text-lime-300">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[11.5px] leading-relaxed text-zinc-500">
            <span className="font-semibold text-zinc-400">Note:</span> this is an educational plan built from the information you
            provided (25 M, 5'11", 87 kg, sedentary office job, no reported medical conditions) using standard evidence-based
            estimates — Mifflin-St Jeor for energy needs, circumference-based body-fat estimation and current sports-nutrition
            guidance on protein (1.6–2.2 g/kg) and deficit size. Individual responses vary with genetics, thyroid function, medication
            and training history. If you have any kidney, liver, thyroid, blood-pressure or metabolic condition, or if you develop
            dizziness, persistent fatigue or menstrual/hormonal changes, stop and see a doctor before continuing. Not medical advice.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-zinc-600 uppercase">
            Project Lean · 12-week blueprint · generated for client file #LK-25
          </p>
        </div>
      </div>
    </footer>
  );
}
