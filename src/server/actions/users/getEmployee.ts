'use server';

import { employee, position } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';

export const getEmployeeInfo = protect(async (_, employeeId: string) => {
  const foundEmployee = await db
    .select()
    .from(employee)
    .leftJoin(position, eq(position.id, employee.positionId))
    .where(eq(employee.id, employeeId))
    .limit(1)
    .execute();

  if (!foundEmployee[0]) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.EmployeeNotFound);
  }

  return ServerActionResponse(HttpStatusCode.Ok, foundEmployee[0]);
});
