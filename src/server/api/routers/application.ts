import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { applications } from "~/server/db/schema";
import { sendApplicationEmail, sendConfirmationEmail } from "~/server/mail";
import { eq } from "drizzle-orm";

export const applicationRouter = createTRPCRouter({
  saveDraft: publicProcedure
    .input(
      z.object({
        token: z.string().uuid().optional(),
        name: z.string().optional(),
        email: z.string().email(),
        mobileNumber: z.string().optional(),
        companyName: z.string().optional(),
        website: z.string().optional(),
        role: z.string().optional(),
        startupStage: z.string().optional(),
        buildingContext: z.string().optional(),
        currentChallenge: z.string().optional(),
        traction: z.string().optional(),
        teamSize: z.string().optional(),
        whyTic: z.string().optional(),
        tierInterest: z.string().optional(),
        status: z.enum(["draft", "pending"]).default("draft"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, token, ...data } = input;

      let application;
      if (token) {
        const existing = await ctx.db.query.applications.findFirst({
          where: eq(applications.token, token),
        });
        if (existing) {
          [application] = await ctx.db
            .update(applications)
            .set({ ...data, email }) // Ensure email stays synced
            .where(eq(applications.token, token))
            .returning();
          return application;
        }
      }

      // If no token, check if email already has draft
      const existingEmailDraft = await ctx.db.query.applications.findFirst({
        where: eq(applications.email, email),
      });

      if (existingEmailDraft) {
        [application] = await ctx.db
          .update(applications)
          .set({ ...data })
          .where(eq(applications.email, email))
          .returning();
      } else {
        [application] = await ctx.db
          .insert(applications)
          .values({ email, ...data })
          .returning();
      }

      return application;
    }),

  submitFinal: publicProcedure
    .input(
      z.object({
        token: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.token, input.token),
      });

      if (!application) {
        throw new Error("Application not found");
      }

      // Calculate mock ICP score (out of 20)
      let score = 10;
      if (application.startupStage === "Revenue generating" || application.startupStage === "Growth") score += 5;
      if (application.traction && application.traction !== "No revenue yet") score += 5;

      const [updated] = await ctx.db
        .update(applications)
        .set({ status: "pending", icpScore: score })
        .where(eq(applications.token, input.token))
        .returning();

      if (!updated) {
        throw new Error("Failed to update application");
      }

      try {
        await Promise.all([
          sendApplicationEmail({
            ...updated,
            // Types expect string, handle null fallback gracefully if needed for mailer
            name: updated.name,
            email: updated.email,
            companyName: updated.companyName,
            website: updated.website,
            role: updated.role,
            startupStage: updated.startupStage,
            buildingContext: updated.buildingContext,
            currentChallenge: updated.currentChallenge,
            traction: updated.traction,
            teamSize: updated.teamSize,
            whyTic: updated.whyTic,
            tierInterest: updated.tierInterest,
            icpScore: updated.icpScore,
            mobileNumber: null
          }),
          sendConfirmationEmail({
            name: updated.name ?? "Applicant",
            email: updated.email,
            tier: updated.tierInterest ?? "Explorer"
          })
        ]);
      } catch (error) {
        console.error("Failed to send emails:", error);
      }

      return updated;
    }),

  sendResumeLink: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.email, input.email),
      });

      if (!application) {
        throw new Error("Application not found");
      }

      console.log(`[MOCK EMAIL] To: ${input.email} - Subject: Resume your application / Check Status`);
      console.log(`[MOCK EMAIL] Link: /application-status?token=${application.token}`);

      return { success: true, tokenSent: true };
    }),

  getByToken: publicProcedure
    .input(
      z.object({
        token: z.string().uuid().optional(),
        email: z.string().email().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      let app;
      if (input.token) {
        app = await ctx.db.query.applications.findFirst({
          where: eq(applications.token, input.token),
        });
      } else if (input.email) {
        // Technically find by email, returning standard data
        app = await ctx.db.query.applications.findFirst({
          where: eq(applications.email, input.email),
        });
      }

      if (!app) {
        throw new Error("Application not found");
      }
      return app;
    }),
});
