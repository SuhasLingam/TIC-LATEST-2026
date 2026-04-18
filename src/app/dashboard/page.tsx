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
    <main className="bg-background text-foreground relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <div className="bg-foreground/[0.03] pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="border-foreground/10 bg-foreground/[0.02] z-10 max-w-lg rounded-2xl border p-10 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-foreground/35 mb-6 font-sans text-[9px] tracking-widest uppercase">
          Member Portal
        </p>
        <h1 className="font-heading text-foreground mb-4 text-4xl">
          Founder Dashboard
        </h1>
        <p className="text-foreground/50 mb-8 font-sans text-sm leading-relaxed">
          Welcome to The Incite Crew. Your profile is currently being reviewed
          by our strategic partners. Your dashboard modules will populate
          shortly.
        </p>

        <div className="bg-foreground/5 border-foreground/10 text-foreground/50 mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 font-sans text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgba(212,175,55,0.8)]" />
          Status: Pending Review
        </div>

        <div className="border-foreground/10 border-t pt-4">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
