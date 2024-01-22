import { Area } from "./types";

export const areas: Area[] = [
  "MYSTERY",
  "SELF",
  "WEALTH",
  "COMMUNICATION",
  "HOME",
  "CREATIVITY",
  "HEALTH",
  "PARTNERS",
  "LOSS",
  "PHILOSOPHY",
  "PURPOSE",
  "NETWORK",
];

interface Attrs {
  name: string;
  color: string;
}

export const AreaToAttrs: Record<Area, Attrs> = {
  MYSTERY: {
    name: "Mystery",
    color: "text-emerald-400",
  },
  SELF: {
    name: "Self",
    color: "text-emerald-600",
  },
  WEALTH: {
    name: "Wealth",
    color: "text-emerald-800",
  },
  COMMUNICATION: {
    name: "Communication",
    color: "text-purple-400",
  },
  HOME: {
    name: "Home",
    color: "text-purple-600",
  },
  CREATIVITY: {
    name: "Creativity",
    color: "text-purple-800",
  },
  HEALTH: {
    name: "Health",
    color: "text-sky-400",
  },
  PARTNERS: {
    name: "Partners",
    color: "text-sky-600",
  },
  LOSS: {
    name: "Loss",
    color: "text-sky-800",
  },
  PHILOSOPHY: {
    name: "Philosophy",
    color: "text-pink-400",
  },
  PURPOSE: {
    name: "Purpose",
    color: "text-pink-600",
  },
  NETWORK: {
    name: "Network",
    color: "text-pink-800",
  },
};
