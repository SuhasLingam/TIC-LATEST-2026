import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles, insights } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";
import InsightsClient from "./InsightsClient";

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) redirect("/");

  const profile = await db.query.profiles.findFirst({ 
    where: eq(profiles.id, authData.user.id) 
  });
  
  if (!profile) return null;

  const allInsights = await db.query.insights.findMany({ 
    orderBy: [desc(insights.createdAt)] 
  });

  return <InsightsClient profile={profile} insights={allInsights} />;
}
