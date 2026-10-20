import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ── Layout ─────────────────────────────────────────────── */

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20", className)}>
      <div className="mb-9 max-w-3xl">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-lime-400/70" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-lime-400 uppercase">{eyebrow}</span>
        </div>
        <h2 className="text-3xl leading-[1.08] font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        {lead ? <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{lead}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "card-sheen rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/20",
        className,
      )}
    >
      {children}
    </div>
  );
}

const TONES: Record<string, string> = {
  lime: "border-lime-400/30 bg-lime-400/10 text-lime-300",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  sky: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  zinc: "border-white/15 bg-white/5 text-zinc-300",
};

export function Badge({
  children,
  tone = "zinc",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase",
        TONES[tone] ?? TONES.zinc,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  unit,
  hint,
  tone = "lime",
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  tone?: string;
}) {
  const color =
    tone === "amber" ? "text-amber-300" : tone === "cyan" ? "text-cyan-300" : tone === "rose" ? "text-rose-300" : "text-lime-300";
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-4">
      <div className="font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={cn("text-2xl font-semibold tabular-nums sm:text-[28px]", color)}>{value}</span>
        {unit ? <span className="text-xs text-zinc-500">{unit}</span> : null}
      </div>
      {hint ? <p className="mt-2 text-[11.5px] leading-snug text-zinc-500">{hint}</p> : null}
    </div>
  );
}

/* ── Progress bar ───────────────────────────────────────── */

export function Bar({ pct, tone = "lime" }: { pct: number; tone?: string }) {
  const grad =
    tone === "amber"
      ? "from-amber-400 to-orange-500"
      : tone === "cyan"
        ? "from-cyan-400 to-sky-500"
        : tone === "rose"
          ? "from-rose-400 to-pink-500"
          : "from-lime-400 to-emerald-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div className={cn("h-full rounded-full bg-gradient-to-r", grad)} style={{ width: `${Math.min(100, Math.max(2, pct))}%` }} />
    </div>
  );
}

/* ── Donut for macro split ──────────────────────────────── */

export function Donut({ slices, size = 168 }: { slices: { label: string; value: number; color: string }[]; size?: number }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {slices.map((s) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={13}
              strokeDasharray={`${Math.max(len - 3, 0)} ${c}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return el;
        })}
      </g>
    </svg>
  );
}

/* ── localStorage hook ──────────────────────────────────── */

export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / blocked */
    }
  }, [key, value]);
  const reset = useCallback(() => setValue(initial), [initial]);
  return [value, setValue, reset] as const;
}
