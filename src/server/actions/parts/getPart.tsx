'use server';

import { part } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export const getPartInfo = protect(async (_, partId: string) => {
  const foundParts = await db.select().from(part).where(eq(part.id, partId)).limit(1).execute();

  if (!foundParts[0]) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.PartNotFound);
  }

  return ServerActionResponse(HttpStatusCode.Ok, foundParts[0]);
});
