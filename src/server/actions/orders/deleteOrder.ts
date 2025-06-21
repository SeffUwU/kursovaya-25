'use server';

import { order } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function deleteOrder(id: string): ActionResponse<boolean> {
  // Check if order exists
  const existingOrder = await db.query.order.findFirst({
    where: eq(order.id, id),
  });

  if (!existingOrder) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  await db.delete(order).where(eq(order.id, id)).execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
}
