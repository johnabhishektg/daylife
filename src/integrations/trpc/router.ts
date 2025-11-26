import db from '@/data/db'
import { eq } from 'drizzle-orm'
import { community } from '@/data/schema'
import { createCommunitySchema } from '@/lib/schemas/community'
import { TRPCRouterRecord } from '@trpc/server'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { createTRPCRouter, publicProcedure } from './init'
import z from 'zod'

const communityRouter = {
  getbyId: publicProcedure
    .input(z.object({ id: z.string() })) // id from URL or body
    .query(async ({ input }) => {
      const [row] = await db
        .select()
        .from(community)
        .where(eq(community.slug, input.id))
      return row ?? null // null if not found
    }),
  get: publicProcedure.query(async () => {
    const rows = await db.select().from(community)
    return rows
  }),
  create: publicProcedure
    .input(createCommunitySchema)
    .mutation(async ({ input, ctx }) => {
      const session = ctx.session
      if (!session?.user?.id) throw new Error('Unauthorized')

      const newCommunity = await db
        .insert(community)
        .values({
          id: nanoid(),
          name: input.name,
          slug: slugify(input.name, { lower: true, strict: true }),
          description: input.description,
          coverImageUrl: input.coverImageUrl,
          ownerId: session?.user.id,
        })
        .returning()

      return newCommunity[0]
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  community: communityRouter,
})
export type TRPCRouter = typeof trpcRouter
