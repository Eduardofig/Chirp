import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

function filterUserForClient(user: User) {
    return {
        id: user.id,
        username: user.username || "[No username]",
        profileImageUrl: user.profileImageUrl,
    }
}

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
        })

        const users = (await clerkClient.users.getUserList({
            userId: posts.map((post) => post.authorId),
            limit: 100,
        }))
        .map(filterUserForClient)

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId)

            if(!author) {
                throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Author for post not found"})
            }

            return {
                post,
                author,
            }
        })

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
