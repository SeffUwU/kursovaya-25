import { schema } from '@/entities/schema';
import { relations, sql } from 'drizzle-orm';
import { index, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { malfunction } from './malfunction.entity';
import { servicedStore } from './servicedStore.entity';

export const order = schema.table(
  'orders',
  {
    id: uuid().defaultRandom().primaryKey(),
    orderDate: timestamp('orderDate').notNull(),
    returnDate: timestamp('returnDate'),
    customerFio: varchar().notNull(),
    serial: varchar().notNull(),
    malfunctionId: uuid()
      .references(() => malfunction.id, { onDelete: 'cascade' })
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
  malfunction: one(malfunction, { fields: [order.malfunctionId], references: [malfunction.id] }),
  servicedStore: one(servicedStore, { fields: [order.servicedStoreId], references: [servicedStore.id] }),
}));

export type IOrder = typeof order.$inferSelect;
