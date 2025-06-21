'use server';

import { IServicedStore, servicedStore } from '@/entities/servicedStore.entity';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { TokenPayload } from '@/types/jwt/token.payload.type';
import { eq, sql } from 'drizzle-orm';

/**
 * Get stores. With pagination. Self explanatory.
 */
export const getStores = protect(
  async (
    _user: TokenPayload,
    options: { page: number; take: number; query?: string; type?: 'name' | 'address' | 'phone' } = {
      page: 0,
      take: 200,
    },
    id?: string,
  ): ActionResponse<IServicedStore[]> => {
    const query = db
      .select()
      .from(servicedStore)
      .offset(Math.max(options.page - 1, 0) * options.take)
      .limit(options.take);

    if (id) {
      query.where(eq(servicedStore.id, id));
    }

    if (options.query && options.type) {
      query.where(sql`${servicedStore[options.type]} ILIKE ${`%${options.query}%`}`);
    }

    const foundStores = await query.execute();

    return ServerActionResponse(HttpStatusCode.Ok, foundStores);
  },
);
