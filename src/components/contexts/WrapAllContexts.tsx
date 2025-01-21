'use client';

import React from 'react';
import { GlobalContextProvider } from './global.client.context';
import { TokenPayload } from '@/types/jwt/token.payload.type';

export function WrapWithContexts({ children, user }: React.PropsWithChildren & { user?: TokenPayload }) {
  return <GlobalContextProvider user={user}>{children}</GlobalContextProvider>;
}
