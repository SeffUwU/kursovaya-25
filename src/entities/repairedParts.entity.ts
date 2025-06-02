import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, integer, uuid } from 'drizzle-orm/pg-core';
import { invoice } from './invoice.entity';
import { part } from './parts.entity';

export const repairedParts = schema.table(
  'orders',
  {
    id: uuid().defaultRandom().primaryKey(),
    partId: uuid()
      .references(() => part.id, { onDelete: 'cascade' })
      .notNull(),
    malfunctionId: uuid()
      .references(() => invoice.id, { onDelete: 'cascade' })
      .notNull(),
    amount: integer().default(1),
  },
  (t) => [index('repaired_parts_id_pkey').on(t.id)],
);

export const repairedPartsRelations = relations(repairedParts, ({ one }) => ({
  part: one(part, { fields: [repairedParts.partId], references: [part.id] }),
  invoice: one(invoice, { fields: [repairedParts.malfunctionId], references: [invoice.id] }),
}));

export type IRepairedPart = typeof repairedParts.$inferSelect;
