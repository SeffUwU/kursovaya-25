import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { repairedDevice } from './repairedDevice.entity';
import { repairedParts } from './repairedParts.entity';

export const malfunction = schema.table(
  'malfunctions',
  {
    id: uuid().defaultRandom().primaryKey(),
    repairedDeviceId: uuid()
      .references(() => repairedDevice.id, { onDelete: 'cascade' })
      .notNull(),
    description: varchar().notNull(),
    symptoms: varchar().notNull(),
    repairMethod: varchar().notNull(),
    price: integer().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('invoice_id_pkey').on(t.id)],
);

export const malfunctionRelations = relations(malfunction, ({ many }) => ({
  repairedParts: many(repairedParts),
}));

export type IMalfunction = typeof malfunction.$inferSelect;
