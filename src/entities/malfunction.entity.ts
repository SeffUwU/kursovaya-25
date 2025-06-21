import { schema } from '@/entities/schema';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const malfunction = schema.table(
  'malfunctions',
  {
    id: uuid().defaultRandom().primaryKey(),
    description: varchar().notNull(),
    symptoms: varchar().notNull(),
    repairMethod: varchar().notNull(),
    price: integer().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('malfunction_id_pkey').on(t.id)],
);

export type IMalfunction = typeof malfunction.$inferSelect;
