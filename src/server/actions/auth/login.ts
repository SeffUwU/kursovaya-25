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
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async ({
  login: phone,
  password,
}: {
  login: string;
  password: string;
}): Promise<ActionResponse<Omit<IEmployee, 'passwordHash'>>> => {
  const foundUser = await db.query.employee.findFirst({
    where: and(eq(employee.phone, phone)),
  });

  if (!foundUser) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.EmployeeNotFound);
  }

  const passwordMatched = await bcrypt.compare(password, foundUser.passwordHash);

  if (!passwordMatched) {
    return ServerActionError(HttpStatusCode.Conflict, ErrorCode.EmployeeNotFound);
  }

  const { passwordHash, ...savedUser } = foundUser;
  const userCookies = await cookies();
  const token = await JwtHelper.sign(savedUser);

  userCookies.set(CookieConstants.JwtKey, token, CookieConstants.JwtOptions());

  redirect('/');
  // return ServerActionResponse(HttpStatusCode.Ok, savedUser);
};
