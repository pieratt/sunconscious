import React, { type HTMLAttributes } from "react";
import { TextVariant } from "./types";
import { variantToTailwind } from "./utils";
import classNames from "classnames";
import { sizeToStyle } from "./Text";

export interface Props extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  disabled?: boolean;
  variant?: TextVariant;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

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
