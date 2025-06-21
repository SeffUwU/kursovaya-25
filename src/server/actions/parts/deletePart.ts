'use server';

import { part } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function deletePart(id: string): ActionResponse<boolean> {
  // Check if part exists
  const existingPart = await db.query.part.findFirst({
    where: eq(part.id, id),
  });

  if (!existingPart) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  await db.delete(part).where(eq(part.id, id)).execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
}
