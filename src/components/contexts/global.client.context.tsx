'use client';

import { TokenPayload } from '@/types/jwt/token.payload.type';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { LoadingSpinner } from '../ui/loader';

const globalContextValue = {
  ui: {
    sidebar: {
      expanded: false,
      setExpanded: (() => {}) as Dispatch<SetStateAction<boolean>>,
    },
    loading: false,
  },
  user: {} as TokenPayload,
};

const GlobalContext = createContext(globalContextValue);

export function GlobalContextProvider({ children, user }: React.PropsWithChildren & { user?: TokenPayload }) {
  const [expanded, setExpanded] = useLocalStorageState('_ui.sidebarExpanded', {
    storageSync: true,
    defaultValue: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center dark">
        <LoadingSpinner />
        <p>Инициализируем контексты..</p>
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        ui: {
          sidebar: {
            expanded,
            setExpanded,
          },
          loading,
        },
        user: user ?? ({} as TokenPayload),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

/**
 * Use Global context values.
 */
export function useGlobalContext() {
  return useContext(GlobalContext);
}

/**
 * Use token values. (NOT THIS IS NOT A REAL USER BUT JWT TOKEN VALUE)
 */
export function useContextUser() {
  return useContext(GlobalContext).user;
}
