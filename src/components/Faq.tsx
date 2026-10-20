import { useState } from "react";
import { FAQS } from "@/data/plan";
import { Section } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="faq"
      eyebrow="Step 10 · Questions"
      title="The questions you will ask in week 2"
      lead="Answered now, so you don't have to guess later."
    >
      <div className="space-y-2.5">
        {FAQS.map((f, i) => (
          <div
            key={f.q}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              open === i ? "border-lime-400/35 bg-lime-400/[0.05]" : "border-white/10 bg-white/[0.025] hover:border-white/20",
            )}
          >
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
              <span className={cn("font-mono text-[11px]", open === i ? "text-lime-400" : "text-zinc-600")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("flex-1 text-[15px] font-semibold", open === i ? "text-white" : "text-zinc-300")}>{f.q}</span>
              <span className={cn("text-lg text-zinc-500 transition-transform", open === i && "rotate-45 text-lime-400")}>+</span>
            </button>
            {open === i ? (
              <p className="px-5 pb-5 pl-[3.4rem] text-[13.5px] leading-relaxed text-zinc-400">{f.a}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
