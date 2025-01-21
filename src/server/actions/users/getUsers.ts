'use server';

import { IEmployee } from '@/entities/employee.entity';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { omitFields } from '@/helpers/transform/omit';
import { db } from '@/server/database';
import { TokenPayload } from '@/types/jwt/token.payload.type';

/**
 * Get users. With pagination. Self explanatory.
 */
export const getEmployees = protect(
  async (_user: TokenPayload, page?: number, take?: number): ActionResponse<Omit<IEmployee, 'passwordHash'>[]> => {
    const foundUsers = (
      await db.query.employee.findMany(
        page && take
          ? {
              offset: Math.max(page - 1, 0) * take,
              limit: take,
            }
          : undefined,
      )
    ).map((v) => omitFields(v, ['passwordHash']));

    return ServerActionResponse(HttpStatusCode.Ok, foundUsers);
  },
);
