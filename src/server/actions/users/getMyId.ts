'use server';

import { protect } from '@/helpers/auth/protect.action';
import { ServerActionResponse } from '@/helpers/responses/base.response';
import { HttpStatusCode } from '@/helpers/responses/response.status';

export const getMyId = protect(async (me) => {
  return ServerActionResponse(HttpStatusCode.Ok, me.id);
});
