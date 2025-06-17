'use server';

import { IRepairedDevice, repairedDevice } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function createRepairedDevice({
  characteristics,
  details,
  manufacturer,
  name,
  type,
}: {
  name: string;
  type: string;
  manufacturer: string;
  characteristics: string;
  details: string;
}): ActionResponse<IRepairedDevice> {
  const foundDevice = await db.query.repairedDevice.findFirst({
    where: eq(repairedDevice.name, name),
  });

  if (foundDevice) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.AlreadyExists);
  }

  const [savedPart] = await db
    .insert(repairedDevice)
    .values({
      characteristics,
      details,
      manufacturer,
      name,
      type,
    })
    .returning();

  return ServerActionResponse(HttpStatusCode.Created, savedPart);
}
