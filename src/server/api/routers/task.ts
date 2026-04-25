import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const taskRouter = createTRPCRouter({
  getUserTasks: publicProcedure
    .input(z.object({ profileId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.tasks.findMany({
        where: eq(tasks.profileId, input.profileId),
        orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
      });
    }),

  createTask: publicProcedure
    .input(z.object({
      profileId: z.string().uuid(),
      title: z.string().min(1),
      description: z.string().optional(),
      category: z.string().optional(),
      status: z.string().default("todo"),
      priority: z.string().default("medium"),
    }))
    .mutation(async ({ ctx, input }) => {
      const [newTask] = await ctx.db.insert(tasks).values(input).returning();
      return newTask;
    }),

  updateTaskStatus: publicProcedure
    .input(z.object({
      taskId: z.string().uuid(),
      status: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ status: input.status })
        .where(eq(tasks.id, input.taskId));
      return { success: true };
    }),

  deleteTask: publicProcedure
    .input(z.object({
      taskId: z.string().uuid(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tasks).where(eq(tasks.id, input.taskId));
      return { success: true };
    }),
});
