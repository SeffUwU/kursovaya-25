import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { employee } from './employee.entity';

export const position = schema.table(
  'positions',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    salary: integer().notNull(),
    responsibilities: varchar().notNull(),
    requirements: varchar().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('position_id_pkey').on(t.id)],
);

export const positionRelations = relations(position, ({ many }) => ({
  employees: many(employee),
}));

export type IPosition = typeof position.$inferSelect;
