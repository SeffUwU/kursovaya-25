'use server';

import { IPosition, position } from '@/entities';
import { employee, IEmployee } from '@/entities/employee.entity';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { omitFields } from '@/helpers/transform/omit';
import { db } from '@/server/database';
import { TokenPayload } from '@/types/jwt/token.payload.type';
import { eq, sql } from 'drizzle-orm';

/**
 * Get users. With pagination. Self explanatory.
 */
export const getEmployees = protect(
  async (
    _user: TokenPayload,
    options: { page: number; take: number; query?: string; type?: 'fio' | 'position' | 'phone' } = {
      page: 0,
      take: 200,
    },
  ): ActionResponse<(Omit<IEmployee, 'passwordHash'> & { position: IPosition })[]> => {
    const query = db
      .select()
      .from(employee)
      .leftJoin(position, eq(position.id, employee.positionId))
      .offset(Math.max(options.page - 1, 0) * options.take)
      .limit(options.take);

    if (options.query) {
      if (options.type === 'position') {
        query.where(sql`${position.name} ILIKE ${`%${options.query}%`}`);
      } else {
        query.where(sql`${employee[options.type!]} ILIKE ${`%${options.query}%`}`);
      }
    }

    const foundUsers = (await query.execute()).map((v) => ({
      ...omitFields(v.employees, ['passwordHash']),
      position: v.positions!,
    }));

    return ServerActionResponse(HttpStatusCode.Ok, foundUsers);
  },
);
