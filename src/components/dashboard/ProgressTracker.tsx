import { CheckCircle2, Circle, Lock } from "lucide-react";

const MILESTONE_STEPS = [
  { key: "problem_validated", label: "Problem Validated",  desc: "Core problem clearly defined and validated with real users." },
  { key: "icp_defined",       label: "ICP Defined",        desc: "Ideal customer profile locked and documented." },
  { key: "mvp_built",         label: "MVP Built",          desc: "Minimum viable product shipped to users." },
  { key: "first_revenue",     label: "First Revenue",      desc: "At least one paying customer acquired." },
];

interface Props {
  milestones: { key: string; completedAt: Date | null }[];
}

export function ProgressTracker({ milestones }: Props) {
  const completedKeys = new Set(milestones.filter((m) => m.completedAt !== null).map((m) => m.key));
  const completedCount = completedKeys.size;
  const pct = Math.round((completedCount / MILESTONE_STEPS.length) * 100);

  return (
    <div className="dash-card p-5">
      <div className="dash-card-accent" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="dash-label mb-0.5">Milestone Progress</p>
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 leading-none">Execution Tracker</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 leading-none">{pct}%</p>
          <p className="dash-label mt-0.5">{completedCount} / {MILESTONE_STEPS.length}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 mb-5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MILESTONE_STEPS.map((step, i) => {
          const done   = completedKeys.has(step.key);
          const locked = i > completedCount && !done;
          return (
            <div
              key={step.key}
              className={`rounded-xl p-3.5 border transition-all ${
                done
                  ? "bg-amber-50 dark:bg-amber-400/5 border-amber-200/60 dark:border-amber-400/20"
                  : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 opacity-60"
              }`}
            >
              <div className="mb-2">
                {done ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 dark:text-amber-400" />
                ) : locked ? (
                  <Lock className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                ) : (
                  <Circle className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                )}
              </div>
              <p className={`text-xs font-bold leading-tight mb-1 ${done ? "text-amber-700 dark:text-amber-300" : "text-zinc-500 dark:text-zinc-400"}`}>
                {step.label}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-snug">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
