import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { User, Shield, Mail, Building, Briefcase } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) redirect("/");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, authData.user.id),
  });

  if (!profile) return null;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar profile={profile} />
      
      <main className="relative flex-1 flex flex-col overflow-y-auto px-8 py-12">
        <div className="bg-foreground/[0.02] pointer-events-none absolute top-0 left-0 h-full w-full rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-4xl w-full mx-auto">
          <header className="mb-12">
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)]">
                <User className="w-5 h-5 text-[rgba(212,175,55,0.8)]" />
              </div>
              <h1 className="font-heading text-4xl tracking-tight">Member Profile</h1>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-foreground/[0.02] border border-foreground/10 p-8 rounded-2xl">
                 <h2 className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-6">Identity</h2>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/20">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/20">Full Name</p>
                        <p className="text-lg text-foreground/80">{profile.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/20">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/20">Email Address</p>
                        <p className="text-lg text-foreground/80">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/20">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/20">Company / Project</p>
                        <p className="text-lg text-foreground/80">{profile.companyName || "Not specified"}</p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="bg-foreground/[0.02] border border-foreground/10 p-8 rounded-2xl">
                 <h2 className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold mb-6">Strategic Context</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-foreground/20 mb-1">Startup Stage</p>
                        <p className="text-sm text-foreground/70 break-all">{profile.startupStage || "Not specified"}</p>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-foreground/20 mb-1">Main Goal</p>
                        <p className="text-sm text-foreground/70 break-all">{profile.mainGoal || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-foreground/5 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-foreground/20 mb-2">Why TIC?</p>
                      <p className="text-sm text-foreground/70 leading-relaxed break-all">{profile.whyTic || "Not specified"}</p>
                  </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-[rgba(212,175,55,0.03)] border border-[rgba(212,175,55,0.1)] p-8 rounded-2xl">
                 <h2 className="text-[10px] uppercase tracking-[0.3em] text-[rgba(212,175,55,0.6)] font-bold mb-6">Identity Card</h2>
                 <div className="flex flex-col items-center">
                    {profile.selectedCardId ? (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(212,175,55,0.2)] to-[rgba(212,175,55,0.1)] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <img 
                                src={`/cards/${profile.selectedCardId}`} 
                                alt="Membership Card" 
                                className="relative w-full max-w-[200px] rounded-xl shadow-2xl border border-white/10"
                            />
                        </div>
                    ) : (
                        <div className="h-48 w-32 rounded-xl bg-foreground/5 border border-dashed border-foreground/10 flex items-center justify-center text-center p-4">
                            <p className="text-[9px] uppercase tracking-widest text-foreground/20">No Card Selected</p>
                        </div>
                    )}
                    <div className="mt-8 text-center">
                        <h3 className="font-heading text-2xl text-[rgba(212,175,55,0.9)] mb-1">{profile.tier}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/30">Active Member</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
