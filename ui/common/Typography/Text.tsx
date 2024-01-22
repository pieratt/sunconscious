import React from "react";

import classNames from "classnames";
import { TextVariant } from "./types";
import { variantToTailwind } from "./utils";

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variant?: TextVariant;
}

export default function Text({
  as: Tag = "span",
  variant = "mono",
  className,
  ...props
}: Props) {
  return (
    <Tag
      className={classNames(variantToTailwind(variant), className)}
      {...props}
    />
  );
}
