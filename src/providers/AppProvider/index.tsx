// context/AuthContext.tsx
import React, { createContext, useState } from 'react';
export const AppContext = createContext<any>(null);

const initialState = {
    loading: false,
}

export const AppProvider = ({ children }: any) => {
  const [state, send] = useState<typeof initialState>(initialState);

  return (
    <AppContext.Provider value={{ state, send }}>
      {children}
    </AppContext.Provider>
  );
};