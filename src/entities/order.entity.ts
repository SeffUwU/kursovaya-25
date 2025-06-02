import { schema } from '@/entities/schema';
import { relations, sql } from 'drizzle-orm';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { invoice } from './invoice.entity';
import { servicedStore } from './servicedStore.entity';

export const order = schema.table(
  'orders',
  {
    id: uuid().defaultRandom().primaryKey(),
    orderDate: timestamp('created_at').notNull(),
    returnDate: timestamp('created_at'),
    customerFio: varchar().notNull(),
    serial: varchar().notNull(),
    malfunctionId: uuid()
      .references(() => invoice.id, { onDelete: 'cascade' })
      .notNull(),
    servicedStoreId: uuid()
      .references(() => servicedStore.id, { onDelete: 'cascade' })
      .notNull(),
    guaranteeNote: varchar(),
    guaranteeEndDate: timestamp('guarantee_end_date').$defaultFn(() => sql`CURRENT_TIMESTAMP + INTERVAL '14 days'`),
    price: integer().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('order_id_pkey').on(t.id)],
);

export const orderRelations = relations(order, ({ one }) => ({
  malfunction: one(invoice, { fields: [order.malfunctionId], references: [invoice.id] }),
  servicedStore: one(servicedStore, { fields: [order.servicedStoreId], references: [servicedStore.id] }),
}));

export type IOrder = typeof order.$inferSelect;
