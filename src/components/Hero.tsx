import { CLIENT } from "@/data/plan";
import { Badge } from "@/components/ui";

function Figure({ shoulderHalf, waistHalf, dim, label, waist }: { shoulderHalf: number; waistHalf: number; dim?: boolean; label: string; waist: string }) {
  const sh = shoulderHalf;
  const wh = waistHalf;
  const gid = `fig-${label.replace(/[^a-z0-9]/gi, "")}`;
  const torso = `M ${60 - sh} 54 C ${60 - sh + 4} 44, 52 34, 60 34 C 68 34, ${60 + sh - 4} 44, ${60 + sh} 54 C ${60 + sh - 2} 80, ${60 + wh + 3} 100, ${60 + wh} 122 L ${60 - wh} 122 C ${60 - wh - 3} 100, ${60 - sh + 2} 80, ${60 - sh} 54 Z`;
  const armL = `M ${60 - sh} 55 C ${60 - sh - 7} 72, ${60 - sh - 11} 98, ${60 - sh - 9} 124 L ${60 - sh + 2} 119 C ${60 - sh + 1} 94, ${60 - sh + 2} 72, ${60 - sh + 6} 57 Z`;
  const armR = `M ${60 + sh} 55 C ${60 + sh + 7} 72, ${60 + sh + 11} 98, ${60 + sh + 9} 124 L ${60 + sh - 2} 119 C ${60 + sh - 1} 94, ${60 + sh - 2} 72, ${60 + sh - 6} 57 Z`;
  const legL = `M ${60 - wh - 2} 120 L ${60 - wh - 9} 212 L ${60 - wh + 9} 212 L ${60 - wh + 7} 120 Z`;
  const legR = `M ${60 + wh + 2} 120 L ${60 + wh + 9} 212 L ${60 + wh - 9} 212 L ${60 + wh - 7} 120 Z`;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 232" className="h-52 w-28 sm:h-64 sm:w-32">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dim ? "#71717a" : "#a3e635"} stopOpacity="0.95" />
            <stop offset="100%" stopColor={dim ? "#3f3f46" : "#22d3ee"} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g fill={`url(#${gid})`} opacity={dim ? 0.5 : 1}>
          <circle cx="60" cy="18" r="12" />
          <rect x="54" y="28" width="12" height="9" rx="4" />
          <path d={torso} />
          <path d={armL} />
          <path d={armR} />
          <path d={legL} />
          <path d={legR} />
        </g>
        <line x1="6" y1="122" x2="114" y2="122" stroke={dim ? "#71717a" : "#a3e635"} strokeWidth="0.7" strokeDasharray="3 3" opacity="0.7" />
      </svg>
      <div className="mt-1 text-center">
        <div className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">{label}</div>
        <div className={`font-mono text-sm font-semibold ${dim ? "text-zinc-400" : "text-lime-300"}`}>{waist}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="top" className="relative overflow-hidden pt-28 pb-10 sm:pt-36">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_35%,transparent_100%)]" />
      <div className="absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-lime-500/12 blur-[110px]" />
      <div className="absolute -top-24 right-0 h-[22rem] w-[22rem] rounded-full bg-cyan-500/12 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="rise">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="lime">● Client file · 25 M · 5'11"</Badge>
            <Badge tone="zinc">87 kg → 75–78 kg</Badge>
            <Badge tone="amber">Goal: lean, not bulky</Badge>
          </div>

          <h1 className="mt-6 text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.03em] text-white sm:text-6xl">
            Lose the bulk.
            <br />
            <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Keep the frame.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-zinc-400">
            You do not have a “big” body — you have a wide, high-potential frame carrying about{" "}
            <span className="font-semibold text-zinc-200">19 kg of fat</span> over it. This is a 12-week, evidence-based plan to strip
            that fat while protecting your <span className="font-semibold text-zinc-200">68 kg of lean mass</span>: exact macros, a
            desi meal plan built around your office hours, a 3-day gym programme that prioritises shoulders, upper chest and back
            width, and honest numbers for what 3 months can and cannot do.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#macros"
              className="glow-lime rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-[#07090c] transition hover:bg-lime-300"
            >
              See my numbers →
            </a>
            <a
              href="#meals"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
            >
              Jump to the meal plan
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              ["Duration", "12 weeks"],
              ["Deficit", "~575 kcal"],
              ["Protein", "165 g/day"],
              ["Sessions", "3 → 4 /wk"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{k}</dt>
                <dd className="mt-1 text-lg font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm [animation-delay:120ms] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Composition shift</div>
              <div className="mt-1 text-xl font-semibold text-white">Same shoulders. Smaller waist.</div>
            </div>
            <Badge tone="cyan">Projected</Badge>
          </div>

          <div className="mt-4 flex items-end justify-center gap-6 rounded-2xl border border-white/10 bg-black/30 px-2 py-4">
            <Figure shoulderHalf={30} waistHalf={26} dim label="Now" waist="waist 34.5 in" />
            <div className="mb-14 hidden flex-col items-center gap-1 sm:flex">
              <span className="text-lime-400">→</span>
            </div>
            <Figure shoulderHalf={32} waistHalf={17} label="Month 6" waist="waist 31 in" />
          </div>

          <div className="mt-5 space-y-2.5">
            {[
              { l: "Fat mass", a: "18.5 kg", b: "9–10 kg", tone: "text-rose-300" },
              { l: "Lean mass", a: "68.5 kg", b: "68–69 kg", tone: "text-lime-300" },
              { l: "Body fat", a: "~21%", b: "~13%", tone: "text-cyan-300" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-dashed border-white/10 pb-2 text-sm">
                <span className="text-zinc-500">{r.l}</span>
                <span className="flex items-center gap-2 font-mono">
                  <span className="text-zinc-400">{r.a}</span>
                  <span className="text-zinc-600">→</span>
                  <span className={`font-semibold ${r.tone}`}>{r.b}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-zinc-500">
            Frame: {CLIENT.frame}. References: {CLIENT.anchors.slice(0, 2).join(", ")}.{" "}
            <span className="text-zinc-400">“Bulky” is a body-fat problem, not a bone problem.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
