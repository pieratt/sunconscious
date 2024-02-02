import React from "react";

import classNames from "classnames";
import { TextVariant } from "./types";
import { variantToTailwind } from "./utils";

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variant?: TextVariant;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

export const sizeToStyle: Record<NonNullable<Props["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Text({
  as: Tag = "span",
  variant = "mono",
  size = "base",
  className,
  ...props
}: Props) {
  return (
    <Tag
      className={classNames(
        variantToTailwind(variant),
        sizeToStyle[size],
        className
      )}
      {...props}
    />
  );
}
