import React, { ComponentProps, forwardRef } from "react";
import { Text } from "../Typography";
import classNames from "classnames";

interface Props extends ComponentProps<"button"> {
  variant?: "solid" | "outline";
  size?: "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
}

export const defaultButtonStyles = [
  "inline-flex",
  "items-center",
  "justify-center",
  "border",
  "focus:outline-none",
  "whitespace-nowrap",
];

const variantToStyles: Record<NonNullable<Props["variant"]>, string[]> = {
  solid: [
    "border-transparent",
    "text-stone-800",
    "bg-neon",
    "hover:bg-neon-hover",
  ],
  outline: [
    "border-neon",
    "hover:border-neon-hover",
    "text-neon",
    "bg-transparent",
    "hover:text-neon-hover",
  ],
};

const sizeToStyles: Record<NonNullable<Props["size"]>, string[]> = {
  sm: ["rounded-full", "px-2.5", "py-1.5", "h-7"],
  base: ["rounded-full", "px-3", "py-2", "h-9"],
  lg: ["rounded-full", "px-4", "py-2", "h-10"],
  xl: ["rounded-full", "px-6", "py-3", "h-12"],
};

const InnerButton = (
  {
    variant: variantProp,
    size: sizeProp,
    className,
    disabled,
    ...props
  }: Props,
  ref: React.Ref<HTMLButtonElement>
) => {
  const variant = variantProp || "solid";
  const size = sizeProp || "base";

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={classNames(
        defaultButtonStyles,
        ...variantToStyles[variant],
        ...sizeToStyles[size],
        className,
        disabled ? "opacity-40 cursor-not-allowed" : ""
      )}
      {...props}
    >
      <Text variant="mono">{props.children}</Text>
    </button>
  );
};

InnerButton.displayName = "Button";

export default forwardRef(InnerButton);
