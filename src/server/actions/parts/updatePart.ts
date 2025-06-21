'use server';

import { IPart, part } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { and, eq, not } from 'drizzle-orm';

export async function updatePart(
  id: string,
  { name, varchar, price }: { name: string; varchar: string; price: number },
): ActionResponse<IPart> {
  // Check if part exists
  const existingPart = await db.query.part.findFirst({
    where: eq(part.id, id),
  });

  if (!existingPart) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  // Check for name conflict with other parts
  if (name !== existingPart.name) {
    const nameConflict = await db.query.part.findFirst({
      where: and(eq(part.name, name), not(eq(part.id, id))),
    });

    if (nameConflict) {
      return ServerActionError(HttpStatusCode.Conflict, ErrorCode.AlreadyExists);
    }
  }

  const [updatedPart] = await db
    .update(part)
    .set({
      name,
      varchar,
      price,
      updatedAt: new Date(),
    })
    .where(eq(part.id, id))
    .returning();

  return ServerActionResponse(HttpStatusCode.Ok, updatedPart);
}
