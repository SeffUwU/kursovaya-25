'use server';

import { IServicedStore, employee, servicedStore } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function createStore({
  address,
  name,
  phone,
}: {
  name: string;
  address: string;
  phone: string;
}): ActionResponse<IServicedStore> {
  const foundStore = await db.query.servicedStore.findFirst({
    where: eq(servicedStore.phone, phone),
  });

  if (foundStore) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.PhoneTaken);
  }

  const [savedStore] = await db
    .insert(servicedStore)
    .values({
      phone,
      address,
      name,
    })
    .returning();

  return ServerActionResponse(HttpStatusCode.Created, savedStore);
}
