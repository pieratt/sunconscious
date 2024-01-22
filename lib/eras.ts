import { Era } from "./types";

export const eras = [
  Era.Current,
  Era.Scientific,
  Era.Medieval,
  Era.Classical,
  Era.Prehistoric,
];

interface Attrs {
  name: string;
}

export const EraToAttrs: Record<Era, Attrs> = {
  [Era.Current]: {
    name: "Current",
  },
  [Era.Scientific]: {
    name: "Scientific",
  },
  [Era.Medieval]: {
    name: "Medieval",
  },
  [Era.Classical]: {
    name: "Classical",
  },
  [Era.Prehistoric]: {
    name: "Prehistoric",
  },
};
