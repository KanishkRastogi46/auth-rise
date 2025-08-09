import { sql } from "drizzle-orm"
import { pgTable, pgEnum, serial, timestamp } from "drizzle-orm/pg-core"


export const userRolesEnum = pgEnum('user_roles', ['admin', 'user'])

export const userRoles = pgTable('userRoles', {
    id: serial('id').primaryKey(),
    role: userRolesEnum('role').notNull().default('user').array(),
    createdAt: timestamp('created_at').notNull().default(sql`now()`),
    updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
})

export type IUserRole = typeof userRoles.$inferSelect
export type IUserRoleInsert = typeof userRoles.$inferInsert