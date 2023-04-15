import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany()
    }),
    sendTweet: publicProcedure
    .input(z.object({ 
        content: z.string(),
        authorId: z.string(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.post.create({
            data: {
                ...input
            }
        })
    }),
});
