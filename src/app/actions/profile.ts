"use server";

import { createClient } from "~/utils/supabase/server";
import { db } from "~/server/db";
import { profiles } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function completeProfile(data: {
  fullName: string;
  role: string;
  companyName: string;
  startupStage: string;
  mainGoal: string;
  tier: string;
  selectedCardId: string;
}) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    throw new Error("Unauthorized - No active session");
  }

  const userId = authData.user.id;
  const email = authData.user.email!; // defined since its email auth

  // Insert or Update profile on Drizzle
  try {
    const existing = await db.query.profiles.findFirst({
      where: (p, { eq }) => eq(p.id, userId),
    });

    if (existing) {
      await db
        .update(profiles)
        .set({
          fullName: data.fullName,
          role: data.role,
          companyName: data.companyName,
          startupStage: data.startupStage,
          mainGoal: data.mainGoal,
          tier: data.tier,
          selectedCardId: data.selectedCardId,
          onboardingStep: 3,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, userId));
    } else {
      await db.insert(profiles).values({
        id: userId,
        email,
        fullName: data.fullName,
        role: data.role,
        companyName: data.companyName,
        startupStage: data.startupStage,
        mainGoal: data.mainGoal,
        tier: data.tier,
        selectedCardId: data.selectedCardId,
        paymentStatus: "pending",
        onboardingStep: 3,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("DB Profile Insert Error", error);
    throw new Error("Failed to save profile. Please try again.");
  }
}

export async function skipPayment() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) throw new Error("Unauthorized");

  await db
    .update(profiles)
    .set({ paymentStatus: "skipped", onboardingStep: 4, updatedAt: new Date() })
    .where(eq(profiles.id, authData.user.id));

  return { success: true };
}
