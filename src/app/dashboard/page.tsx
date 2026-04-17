import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.getUser();

  if (error || !authData?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-lg border border-foreground/10 bg-foreground/[0.02] backdrop-blur-xl p-10 rounded-2xl shadow-2xl">
        <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/35 mb-6">
          Member Portal
        </p>
        <h1 className="text-4xl font-heading mb-4 text-foreground">
          Founder Dashboard
        </h1>
        <p className="text-foreground/50 font-sans text-sm leading-relaxed mb-8">
          Welcome to The Incite Crew. Your profile is currently being reviewed
          by our strategic partners. Your dashboard modules will populate
          shortly.
        </p>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 font-sans text-xs text-foreground/50 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(212,175,55,0.8)] animate-pulse" />
          Status: Pending Review
        </div>

        <div className="pt-4 border-t border-foreground/10">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
