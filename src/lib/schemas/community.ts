import z from 'zod'

export const createCommunitySchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
})
