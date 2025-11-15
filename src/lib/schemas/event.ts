// src/lib/schemas/event.ts
import { z } from 'zod'

/* 1.  same enums as DB  ----------------------------------------- */
export const cityEnum = z.enum(['bengaluru', 'mumbai'])
export const statusEnum = z.enum([
  'draft',
  'published',
  'cancelled',
  'completed',
])

/* 2.  client schema  ------------------------------------------- */
export const createEventSchema = z
  .object({
    /* required strings */
    title: z.string().min(3).max(120),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
    type: z.string().min(2),
    venueName: z.string().min(2),
    addressRaw: z.string().min(5),

    /* optional strings */
    description: z.string().optional(),
    coverImageUrl: z.string().url().optional(),

    /* enums */
    city: cityEnum,
    status: statusEnum.default('draft'),

    /* locked / defaulted */
    currency: z.literal('inr').default('inr'),
    timezone: z.string().default('Asia/Kolkata'),

    /* numbers */
    priceCents: z.coerce.number().int().min(0).default(0),
    capacity: z.coerce.number().int().min(1),
    minCapacity: z.coerce.number().int().min(1).default(1),

    /* timestamps (with timezone) */
    startAt: z.coerce.date(), // accepts Date, ISO-string, or timestamp-string
    endAt: z.coerce.date(),
  })
  /* simple end-after-start guard */
  .refine((data) => data.endAt > data.startAt, {
    message: 'End must be after start',
    path: ['endAt'],
  })

/* 3.  TS type  -------------------------------------------------- */
export type CreateEventInput = z.infer<typeof createEventSchema>
