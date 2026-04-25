"use client";

import { api } from "~/trpc/react";
import { Users, ExternalLink, Loader2, Inbox } from "lucide-react";

const RELATION_COLORS: Record<string, string> = {
  "co-founder":    "dash-badge dash-badge-purple",
  mentor:          "dash-badge dash-badge-gold",
  peer:            "dash-badge dash-badge-blue",
  collaborator:    "dash-badge dash-badge-green",
};

interface Props {
  profileId: string;
}

export function NetworkLayer({ profileId }: Props) {
  // Network graph shows connections for this user — admin manages connections via broadcast router
  // For now render from networkGraph table (admin can seed entries via DB or future admin UI)
  const { data: recs } = api.ecosystem.getRecommendations.useQuery({ profileId });

  // Filter only "founder" type recommendations as network suggestions
  const networkRecs = recs?.filter((r) => r.type === "founder" || r.type === "co-founder" || r.type === "mentor" || r.type === "peer");

  return (
    <div className="dash-card p-5 flex flex-col">
      <div className="dash-card-accent" />
      <div className="flex items-center gap-2.5 mb-5">
        <div className="h-7 w-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
          <Users className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <p className="dash-label">Network Layer</p>
      </div>

      <div className="space-y-2 flex-1">
        {!networkRecs?.length ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-zinc-400">
            <Inbox className="w-5 h-5 opacity-40" />
            <p className="text-xs text-center">No network suggestions yet.<br />Your coordinator will add connections.</p>
          </div>
        ) : (
          networkRecs.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5
                bg-zinc-50 dark:bg-zinc-800/50
                border border-zinc-100 dark:border-zinc-800
                hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300 shrink-0">
                  {rec.title.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{rec.title}</p>
                  {rec.reason && (
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{rec.reason}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={RELATION_COLORS[rec.type] ?? "dash-badge"}>{rec.type}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {!!networkRecs?.length && (
        <button className="mt-4 w-full py-2 dash-btn-ghost justify-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700">
          View Full Network <ExternalLink className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
