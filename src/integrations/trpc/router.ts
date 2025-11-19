import db from '@/data/db'
import { community } from '@/data/schema'
import { TRPCRouterRecord } from '@trpc/server'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from './init'

export const createCommunitySchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
})

const communityRouter = {
  create: publicProcedure
    .input(createCommunitySchema)
    .mutation(async ({ input }) => {
      // if (!session?.user?.id) {
      //   throw new Error('Unauthorized')
      // }

      const newCommunity = await db
        .insert(community)
        .values({
          id: nanoid(),
          name: input.name,
          slug: slugify(input.name, { lower: true, strict: true }),
          description: input.description,
          coverImageUrl: input.coverImageUrl,
          ownerId: '7qEjEBIJbdBlzxUaEwfKGKOAXUGdigTX',
        })
        .returning()

      return newCommunity[0]
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  community: communityRouter,
})
export type TRPCRouter = typeof trpcRouter
