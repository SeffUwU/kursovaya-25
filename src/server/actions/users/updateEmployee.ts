'use server';

import { employee, IEmployee } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { db } from '@/server/database';
import { WithoutGenerated } from '@/types/utils/utils.types';
import { eq } from 'drizzle-orm';

export const updateEmployeeInfo = protect(
  async (_, employeeId: string, partial: Partial<WithoutGenerated<IEmployee>>) => {
    await db.update(employee).set(partial).where(eq(employee.id, employeeId)).execute();

    return ServerActionResponse(HttpStatusCode.Ok, true);
  },
);
