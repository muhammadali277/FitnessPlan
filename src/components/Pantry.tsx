import { GROCERY, SUPPLEMENTS } from "@/data/plan";
import { Badge, Section, useLocal } from "@/components/ui";
import { cn } from "@/utils/cn";

type CheckState = Record<string, boolean>;

export default function Pantry() {
  const [checked, setChecked] = useLocal<CheckState>("lk-pantry", {});
  const allKeys = GROCERY.flatMap((g) => g.items.map((i) => `${g.group}-${i.name}`));
  const doneCount = allKeys.filter((k) => checked[k]).length;
  const toggle = (k: string) => setChecked((c) => ({ ...c, [k]: !c[k] }));

  return (
    <Section
      id="pantry"
      eyebrow="Step 05 · Shopping"
      title="Weekly grocery + supplement list"
      lead="Sunday is prep day: cook the chicken, boil the eggs, hang the curd, chop the salad, portion the dal and rice. Ninety minutes of work that makes the other six days automatic — because when the food is ready, the diet is easy."
    >
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[180px]">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Shopping list ticked off</span>
            <span className="font-mono">
              {doneCount} / {allKeys.length}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${(doneCount / allKeys.length) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => setChecked({})}
          className="rounded-lg border border-white/15 px-3 py-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase transition hover:border-white/30 hover:text-white"
        >
          Reset list
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GROCERY.map((g) => (
          <div
            key={g.group}
            className={cn(
              "rounded-2xl border p-4",
              g.group.startsWith("Delete") ? "border-rose-400/25 bg-rose-400/[0.05]" : "border-white/10 bg-white/[0.025]",
            )}
          >
            <h3
              className={cn(
                "text-[13px] font-semibold",
                g.group.startsWith("Delete") ? "text-rose-200" : "text-white",
              )}
            >
              {g.group}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {g.items.map((i) => {
                const key = `${g.group}-${i.name}`;
                return (
                  <li key={key}>
                    <button onClick={() => toggle(key)} className="group flex w-full items-start gap-2.5 text-left">
                      <span
                        className={cn(
                          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition",
                          checked[key] ? "border-lime-400 bg-lime-400 text-[#07090c]" : "border-white/25 group-hover:border-lime-400/70",
                        )}
                      >
                        {checked[key] ? <span className="text-[9px] leading-none font-black">✓</span> : null}
                      </span>
                      <span className="flex-1">
                        <span className={cn("block text-[12.5px] leading-snug", checked[key] ? "text-zinc-600 line-through" : "text-zinc-300")}>
                          {i.name}
                        </span>
                        <span className="font-mono text-[10.5px] text-zinc-600">{i.qty}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Supplements — what is worth your money</h3>
          <Badge tone="lime">Only 3 are worth it</Badge>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPLEMENTS.map((s) => (
            <div
              key={s.name}
              className={cn(
                "rounded-xl border p-4",
                s.must ? "border-lime-400/25 bg-lime-400/[0.06]" : "border-white/10 bg-black/25",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className={cn("text-[13.5px] font-semibold", s.must ? "text-lime-200" : "text-zinc-300")}>{s.name}</h4>
                <span className="font-mono text-[10px] text-zinc-500">{s.dose.split("(")[0]}</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">{s.why}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-zinc-500">
          Start creatine in week 1 (3 g daily, every day, on gym days and rest days alike). Do not cycle it, do not load it, do not
          panic when the scale jumps 1 kg in week 2 — that is intramuscular water, and it is exactly what makes muscles look fuller.
        </p>
      </div>
    </Section>
  );
}
