import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { applications } from "~/server/db/schema";
import { sendApplicationEmail, sendConfirmationEmail } from "~/server/mail";

export const applicationRouter = createTRPCRouter({
    submit: publicProcedure
        .input(
            z.object({
                name: z.string().min(2, "Name is required"),
                email: z.string().email("Invalid email format"),
                mobileNumber: z.string().min(5, "Mobile number is required"),
                startupName: z.string().min(2, "Startup name is required"),
                website: z.string().url().optional().or(z.literal("")),
                pitchDeck: z.string().url().optional().or(z.literal("")),
                overview: z.string().min(10, "Overview is required"),
                founderStage: z.enum([
                    "Idea stage",
                    "MVP built",
                    "Early users",
                    "Revenue generating",
                    "Scaling"
                ]),
                primaryGoal: z.enum([
                    "Product strategy",
                    "Growth help",
                    "Fundraising",
                    "Network access",
                    "Accountability / execution support"
                ]),
                monthlyRevenue: z.enum([
                    "No revenue yet",
                    "Under ₹50k",
                    "₹50k – ₹5L",
                    "₹5L+"
                ]).optional(),
                tier: z.enum(["Explorer", "Visionary", "Trailblazer"]),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const result = await ctx.db.insert(applications).values({
                name: input.name,
                email: input.email,
                mobileNumber: input.mobileNumber,
                startupName: input.startupName,
                website: input.website,
                pitchDeck: input.pitchDeck,
                overview: input.overview,
                founderStage: input.founderStage,
                primaryGoal: input.primaryGoal,
                monthlyRevenue: input.monthlyRevenue,
                tier: input.tier,
                status: "pending",
            });

            try {
                await Promise.all([
                    sendApplicationEmail({
                        ...input,
                    }),
                    sendConfirmationEmail({
                        name: input.name,
                        email: input.email,
                        tier: input.tier,
                    }),
                ]);
            } catch (error) {
                console.error("Failed to send emails:", error);
                // We still return success since the DB insert worked
            }

            return result;
        }),
});
