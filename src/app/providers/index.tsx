import useUserState, { defaultUserState, UserStateType } from "@user/hooks/useUserState";
import { IUser } from "@user/types";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type AppContextType = {
  userState: UserStateType;
};

const AppContext = createContext<AppContextType>({
  userState: defaultUserState,
});

export default function StateProvider({ children }: { children: React.ReactNode }) {
  const userState = useUserState();

  return (
    <AppContext.Provider value={{ userState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext<AppContextType>(AppContext);
