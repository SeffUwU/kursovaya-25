'use server';

import { IOrder, malfunction, order, servicedStore } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export const createOrder = protect(
  async (
    user,
    {
      customerFio,
      serial,
      malfunctionId,
      servicedStoreId,
      guaranteeNote,
      price,
    }: {
      customerFio: string;
      serial: string;
      malfunctionId: string;
      servicedStoreId: string;
      guaranteeNote?: string;
      price: number;
    },
  ): ActionResponse<IOrder> => {
    const existingMalfunction = await db.query.malfunction.findFirst({
      where: eq(malfunction.id, malfunctionId),
    });

    if (!existingMalfunction) {
      return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
    }

    const existingStore = await db.query.servicedStore.findFirst({
      where: eq(servicedStore.id, servicedStoreId),
    });

    if (!existingStore) {
      return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
    }

    const [newOrder] = await db
      .insert(order)
      .values({
        customerFio,
        serial,
        malfunctionId,
        servicedStoreId,
        guaranteeNote,
        price,
        orderDate: new Date(),
        employeeId: user.id,
      })
      .returning();

    return ServerActionResponse(HttpStatusCode.Created, newOrder);
  },
);
