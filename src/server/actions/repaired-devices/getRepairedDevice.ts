'use server';

import { IRepairedDevice, repairedDevice } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export const getRepairedDeviceById = protect(async (_, deviceId: string) => {
  const [foundDevice] = await db
    .select()
    .from(repairedDevice)
    .where(eq(repairedDevice.id, deviceId))
    .limit(1)
    .execute();

  if (!foundDevice) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  return ServerActionResponse(HttpStatusCode.Ok, foundDevice);
});
