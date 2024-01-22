"use client";

import React, {
  createContext,
  ReactElement,
  ReactNode,
  Dispatch,
  useContext,
} from "react";

import {
  Action as FeedAction,
  State as FeedState,
  useFeedReducer,
  getInitialState,
} from "@/context/FeedReducer";

export interface FeedContextState extends FeedState {
  dispatch: Dispatch<FeedAction>;
}

interface FeedProviderProps {
  children: ReactNode;
}

const defaultContext = {
  dispatch: () => {},
  ...getInitialState(),
};

const FeedContext = createContext<FeedContextState>(defaultContext);

export function FeedProvider(props: FeedProviderProps): ReactElement {
  const [state, dispatch] = useFeedReducer();

  return (
    <FeedContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </FeedContext.Provider>
  );
}

function useFeedContext(): FeedContextState {
  return useContext(FeedContext);
}

export default useFeedContext;
