import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { repairedParts } from './repairedParts.entity';

export const part = schema.table(
  'orders',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    varchar: varchar().notNull(),
    price: integer().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('parts_id_pkey').on(t.id)],
);

export const partRelations = relations(part, ({ many }) => ({
  repairedParts: many(repairedParts),
}));

export type IPart = typeof part.$inferSelect;
