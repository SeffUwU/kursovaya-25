'use server';

import { IOrder, malfunction, order, part, repairedParts, servicedStore } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { desc, eq } from 'drizzle-orm';

export const getOrders = protect(async () => {
  const orders = await db.query.order.findMany({
    with: {
      malfunction: true,
      servicedStore: true,
    },
    orderBy: [desc(order.createdAt)],
  });

  return ServerActionResponse(HttpStatusCode.Ok, orders);
});

export const getOrderById = protect(async (_, orderId: string) => {
  const foundOrder = await db
    .select()
    .from(order)
    .leftJoin(servicedStore, eq(servicedStore.id, order.servicedStoreId))
    .leftJoin(malfunction, eq(malfunction.id, order.malfunctionId))
    .leftJoin(repairedParts, eq(repairedParts.id, malfunction.id))
    .leftJoin(part, eq(part.id, repairedParts.id))
    .where(eq(order.id, orderId))
    .limit(1);

  if (!foundOrder[0]) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }
  return ServerActionResponse(HttpStatusCode.Ok, foundOrder);
});
