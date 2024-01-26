import { WisdomType } from "./types";

export const wisdomTypes: WisdomType[] = ["THEORY", "PRACTICE"];

interface Attrs {
  name: string;
  color: string;
}

export const WisdomTypeToAttrs: Record<WisdomType, Attrs> = {
  THEORY: { name: "Theory", color: "text-white" },
  PRACTICE: { name: "Practice", color: "text-white" },
};
