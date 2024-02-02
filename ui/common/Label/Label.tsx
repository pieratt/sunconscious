import React from "react";
import { TextProps } from "../Typography";
import classNames from "classnames";
import { variantToTailwind } from "../Typography/utils";

export interface Props extends TextProps {
  htmlFor: string;
  disabled?: boolean;
}

const sizeToStyle: Record<NonNullable<Props["size"]>, string> = {
  xs: "text-xs",
  sm: "text-xs",
  base: "text-sm",
  lg: "text-base",
  xl: "text-base",
};

const Label = ({
  variant = "mono",
  size = "base",
  className,
  htmlFor,
  ...labelProps
}: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        variantToTailwind(variant),
        sizeToStyle[size],
        className
      )}
      {...labelProps}
    />
  );
};

Label.displayName = "Label";

export default Label;
