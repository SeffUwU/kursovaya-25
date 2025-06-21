import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const servicedStore = schema.table(
  'serviced_stores',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    address: varchar().notNull(),
    phone: varchar().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('serviced_store_id_pkey').on(t.id)],
);

export const servicedStoreRelations = relations(servicedStore, ({ one }) => ({}));

export type IServicedStore = typeof servicedStore.$inferSelect;
