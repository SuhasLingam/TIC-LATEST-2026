import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles, deliverables } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { Zap, CheckCircle2, Lock, Inbox } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  available:    "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/5",
  scheduled:    "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-500/20 dark:text-amber-400 dark:bg-amber-500/5",
  "in-progress":"border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-500/20 dark:text-blue-400 dark:bg-blue-500/5",
  active:       "border-purple-200 text-purple-600 bg-purple-50 dark:border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/5",
};

export default async function PerksPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) redirect("/");

  const profile = await db.query.profiles.findFirst({ where: eq(profiles.id, authData.user.id) });
  if (!profile) return null;

  const perks = await db.query.deliverables.findMany({
    where: eq(deliverables.profileId, profile.id),
    orderBy: [desc(deliverables.updatedAt)],
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar profile={profile} />
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Top bar */}
        <div className="flex h-14 shrink-0 items-center gap-3 px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-400/10 border border-amber-200/60 dark:border-amber-400/20 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Member Perks</p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {profile.tier} · {perks.length} deliverable{perks.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto min-h-0">
          <div className="px-8 py-6 max-w-5xl mx-auto space-y-5">
          {perks.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              <div>
                <p className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">No deliverables yet</p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                  Your TIC coordinator will push your membership deliverables here. Check back after your onboarding call.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {perks.map((perk) => (
                  <div key={perk.id}
                    className="group relative bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 hover:border-amber-200 dark:hover:border-amber-400/30 transition-all duration-300">
                    {/* Gold shimmer on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/40 to-transparent transition-all duration-500 rounded-t-2xl" />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-200 leading-tight">{perk.title}</h3>
                      <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[perk.status] ?? "border-zinc-200 text-zinc-500"}`}>
                        {perk.status}
                      </span>
                    </div>

                    {perk.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{perk.description}</p>
                    )}

                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      Access Deliverable <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Upgrade card for Explorer members */}
                {profile.tier === "Explorer" && (
                  <div className="relative bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-500 dark:text-zinc-400 mb-1">Unlock Visionary Engine</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Upgrade for deep execution support</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
