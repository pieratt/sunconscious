import { Area } from "./types";

export const areas = [
  Area.Mystery,
  Area.Self,
  Area.Wealth,
  Area.Communication,
  Area.Home,
  Area.Creativity,
  Area.Health,
  Area.Partners,
  Area.Loss,
  Area.Philosophy,
  Area.Purpose,
  Area.Network,
];

interface Attrs {
  name: string;
  color: string;
}

export const AreaToAttrs: Record<Area, Attrs> = {
  [Area.Mystery]: {
    name: "Mystery",
    color: "text-emerald-400",
  },
  [Area.Self]: {
    name: "Self",
    color: "text-emerald-600",
  },
  [Area.Wealth]: {
    name: "Wealth",
    color: "text-emerald-800",
  },
  [Area.Communication]: {
    name: "Communication",
    color: "text-purple-400",
  },
  [Area.Home]: {
    name: "Home",
    color: "text-purple-600",
  },
  [Area.Creativity]: {
    name: "Creativity",
    color: "text-purple-800",
  },
  [Area.Health]: {
    name: "Health",
    color: "text-sky-400",
  },
  [Area.Partners]: {
    name: "Partners",
    color: "text-sky-600",
  },
  [Area.Loss]: {
    name: "Loss",
    color: "text-sky-800",
  },
  [Area.Philosophy]: {
    name: "Philosophy",
    color: "text-pink-400",
  },
  [Area.Purpose]: {
    name: "Purpose",
    color: "text-pink-600",
  },
  [Area.Network]: {
    name: "Network",
    color: "text-pink-800",
  },
};
