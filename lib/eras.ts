import { Era } from "./types";

export const eras: Era[] = [
  "CURRENT",
  "SCIENTIFIC",
  "MEDIEVAL",
  "CLASSICAL",
  "PREHISTORIC",
];

interface Attrs {
  name: string;
  color: string;
}

export const EraToAttrs: Record<Era, Attrs> = {
  CURRENT: { name: "Current", color: "text-white" },
  SCIENTIFIC: { name: "Scientific", color: "text-white" },
  MEDIEVAL: { name: "Medieval", color: "text-white" },
  CLASSICAL: { name: "Classical", color: "text-white" },
  PREHISTORIC: { name: "Prehistoric", color: "text-white" },
};
