import { schema } from '@/entities/schema';
import { relations } from 'drizzle-orm';
import { index, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { position } from './position.entity';

export const employee = schema.table(
  'employee',
  {
    id: uuid().defaultRandom().primaryKey(),
    fio: varchar().notNull(),
    dob: timestamp('dob'),
    address: varchar().notNull(),
    phone: varchar().notNull(),
    passport: varchar().notNull(),
    passwordHash: varchar().notNull(), // Новое поле, используемое для авторизации
    positionId: uuid()
      .references(() => position.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [index('employee_id_pkey').on(t.id)],
);

export const employeeRelations = relations(employee, ({ one }) => ({
  position: one(position, { fields: [employee.positionId], references: [position.id] }),
}));

export type IEmployee = typeof employee.$inferSelect;
