'use server';

import { IMalfunction, malfunction, repairedDevice } from '@/entities';
import { protect } from '@/helpers/auth/protect.action';
import { ServerActionError } from '@/helpers/errors/base.error';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { eq, sql } from 'drizzle-orm';

export async function createMalfunction({
  repairedDeviceId,
  description,
  symptoms,
  repairMethod,
  price,
}: {
  repairedDeviceId: string;
  description: string;
  symptoms: string;
  repairMethod: string;
  price: number;
}): ActionResponse<IMalfunction> {
  // Verify repaired device exists
  const existingDevice = await db.query.repairedDevice.findFirst({
    where: eq(repairedDevice.id, repairedDeviceId),
  });

  if (!existingDevice) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  const [newMalfunction] = await db
    .insert(malfunction)
    .values({
      description,
      symptoms,
      repairMethod,
      price,
    })
    .returning();

  return ServerActionResponse(HttpStatusCode.Created, newMalfunction);
}

export async function deleteMalfunction(id: string): ActionResponse<boolean> {
  // Check if malfunction exists
  const existingMalfunction = await db.query.malfunction.findFirst({
    where: eq(malfunction.id, id),
  });

  if (!existingMalfunction) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  await db.delete(malfunction).where(eq(malfunction.id, id)).execute();

  return ServerActionResponse(HttpStatusCode.Ok, true);
}

export const getMalfunctionById = protect(async (_, malfunctionId: string) => {
  const foundMalfunction = await db.query.malfunction.findFirst({
    where: (malfunction, { eq }) => eq(malfunction.id, malfunctionId),
    with: {
      repairedParts: {
        with: { malfunction: true },
      },
    },
  });

  if (!foundMalfunction) {
    return ServerActionError(HttpStatusCode.NotFound, ErrorCode.NotFound);
  }

  return ServerActionResponse(HttpStatusCode.Ok, foundMalfunction);
});

/**
 * Get malfunctions with pagination and optional search
 */
export const getMalfunctions = protect(
  async (
    _user,
    options: {
      page: number;
      take: number;
      query?: string;
      searchField?: 'description' | 'symptoms' | 'repairMethod';
      repairedDeviceId?: string;
      minPrice?: number;
      maxPrice?: number;
    } = {
      page: 0,
      take: 200,
    },
  ): ActionResponse<IMalfunction[]> => {
    const query = db
      .select()
      .from(malfunction)
      .offset(Math.max(options.page - 1, 0) * options.take)
      .limit(options.take);

    // Apply search query if provided
    if (options.query) {
      if (options.searchField === 'description') {
        query.where(sql`${malfunction.description} ILIKE ${`%${options.query}%`}`);
      } else if (options.searchField === 'symptoms') {
        query.where(sql`${malfunction.symptoms} ILIKE ${`%${options.query}%`}`);
      } else if (options.searchField === 'repairMethod') {
        query.where(sql`${malfunction.repairMethod} ILIKE ${`%${options.query}%`}`);
      } else {
        // Default search across multiple fields
        query.where(
          sql`${malfunction.description} ILIKE ${`%${options.query}%`} OR 
              ${malfunction.symptoms} ILIKE ${`%${options.query}%`} OR
              ${malfunction.repairMethod} ILIKE ${`%${options.query}%`}`,
        );
      }
    }

    // Filter by price range if provided
    if (options.minPrice !== undefined && options.maxPrice !== undefined) {
      query.where(sql`${malfunction.price} BETWEEN ${options.minPrice} AND ${options.maxPrice}`);
    } else if (options.minPrice !== undefined) {
      query.where(sql`${malfunction.price} >= ${options.minPrice}`);
    } else if (options.maxPrice !== undefined) {
      query.where(sql`${malfunction.price} <= ${options.maxPrice}`);
    }

    const foundMalfunctions = await query.execute();

    return ServerActionResponse(HttpStatusCode.Ok, foundMalfunctions);
  },
);
