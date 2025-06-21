'use server';

import { IOrder, order, servicedStore } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { TokenPayload } from '@/types/jwt/token.payload.type';
import { eq, sql } from 'drizzle-orm';

/**
 * Get orders with pagination and optional search
 */
export const getOrders = protect(
  async (
    _user: TokenPayload,
    options: {
      page: number;
      take: number;
      query?: string;
      searchField?: 'customerFio' | 'serial' | 'guaranteeNote';
      servicedStoreId?: string;
      dateFrom?: Date;
      dateTo?: Date;
    } = {
      page: 0,
      take: 200,
    },
  ) => {
    const query = db
      .select()
      .from(order)
      .offset(Math.max(options.page - 1, 0) * options.take)
      .leftJoin(servicedStore, eq(order.servicedStoreId, servicedStore.id))
      .limit(options.take);

    const foundOrders = await query.execute();

    return ServerActionResponse(HttpStatusCode.Ok, foundOrders);
  },
);
