import { applicationRouter } from "~/server/api/routers/application";
import { profileRouter } from "~/server/api/routers/profile";
import { taskRouter } from "~/server/api/routers/task";
import { ecosystemRouter } from "~/server/api/routers/ecosystem";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  application: applicationRouter,
  profile: profileRouter,
  task: taskRouter,
  ecosystem: ecosystemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
