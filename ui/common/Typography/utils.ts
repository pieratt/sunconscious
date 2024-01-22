import { TextVariant } from "./types";

export function variantToTailwind(variant: TextVariant) {
  switch (variant) {
    case "mono":
      return "font-mono";
    case "serif":
      return "font-serif";
    case "sans":
      return "font-sans";
  }
}
