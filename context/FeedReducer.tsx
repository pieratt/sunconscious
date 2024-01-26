"use client";

import { useReducer, Dispatch } from "react";

import { UnreachableCaseError } from "@/lib/errors";

export interface State {
  isSidebarOpen: boolean;
}

export function getInitialState(): State {
  return {
    isSidebarOpen: false,
  };
}

export type Action = { type: "setSidebar"; isOpen: boolean };

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "setSidebar":
      return {
        ...state,
        isSidebarOpen: action.isOpen,
      };

    default:
      console.error(new UnreachableCaseError(action));
      return state;
  }
}

export function useFeedReducer(): [State, Dispatch<Action>] {
  return useReducer(reduce, getInitialState());
}
