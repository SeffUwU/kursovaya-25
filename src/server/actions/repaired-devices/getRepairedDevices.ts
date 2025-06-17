'use server';

import { IRepairedDevice, repairedDevice } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { TokenPayload } from '@/types/jwt/token.payload.type';
import { sql } from 'drizzle-orm';

/**
 * Get repaired-devices. With pagination. Self explanatory.
 */
export const getRepairedDevice = protect(
  async (
    _user: TokenPayload,
    options: {
      page: number;
      take: number;
      query?: string;
      type?: 'name' | 'type' | 'manufacturer' | 'characteristics' | 'details';
    } = {
      page: 0,
      take: 200,
    },
  ): ActionResponse<IRepairedDevice[]> => {
    const query = db
      .select()
      .from(repairedDevice)
      .offset(Math.max(options.page - 1, 0) * options.take)
      .limit(options.take);

    if (options.query && options.type) {
      query.where(sql`${repairedDevice[options.type]} ILIKE ${`%${options.query}%`}`);
    }

    const foundDevices = await query.execute();

    return ServerActionResponse(HttpStatusCode.Ok, foundDevices);
  },
);
