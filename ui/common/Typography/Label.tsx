import React, { type HTMLAttributes } from "react";
import { TextVariant } from "./types";
import { variantToTailwind } from "./utils";
import classNames from "classnames";

export interface Props extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  disabled?: boolean;
  variant?: TextVariant;
}

const Label = ({
  variant = "mono",
  className,
  htmlFor,
  ...labelProps
}: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(variantToTailwind(variant), className)}
      {...labelProps}
    />
  );
};

Label.displayName = "Label";

export default Label;
