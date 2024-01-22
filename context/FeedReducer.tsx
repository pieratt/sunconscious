"use client";

import { useReducer, Dispatch } from "react";

import { UnreachableCaseError } from "@/lib/errors";
import { Area, Era, WisdomType } from "@/lib/types";

export interface State {
  isSidebarOpen: boolean;
  activeAreas: Area[];
  activeEras: Era[];
  activeTypes: WisdomType[];
}

export function getInitialState(): State {
  return {
    isSidebarOpen: false,
    activeAreas: [],
    activeEras: [],
    activeTypes: [],
  };
}

export type Action =
  | { type: "setSidebar"; isOpen: boolean }
  | { type: "toggleActiveArea"; area: Area }
  | { type: "toggleActiveEra"; era: Era }
  | { type: "toggleActiveType"; wisdomType: WisdomType };

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

    case "toggleActiveEra":
      const isEraActive = state.activeEras.includes(action.era);
      const updatedEras = isEraActive
        ? state.activeEras.filter((a) => a !== action.era)
        : [...state.activeEras, action.era];

      return {
        ...state,
        activeEras: updatedEras,
      };

    case "toggleActiveType":
      const isTypeActive = state.activeTypes.includes(action.wisdomType);
      const updatedTypes = isTypeActive
        ? state.activeTypes.filter((a) => a !== action.wisdomType)
        : [...state.activeTypes, action.wisdomType];

      return {
        ...state,
        activeTypes: updatedTypes,
      };

    default:
      console.error(new UnreachableCaseError(action));
      return state;
  }
}

export function useFeedReducer(): [State, Dispatch<Action>] {
  return useReducer(reduce, getInitialState());
}
