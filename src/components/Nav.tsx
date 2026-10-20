import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const LINKS = [
  { id: "assessment", label: "Assessment" },
  { id: "audit", label: "Diet Audit" },
  { id: "macros", label: "Macros" },
  { id: "meals", label: "Meal Plan" },
  { id: "training", label: "Training" },
  { id: "schedule", label: "Schedule" },
  { id: "outcomes", label: "Outcomes" },
  { id: "tracker", label: "Tracker" },
  { id: "faq", label: "FAQ" },
];

export default function Nav() {
  const [active, setActive] = useState("assessment");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight * 0.32;
      let current = LINKS[0].id;
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= mid) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-[#07090c]/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-lime-300 to-emerald-500 text-[13px] font-black text-[#07090c]">
            LK
            <span className="absolute -inset-1 rounded-xl bg-lime-400/20 blur-md" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Project<span className="text-lime-400">Lean</span>
            <span className="ml-2 hidden font-mono text-[10px] tracking-widest text-zinc-500 uppercase sm:inline">/ 12-week blueprint</span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                active === l.id ? "bg-white/10 text-lime-300" : "text-zinc-400 hover:text-white",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="hidden rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1.5 text-[12.5px] font-semibold text-lime-300 transition hover:bg-lime-400/20 sm:block"
          >
            Print plan
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-zinc-300 lg:hidden"
          >
            <div className="space-y-1">
              <span className={cn("block h-0.5 w-4 bg-current transition", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("block h-0.5 w-4 bg-current transition", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-4 bg-current transition", open && "-translate-y-1.5 -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#07090c]/95 px-5 pb-4 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 gap-1.5 pt-3">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-[13px] font-medium",
                  active === l.id ? "bg-lime-400/15 text-lime-300" : "bg-white/5 text-zinc-300",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
