'use server';

import { IServicedStore, servicedStore } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { and, eq, not } from 'drizzle-orm';

export async function updateStore(
  id: string,
  { name, address, phone }: { name: string; address: string; phone: string },
): ActionResponse<IServicedStore> {
  // Check if store exists
  const existingStore = await db.query.servicedStore.findFirst({
    where: eq(servicedStore.id, id),
  });

  if (!existingStore) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  // Check for phone conflict with other stores
  if (phone !== existingStore.phone) {
    const phoneConflict = await db.query.servicedStore.findFirst({
      where: and(eq(servicedStore.phone, phone), not(eq(servicedStore.id, id))),
    });

    if (phoneConflict) {
      return ServerActionError(HttpStatusCode.Conflict, ErrorCode.PhoneTaken);
    }
  }

  const [updatedStore] = await db
    .update(servicedStore)
    .set({
      name,
      address,
      phone,
      updatedAt: new Date(),
    })
    .where(eq(servicedStore.id, id))
    .returning();

  return ServerActionResponse(HttpStatusCode.Ok, updatedStore);
}
