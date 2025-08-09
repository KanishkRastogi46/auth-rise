import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { userRoles } from "./user-role.schema";


export const users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    email: text('email').notNull().unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    password: text('password').notNull(),
    roleId: integer('role_id').references(() => userRoles.id),
    lastLogin: timestamp('last_login'),
    createdAt: timestamp('created_at').notNull().default(sql`now()`),
    updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
})

export type IUser = typeof users.$inferSelect
export type IUserInsert = typeof users.$inferInsert

export const userRelations = relations(users, ({ one }) => ({
    role: one(userRoles, {
        fields: [users.roleId],
        references: [userRoles.id],
    })
}))