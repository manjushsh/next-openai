// ** React Imports
import { createContext, useState, ReactNode } from "react";

// ** Config
// import CacheService from '../utils/cache-service'

// ** Types
import { DefaultProviderType, DynamicObject } from "..";

// ** Defaults
const defaultProvider: DefaultProviderType = {
  OPENAI_CREDENTIALS: {
    OPENAI_API_KEY: null,
    OPEN_AI_ORG: null,
  },
};

const GlobalStateContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const GlobalStateProvider = ({ children }: Props) => {
  // ** States
  const [state, updateState] = useState<
    DynamicObject | DefaultProviderType | any
  >(defaultProvider?.OPENAI_CREDENTIALS);
  const setState = (payload: DynamicObject, type = "common") =>
    updateState({
      ...state,
      [type]: {
        ...state[type],
        ...payload,
      },
    });

  const values = {
    state,
    setState,
  };

  return (
    <GlobalStateContext.Provider value={values}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };

export interface GlobalState {
  common?: DynamicObject;
  OPENAI_CREDENTIALS?: {
    OPENAI_API_KEY: string;
    OPEN_AI_ORG: string;
  };
}
