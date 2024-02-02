import React, { ComponentProps, forwardRef } from "react";
import { Label, LabelProps, Text, TextProps } from "../Typography";
import classNames from "classnames";

export interface Props extends Omit<ComponentProps<"input">, "size"> {
  id: string;
  label: React.ReactNode;
  hideLabel?: boolean;
  error?: string;
  containerClassName?: string;
  size: "sm" | "base" | "lg" | "xl";
}

export const sizeToTextSize: Record<
  NonNullable<Props["size"]>,
  TextProps["size"]
> = {
  sm: "xs",
  base: "sm",
  lg: "base",
  xl: "base",
};

export const sizeToLabelSize: Record<
  NonNullable<Props["size"]>,
  LabelProps["size"]
> = {
  sm: "xs",
  base: "sm",
  lg: "base",
  xl: "base",
};

const baseStyles = [
  "flex",
  "w-full",
  "bg-black",
  "placeholder:text-stone-600",
  "leading-none",
  "items-center",
];

const variantsToStyles = {
  primary: ["border-transparent", "focus:outline-none"],
  error: ["border-red-600", "focus:border-red-600"],
};

const sizesToStyles = {
  sm: ["text-xs", "h-8", "px-2.5"],
  base: ["text-sm", "h-10", "px-3"],
  lg: ["text-base", "h-12", "px-3"],
  xl: ["text-base", "h-14", "px-3.5"],
};

const InnerInput = (
  {
    id,
    error,
    size: sizeProp,
    hideLabel = false,
    className,
    containerClassName,
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const variant = error ? "error" : "primary";
  const size = sizeProp || "base";
  return (
    <div>
      <Label
        htmlFor={id}
        size={size}
        className={hideLabel ? "sr-only" : undefined}
      >
        {props.label}
      </Label>
      <div
        className={classNames(
          "relative",
          hideLabel ? "" : "mt-1",
          containerClassName
        )}
      >
        <input
          ref={ref}
          id={id}
          className={classNames(
            baseStyles,
            sizesToStyles[size],
            variantsToStyles[variant],
            className
          )}
          {...props}
          aria-describedby={`${id}-error`}
        />
      </div>
      {error ? (
        <Text className="text-red-600" size="xs" id={id}>
          {error}
        </Text>
      ) : null}
    </div>
  );
};

InnerInput.displayName = "Input";

export default forwardRef(InnerInput);
