import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles, events } from "~/server/db/schema";
import { eq, desc, gte, lt } from "drizzle-orm";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { Calendar, MapPin, ArrowUpRight, Inbox, Globe } from "lucide-react";

const ACCESS_BADGE: Record<string, string> = {
  "All Members":  "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  Explorer:       "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  Visionary:      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  Trailblazer:    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
};

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) redirect("/");

  const profile = await db.query.profiles.findFirst({ where: eq(profiles.id, authData.user.id) });
  if (!profile) return null;

  const now = new Date();
  const upcoming = await db.query.events.findMany({ where: gte(events.date, now), orderBy: [events.date] });
  const past = await db.query.events.findMany({ where: lt(events.date, now), orderBy: [desc(events.date)] });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar profile={profile} />
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        <div className="flex h-14 shrink-0 items-center gap-3 px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-400/10 border border-amber-200/60 dark:border-amber-400/20 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Focused Sessions</p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {upcoming.length} upcoming · {past.length} past
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto min-h-0">
          <div className="px-8 py-6 max-w-5xl mx-auto space-y-8">
          {/* Upcoming */}
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-4">Upcoming Events</p>
            {upcoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
                <Inbox className="w-6 h-6 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-400 dark:text-zinc-500">No upcoming events right now.<br />Your coordinator will add sessions here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((event) => (
                  <div key={event.id}
                    className="group flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-2xl hover:border-amber-200 dark:hover:border-amber-400/30 transition-all">
                    <div className="max-w-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${ACCESS_BADGE[event.accessLevel] ?? ACCESS_BADGE["All Members"]}`}>
                          {event.accessLevel}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 mb-1">{event.name}</h3>
                      <p className="text-sm text-zinc-400 dark:text-zinc-500">{event.purpose}</p>
                    </div>
                    <div className="mt-5 md:mt-0 flex flex-col md:items-end gap-3 shrink-0">
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.date.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{event.format}</span>
                      </div>
                      <button className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-80 transition-opacity">
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past / Archive */}
          {past.length > 0 && (
            <section>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-4">Archive</p>
              <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden">
                {past.map((event, i) => (
                  <div key={event.id}
                    className={`flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${i > 0 ? "border-t border-zinc-100 dark:border-zinc-800/80" : ""}`}>
                    <div className="flex items-center gap-6">
                      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 w-28 shrink-0">
                        {event.date.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{event.name}</p>
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-600 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                      View Summary <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
