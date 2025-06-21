import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, integer, uuid } from 'drizzle-orm/pg-core';
import { malfunction } from './malfunction.entity';
import { part } from './parts.entity';

export const repairedParts = schema.table(
  'repaired_parts',
  {
    id: uuid().defaultRandom().primaryKey(),
    partId: uuid()
      .references(() => part.id, { onDelete: 'cascade' })
      .notNull(),
    malfunctionId: uuid()
      .references(() => malfunction.id, { onDelete: 'cascade' })
      .notNull(),
    amount: integer().default(1),
  },
  (t) => [index('repaired_parts_id_pkey').on(t.id)],
);

export const repairedPartsRelations = relations(repairedParts, ({ one }) => ({
  part: one(part, { fields: [repairedParts.partId], references: [part.id] }),
}));

export type IRepairedPart = typeof repairedParts.$inferSelect;
