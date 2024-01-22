import React from "react";

import classNames from "classnames";

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variant?: "mono" | "serif" | "sans";
}

function variantToTailwind(variant: Props["variant"]) {
  switch (variant) {
    case "mono":
      return "font-mono";
    case "serif":
      return "font-serif";
    case "sans":
      return "font-sans";
  }
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
