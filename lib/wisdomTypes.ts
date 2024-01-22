import { WisdomType } from "./types";

export const wisdomTypes: WisdomType[] = ["THEORY", "PRACTICE"];

interface Attrs {
  name: string;
}

export const WisdomTypeToAttrs: Record<WisdomType, Attrs> = {
  THEORY: { name: "Theory" },
  PRACTICE: { name: "Practice" },
};
