import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  events, insights, deliverables, opportunities, recommendations,
  networkGraph, milestones, profiles
} from "~/server/db/schema";
import { eq, desc, and, isNull, or } from "drizzle-orm";

export const ecosystemRouter = createTRPCRouter({

  // ─── EVENTS (admin-created, all users see them filtered by access level) ───
  getEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.events.findMany({
      orderBy: [desc(events.date)],
    });
  }),

  // ─── INSIGHTS (admin-created, tier-gated) ────────────────────────────────
  getInsights: publicProcedure
    .input(z.object({ tier: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.insights.findMany({
        orderBy: [desc(insights.createdAt)],
      });
    }),

  // ─── DELIVERABLES / PERKS (admin-pushed per user) ────────────────────────
  getDeliverables: publicProcedure
    .input(z.object({ profileId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.deliverables.findMany({
        where: eq(deliverables.profileId, input.profileId),
        orderBy: [desc(deliverables.updatedAt)],
      });
    }),

  // ─── OPPORTUNITIES (admin-created global list) ────────────────────────────
  getOpportunities: publicProcedure
    .input(z.object({ tier: z.string() }))
    .query(async ({ ctx, input }) => {
      // Return active opportunities; client filters by eligibility
      return ctx.db.query.opportunities.findMany({
        where: eq(opportunities.status, "active"),
        orderBy: [desc(opportunities.createdAt)],
      });
    }),

  // ─── RECOMMENDATIONS (admin-pushed per user) ──────────────────────────────
  getRecommendations: publicProcedure
    .input(z.object({ profileId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.recommendations.findMany({
        where: and(
          eq(recommendations.profileId, input.profileId),
          eq(recommendations.dismissed, false)
        ),
        orderBy: [desc(recommendations.relevanceScore)],
      });
    }),

  dismissRecommendation: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(recommendations)
        .set({ dismissed: true })
        .where(eq(recommendations.id, input.id));
      return { success: true };
    }),

  // ─── MILESTONES ───────────────────────────────────────────────────────────
  getMilestones: publicProcedure
    .input(z.object({ profileId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.milestones.findMany({
        where: eq(milestones.profileId, input.profileId),
        orderBy: [desc(milestones.createdAt)],
      });
    }),

  completeMilestone: publicProcedure
    .input(z.object({ profileId: z.string().uuid(), key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(milestones)
        .set({ completedAt: new Date() })
        .where(
          and(
            eq(milestones.profileId, input.profileId),
            eq(milestones.key, input.key)
          )
        );
      return { success: true };
    }),

  // ─── SEED on first load (milestones only; all other content from admin) ───
  seedInitialData: publicProcedure
    .input(z.object({ profileId: z.string().uuid(), tier: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Only seed milestones if none exist for this user
      const existing = await ctx.db.query.milestones.findFirst({
        where: eq(milestones.profileId, input.profileId),
      });
      if (existing) return { success: true, seeded: false };

      const MILESTONE_DEFAULTS = [
        { key: "problem_validated", label: "Problem Validated" },
        { key: "icp_defined",       label: "ICP Defined" },
        { key: "mvp_built",         label: "MVP Built" },
        { key: "first_revenue",     label: "First Revenue" },
      ];

      await ctx.db.insert(milestones).values(
        MILESTONE_DEFAULTS.map((m) => ({
          profileId: input.profileId,
          key: m.key,
          label: m.label,
          completedAt: null,
        }))
      );

      return { success: true, seeded: true };
    }),
});
