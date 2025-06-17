'use server';

import { IPart, part } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export async function createPart({
  name,
  varchar,
  price,
}: {
  name: string;
  varchar: string;
  price: number;
}): ActionResponse<IPart> {
  const foundStore = await db.query.part.findFirst({
    where: eq(part.name, name),
  });

  if (foundStore) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.PhoneTaken);
  }

  const [savedPart] = await db
    .insert(part)
    .values({
      name,
      varchar,
      price,
    })
    .returning();

  return ServerActionResponse(HttpStatusCode.Created, savedPart);
}
