'use server';

import { employee } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const deleteEmployee = protect(async (user, employeeId: string) => {
  try {
    if (user.id === employeeId) {
      return ServerActionError(HttpStatusCode.Conflict, ErrorCode.NotAuthorized);
    }

    // First check if employee exists
    const [existingEmployee] = await db.select().from(employee).where(eq(employee.id, employeeId)).limit(1).execute();

    if (!existingEmployee) {
      return ServerActionError(HttpStatusCode.NotFound, ErrorCode.EmployeeNotFound);
    }

    await db.delete(employee).where(eq(employee.id, employeeId)).execute();

    redirect('/employees');
  } catch (error) {
    return ServerActionError(HttpStatusCode.InternalServerError, ErrorCode.InternalServerError);
  }
});
