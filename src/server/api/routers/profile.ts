import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { profiles, applications } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "~/utils/supabase/server";

export const profileRouter = createTRPCRouter({
  activateProfile: publicProcedure
    .input(
      z.object({
        token: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 1. Get authenticated user from session
      const supabase = await createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();

      const userEmail = authData?.user?.email;
      if (authError || !userEmail || !authData.user) {
        throw new Error("Unauthorized. Please complete OTP verification first.");
      }

      const user = authData.user;

      // 2. Find accepted application by token
      const app = await ctx.db.query.applications.findFirst({
        where: eq(applications.token, input.token),
      });

      if (!app) {
        throw new Error("Invalid activation token.");
      }
      
      if (app.status !== "approved") {
        throw new Error("Application not approved yet.");
      }

      // 3. Security check: authenticated email must match application email
      if (userEmail.toLowerCase() !== app.email.toLowerCase()) {
        throw new Error("Security violation: Verified email does not match the application email.");
      }

      // 4. Upsert profile
      const [profile] = await ctx.db
        .insert(profiles)
        .values({
          id: user.id,
          email: app.email,
          fullName: app.name ?? "Founder",
          tier: app.assignedTier ?? app.tierInterest,
          role: app.role,
          companyName: app.companyName,
          startupStage: app.startupStage,
          mainGoal: app.buildingContext, // Use building context as initial goal/context
          paymentStatus: "completed", // Mock successful payment
          onboardingStep: 0, // Need dashboard intake
        })
        .onConflictDoUpdate({
          target: profiles.id,
          set: {
            paymentStatus: "completed",
            // onboardingStep intentionally NOT reset on conflict —
            // preserves progress if user revisits the activation page
          }
        })
        .returning();

      return profile;
    }),

  completeOnboarding: publicProcedure
    .input(z.object({ 
      authUserId: z.string(),
      problemType: z.string(),
      growthBlocker: z.string(),
      selectedCardId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(profiles)
        .set({ 
          onboardingStep: 1,
          selectedCardId: input.selectedCardId,
          mainGoal: `${input.problemType} | ${input.growthBlocker}`
        })
        .where(eq(profiles.id, input.authUserId));
      return { success: true };
    }),
});
