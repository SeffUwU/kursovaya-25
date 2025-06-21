'use server';

import { order } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function updateOrder({
  id,
  customerFio,
  serial,
  malfunctionId,
  servicedStoreId,
  price,
  guaranteeNote,
  returnDate,
}: {
  id: string;
  customerFio: string;
  serial: string;
  malfunctionId: string;
  servicedStoreId: string;
  price: number;
  guaranteeNote?: string;
  returnDate?: Date;
}): ActionResponse<boolean> {
  // Проверяем существует ли заказ
  const existingOrder = await db.query.order.findFirst({
    where: eq(order.id, id),
  });

  if (!existingOrder) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }
  console.log(price);
  // Обновляем заказ
  await db
    .update(order)
    .set({
      customerFio,
      serial,
      malfunctionId,
      servicedStoreId,
      price,
      guaranteeNote,
      returnDate,
      updatedAt: new Date(),
    })
    .where(eq(order.id, id))
    .execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
}
