import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles, milestones } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { FounderClarityIntake } from "~/components/dashboard/FounderClarityIntake";
import { ExecutionBoard } from "~/components/dashboard/ExecutionBoard";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { EcosystemSeeder } from "~/components/dashboard/EcosystemSeeder";

import { RecommendedActions } from "~/components/dashboard/RecommendedActions";
import { NetworkLayer } from "~/components/dashboard/NetworkLayer";
import { Opportunities } from "~/components/dashboard/OpportunitiesPanel";
import { ProgressTracker } from "~/components/dashboard/ProgressTracker";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.getUser();

  if (error || !authData?.user) redirect("/");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, authData.user.id),
  });

  if (!profile || profile.onboardingStep === 0) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 bg-white dark:bg-zinc-950">
        <FounderClarityIntake profileId={profile?.id ?? authData.user.id} tier={profile?.tier || "Explorer"} />
      </main>
    );
  }

  const userMilestones = await db.query.milestones.findMany({
    where: eq(milestones.profileId, profile.id),
  });

  return (
    // Outer shell — fixed to viewport, no scroll
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar profile={profile} />
      {/* Seeds milestones on first load only */}
      <EcosystemSeeder profileId={profile.id} tier={profile.tier!} />

      {/* Right column: top bar + scrollable content */}
      {/* min-w-0 prevents flex child from overflowing; overflow-hidden clips it */}
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">

        {/* Top bar — never scrolls */}
        <div className="flex h-14 shrink-0 items-center px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              {profile.companyName ?? "Execution Matrix"}
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {profile.tier} · Active
            </p>
          </div>
        </div>

        {/* Scrollable area — fills remaining height */}
        <main className="flex-1 overflow-y-auto min-h-0 [will-change:transform]">
          <div className="px-8 py-6 space-y-5 max-w-[1400px] mx-auto">



            {/* Row 2 — Execution Board */}
            <ExecutionBoard
              profileId={profile.id}
              tier={profile.tier!}
              stage={profile.startupStage}
              goal={profile.mainGoal}
            />

            {/* Row 3 — Live data panels from admin */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <RecommendedActions profileId={profile.id} />
              <NetworkLayer profileId={profile.id} />
              <Opportunities tier={profile.tier!} />
            </div>

            {/* Row 4 — Progress Tracker */}
            <ProgressTracker milestones={userMilestones} />

          </div>
        </main>
      </div>
    </div>
  );
}
