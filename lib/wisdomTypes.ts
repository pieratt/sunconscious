import { WisdomType } from "./types";

export const wisdomTypes = [WisdomType.Theory, WisdomType.Practice];

interface Attrs {
  name: string;
}

export const WisdomTypeToAttrs: Record<WisdomType, Attrs> = {
  [WisdomType.Theory]: {
    name: "Theory",
  },
  [WisdomType.Practice]: {
    name: "Practice",
  },
};
