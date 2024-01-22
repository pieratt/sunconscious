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
}

export const EraToAttrs: Record<Era, Attrs> = {
  CURRENT: { name: "Current" },
  SCIENTIFIC: { name: "Scientific" },
  MEDIEVAL: { name: "Medieval" },
  CLASSICAL: { name: "Classical" },
  PREHISTORIC: { name: "Prehistoric" },
};
