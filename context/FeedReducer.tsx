"use client";

import { useReducer, Dispatch } from "react";

import { UnreachableCaseError } from "@/lib/errors";
import { Area, WisdomType } from "@/lib/types";

export interface State {
  isSidebarOpen: boolean;
  activeAreas: Area[];
  activeWisdomType: WisdomType;
}

export function getInitialState(): State {
  return {
    isSidebarOpen: false,
    activeAreas: [],
    activeWisdomType: WisdomType.Theory,
  };
}

export type Action =
  | { type: "setSidebar"; isOpen: boolean }
  | { type: "toggleActiveArea"; area: Area }
  | { type: "setActiveWisdomType"; wisdomType: WisdomType };

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "setSidebar":
      return {
        ...state,
        isSidebarOpen: action.isOpen,
      };

    case "toggleActiveArea":
      const isActive = state.activeAreas.includes(action.area);
      const updatedAreas = isActive
        ? state.activeAreas.filter((a) => a !== action.area)
        : [...state.activeAreas, action.area];

      return {
        ...state,
        activeAreas: updatedAreas,
      };

    case "setActiveWisdomType":
      return {
        ...state,
        activeWisdomType: action.wisdomType,
      };

    default:
      console.error(new UnreachableCaseError(action));
      return state;
  }
}

export function useFeedReducer(): [State, Dispatch<Action>] {
  return useReducer(reduce, getInitialState());
}
