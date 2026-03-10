import { pgTable, serial, timestamp, text, integer, boolean, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 题目表
export const puzzles = pgTable("puzzles", {
	id: serial().primaryKey().notNull(),
	creatorClass: varchar("creator_class", { length: 100 }).notNull(),
	creatorName: varchar("creator_name", { length: 100 }).notNull(),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

// 答题表
export const answers = pgTable("answers", {
	id: serial().primaryKey().notNull(),
	puzzleId: integer("puzzle_id").notNull().references(() => puzzles.id),
	answererClass: varchar("answerer_class", { length: 100 }).notNull(),
	answererName: varchar("answerer_name", { length: 100 }).notNull(),
	submittedAnswer: text("submitted_answer").notNull(),
	isCorrect: boolean("is_correct").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});
