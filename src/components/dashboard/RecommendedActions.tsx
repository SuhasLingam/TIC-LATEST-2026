"use client";

import { api } from "~/trpc/react";
import { Lightbulb, ArrowRight, Loader2, Inbox } from "lucide-react";

const TYPE_BADGE: Record<string, string> = {
  hackathon: "dash-badge dash-badge-purple",
  founder:   "dash-badge dash-badge-blue",
  strategy:  "dash-badge dash-badge-gold",
  event:     "dash-badge dash-badge-green",
};

interface Props {
  profileId: string;
}

export function RecommendedActions({ profileId }: Props) {
  const { data: recs, isLoading } = api.ecosystem.getRecommendations.useQuery({ profileId });
  const dismiss = api.ecosystem.dismissRecommendation.useMutation({
    onSuccess: () => utils.ecosystem.getRecommendations.invalidate(),
  });
  const utils = api.useUtils();

  return (
    <div className="dash-card p-5 flex flex-col">
      <div className="dash-card-accent" />
      <div className="flex items-center gap-2.5 mb-5">
        <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-400/10 border border-amber-200/60 dark:border-amber-400/20 flex items-center justify-center">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
        </div>
        <p className="dash-label leading-none">Recommended Actions</p>
      </div>

      <div className="space-y-2 flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-zinc-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="text-xs">Loading…</span>
          </div>
        ) : !recs?.length ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-zinc-400">
            <Inbox className="w-5 h-5 opacity-40" />
            <p className="text-xs text-center">No recommendations yet.<br />Check back after your next session.</p>
          </div>
        ) : (
          recs.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5
                bg-zinc-50 dark:bg-zinc-800/50
                border border-zinc-100 dark:border-zinc-800
                hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={TYPE_BADGE[rec.type] ?? "dash-badge"}>{rec.type}</span>
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{rec.title}</p>
              </div>
              <button
                onClick={() => dismiss.mutate({ id: rec.id })}
                className="dash-btn-ghost shrink-0"
              >
                Dismiss <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
