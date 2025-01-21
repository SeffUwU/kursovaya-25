import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const repairedDevice = schema.table(
  'repaired_devices',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    type: varchar().notNull().unique(),
    manufacturer: varchar().notNull(),
    characteristics: varchar().notNull(),
    details: varchar().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('repaired_device_id_pkey').on(t.id)],
);

export const repairedDeviceRelations = relations(repairedDevice, ({ one: many }) => ({}));

export type IRepairedDevice = typeof repairedDevice.$inferSelect;
