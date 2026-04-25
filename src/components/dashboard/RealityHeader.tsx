import { Shield, Target, AlertTriangle } from "lucide-react";

interface Props {
  stage: string | null;
  goal: string | null;
  blocker?: string | null;
}

const BLOCKER_MAP: Record<string, string> = {
  "Distribution / GTM": "No Distribution Channel",
  "Capital & Fundraising": "No Investor Traction",
  "Operational Efficiency": "Execution Bottleneck",
  "Product Engagement": "Low User Retention",
};

const GOAL_MAP: Record<string, string> = {
  "Distribution / GTM": "Get First Users",
  "Capital & Fundraising": "Close Seed Round",
  "Operational Efficiency": "Streamline Ops",
  "Product Engagement": "Drive Activation",
};

export function RealityHeader({ stage, goal, blocker }: Props) {
  const focus = goal ? (GOAL_MAP[goal] ?? goal) : "Define Focus";
  const keyBlocker = blocker ?? (goal ? (BLOCKER_MAP[goal] ?? "Identify Blocker") : "Unknown");
  const currentStage = stage ?? "Not set";

  return (
    <div className="dash-card p-5">
      <div className="dash-card-accent" />
      <p className="dash-label mb-4">Reality Check — Current State</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-400/10 border border-amber-200/60 dark:border-amber-400/20 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <p className="dash-label mb-0.5">Stage</p>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400">{currentStage}</p>
          </div>
        </div>

        <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800 self-center hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <p className="dash-label mb-0.5">Primary Focus</p>
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{focus}</p>
          </div>
        </div>

        <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800 self-center hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-orange-50 dark:bg-orange-400/10 border border-orange-200/60 dark:border-orange-400/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </div>
          <div>
            <p className="dash-label mb-0.5">Key Blocker</p>
            <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{keyBlocker}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
