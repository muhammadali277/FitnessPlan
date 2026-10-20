import { ASSESSMENT, BODY_STATS, CLIENT } from "@/data/plan";
import { Badge, Card, Section, Stat } from "@/components/ui";
import { cn } from "@/utils/cn";

const toneMap: Record<string, string> = {
  lime: "from-lime-400/15",
  amber: "from-amber-400/15",
  rose: "from-rose-400/15",
  cyan: "from-cyan-400/15",
};

export default function Assessment() {
  return (
    <Section
      id="assessment"
      eyebrow="Step 01 · Clinical read"
      title="What your numbers actually say"
      lead="Before any diet is written, the numbers must be honest. Here is the breakdown of where you are today, and the three conclusions that shape everything else in this plan."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BODY_STATS.map((s, i) => (
          <Stat key={s.label} label={s.label} value={s.value} unit={s.unit} hint={s.hint} tone={i > 2 ? "cyan" : "lime"} />
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Age / Sex", v: "25 · Male" },
          { k: "Height", v: CLIENT.heightLabel },
          { k: "Occupation load", v: "Sedentary · 9 h seated" },
          { k: "Sleep window", v: "11–12 → 7:00 (7 h)" },
        ].map((x) => (
          <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <div className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{x.k}</div>
            <div className="mt-1 text-sm font-semibold text-zinc-200">{x.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {ASSESSMENT.map((a, i) => (
          <Card key={a.title} className={cn("bg-gradient-to-br to-transparent", toneMap[a.tone])}>
            <div className="flex items-start gap-4">
              <span className="mt-0.5 font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[17px] leading-snug font-semibold text-white">{a.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-400">{a.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-lime-400/25 bg-gradient-to-r from-lime-400/10 to-transparent p-6">
        <Badge tone="lime">The single sentence that matters</Badge>
        <p className="mt-4 text-lg leading-snug font-medium text-white sm:text-xl">
          Your job for the next 12 weeks is not “lose 17 kg”. It is{" "}
          <span className="text-lime-300">lose 6–8 kg of fat, keep every gram of muscle, and get strong in the 8–15 rep range</span>.
          Do that twice and you land at 75–77 kg with visible abs — which will look far better than 70 kg ever would.
        </p>
      </div>
    </Section>
  );
}
