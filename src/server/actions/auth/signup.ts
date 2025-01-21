'use server';

import { CookieConstants } from '@/constants/cookie.constants';
import { IEmployee, employee } from '@/entities';
import { ServerActionError } from '@/helpers/errors/base.error';
import { JwtHelper } from '@/helpers/jwt/jwt.helper';
import { HttpStatusCode } from '@/helpers/responses/response.status';
import { ActionResponse } from '@/helpers/responses/response.type';
import { db } from '@/server/database';
import { ErrorCode } from '@/types/enums/error-code.enum';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup({
  login: phone,
  fio,
  address,
  password,
  passport,
  positionId,
}: {
  login: string;
  fio: string;
  address: string;
  password: string;
  passport: string;
  positionId: string;
}): ActionResponse<Omit<IEmployee, 'passwordHash'>> {
  const foundUser = await db.query.employee.findFirst({
    where: eq(employee.phone, phone),
  });

  if (foundUser) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.PhoneTaken);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [{ passwordHash, ...savedUser }] = await db
    .insert(employee)
    .values({
      fio,
      phone,
      address,
      passport,
      positionId,
      passwordHash: hashedPassword,
    })
    .returning();
  const userCookies = await cookies();
  const token = await JwtHelper.sign(savedUser);

  userCookies.set(CookieConstants.JwtKey, token, CookieConstants.JwtOptions());

  redirect('/');

  // return ServerActionResponse(HttpStatusCode.Created, savedUser);
}
