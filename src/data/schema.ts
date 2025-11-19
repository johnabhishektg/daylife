import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const community = pgTable('community', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const memberRoleEnum = pgEnum('member_role', [
  'admin',
  'moderator',
  'member',
])

export const communityMember = pgTable('community_member', {
  id: text('id').primaryKey(),
  communityId: text('community_id')
    .notNull()
    .references(() => community.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: memberRoleEnum('role').default('member').notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
})

export const cityEnum = pgEnum('city', ['bengaluru', 'mumbai'])

// 2.  updated event table  ------------------------------------------
export const event = pgTable('event', {
  id: text('id').primaryKey(),
  communityId: text('community_id')
    .notNull()
    .references(() => community.id, { onDelete: 'cascade' }),
  creatorId: text('creator_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  type: text('type').notNull(),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  priceCents: integer('price_cents').default(0).notNull(),
  currency: text('currency').default('inr').notNull(), // ← INR only
  capacity: integer('capacity').notNull(),
  minCapacity: integer('min_capacity').default(1).notNull(),
  venueName: text('venue_name').notNull(),
  addressRaw: text('address_raw').notNull(),
  city: cityEnum('city').notNull(), // ← enum
  timezone: text('timezone').notNull(),
  startAt: timestamp('start_at', { withTimezone: true }).notNull(),
  endAt: timestamp('end_at', { withTimezone: true }).notNull(),
  status: text('status', {
    enum: ['draft', 'published', 'cancelled', 'completed'],
  })
    .default('draft')
    .notNull(),
  // lat,lng,checkInCode  removed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const communityRelations = relations(community, ({ one, many }) => ({
  owner: one(user, { fields: [community.ownerId], references: [user.id] }),
  members: many(communityMember),
  events: many(event),
}))

export const communityMemberRelations = relations(
  communityMember,
  ({ one }) => ({
    community: one(community, {
      fields: [communityMember.communityId],
      references: [community.id],
    }),
    user: one(user, {
      fields: [communityMember.userId],
      references: [user.id],
    }),
  }),
)

export const eventRelations = relations(event, ({ one }) => ({
  community: one(community, {
    fields: [event.communityId],
    references: [community.id],
  }),
  creator: one(user, { fields: [event.creatorId], references: [user.id] }),
}))

export const schema = {
  user,
  account,
  session,
  verification,
}
