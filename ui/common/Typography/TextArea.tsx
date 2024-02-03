import React, { ComponentProps, forwardRef } from "react";
import { Label, Text } from "../Typography";
import classNames from "classnames";
import { inputBaseStyles, inputVariantsToStyles } from "../Input";

export interface Props extends Omit<ComponentProps<"textarea">, "size"> {
  id: string;
  label: React.ReactNode;
  hideLabel?: boolean;
  error?: string;
  containerClassName?: string;
  size: "sm" | "base" | "lg" | "xl";
}

const sizesToStyles = {
  sm: ["text-xs", "p-2.5"],
  base: ["text-sm", "p-3"],
  lg: ["text-base", "p-3"],
  xl: ["text-lg", "p-3.5"],
};

const InnerTextArea = (
  {
    id,
    error,
    size: sizeProp,
    hideLabel = false,
    className,
    containerClassName,
    ...props
  }: Props,
  ref: React.Ref<HTMLTextAreaElement>
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
        <textarea
          ref={ref}
          id={id}
          className={classNames(
            inputBaseStyles,
            "font-serif",
            sizesToStyles[size],
            inputVariantsToStyles[variant],
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

InnerTextArea.displayName = "TextArea";

export default forwardRef(InnerTextArea);
