"use client";

import { api } from "~/trpc/react";
import { Rocket, ArrowUpRight, Calendar, Loader2, Inbox } from "lucide-react";

const TYPE_BADGE: Record<string, string> = {
  hackathon:      "dash-badge dash-badge-purple",
  internal_event: "dash-badge dash-badge-gold",
  collaboration:  "dash-badge dash-badge-blue",
};

const TYPE_LABEL: Record<string, string> = {
  hackathon:      "Hackathon",
  internal_event: "Event",
  collaboration:  "Collab",
};

interface Props {
  tier: string;
}

export function Opportunities({ tier }: Props) {
  const { data: opps, isLoading } = api.ecosystem.getOpportunities.useQuery({ tier });

  // Client-side eligibility filter: show if eligibilityRules is null/empty or includes user's tier
  const visible = opps?.filter((opp) => {
    if (!opp.eligibilityRules) return true;
    try {
      const rules = JSON.parse(opp.eligibilityRules) as { tiers?: string[] };
      if (!rules.tiers?.length) return true;
      return rules.tiers.includes(tier);
    } catch {
      return true;
    }
  });

  const parseTags = (raw: string | null): string[] => {
    if (!raw) return [];
    try { return JSON.parse(raw) as string[]; } catch { return raw.split(",").map(t => t.trim()); }
  };

  return (
    <div className="dash-card p-5 flex flex-col">
      <div className="dash-card-accent" />
      <div className="flex items-center gap-2.5 mb-5">
        <div className="h-7 w-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
          <Rocket className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <p className="dash-label">Opportunities</p>
      </div>

      <div className="space-y-3 flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-zinc-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="text-xs">Loading…</span>
          </div>
        ) : !visible?.length ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-zinc-400">
            <Inbox className="w-5 h-5 opacity-40" />
            <p className="text-xs text-center">No opportunities right now.<br />Check back soon.</p>
          </div>
        ) : (
          visible.map((opp) => {
            const tags = parseTags(opp.tags);
            const deadline = opp.endDate ? new Date(opp.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Open";
            return (
              <div key={opp.id}
                className="rounded-xl p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={TYPE_BADGE[opp.type] ?? "dash-badge"}>
                      {TYPE_LABEL[opp.type] ?? opp.type}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-zinc-400 dark:text-zinc-500">
                      <Calendar className="w-2.5 h-2.5" /> {deadline}
                    </span>
                  </div>
                  <button className="text-zinc-300 dark:text-zinc-600 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">{opp.title}</h4>
                {opp.description && (
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed">{opp.description}</p>
                )}
                {tags.length > 0 && (
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
