'use server';

import { IPart, IPosition, part, position } from '@/entities';
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
 * Get parts. With pagination. Self explanatory.
 */
export const getParts = protect(
  async (
    _user: TokenPayload,
    options: { page: number; take: number; query?: string; type?: 'name' | 'varchar' } = {
      page: 0,
      take: 200,
    },
  ): ActionResponse<IPart[]> => {
    const query = db
      .select()
      .from(part)
      .offset(Math.max(options.page - 1, 0) * options.take)
      .limit(options.take);

    if (options.query) {
      if (options.type === 'name') {
        query.where(sql`${part.name} ILIKE ${`%${options.query}%`}`);
      } else {
        query.where(sql`${part.varchar} ILIKE ${`%${options.query}%`}`);
      }
    }
    const foundParts = await query.execute();

    return ServerActionResponse(HttpStatusCode.Ok, foundParts);
  },
);
