'use server';

import { repairedDevice } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export const deleteRepairedDevice = protect(async (_, deviceId: string) => {
  const [existingDevice] = await db
    .select()
    .from(repairedDevice)
    .where(eq(repairedDevice.id, deviceId))
    .limit(1)
    .execute();

  if (!existingDevice) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  await db.delete(repairedDevice).where(eq(repairedDevice.id, deviceId)).execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
});
