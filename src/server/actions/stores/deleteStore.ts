'use server';

import { servicedStore } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function deleteStore(id: string): ActionResponse<boolean> {
  const existingStore = await db.query.servicedStore.findFirst({
    where: eq(servicedStore.id, id),
  });

  if (!existingStore) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  await db.delete(servicedStore).where(eq(servicedStore.id, id)).execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
}
