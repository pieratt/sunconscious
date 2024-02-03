"use client";

import ReactSelect, {
  type SelectInstance,
  type GroupBase,
  type Props as SelectProps,
} from "react-select";
import {
  inputSizeToLabelSize,
  inputBaseStyles,
  inputVariantsToStyles,
  inputSizesToStyles,
  InputProps,
} from "../Input";
import { forwardRef } from "react";
import { Label, Text } from "../Typography";
import classNames from "classnames";
import ReactCreatable, { type CreatableProps } from "react-select/creatable";

const sizeToNoOptionSize = {
  sm: ["text-xs", "py-1"],
  base: ["text-sm", "py-1.5"],
  lg: ["text-base", "py-2"],
  xl: ["text-base", "py-2"],
};

const sizeToOptionSize = {
  sm: ["text-xs", "p-2"],
  base: ["text-sm", "p-2.5"],
  lg: ["text-base", "p-2.5"],
  xl: ["text-base", "p-3"],
};

// enable generic forwardRef. don't move this declaration elsewhere as we
// do not want to apply it everywhere. the duplication is not a problem
// because this code won't be in the final bundle.
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module "react" {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type Props<
  Option,
  IsCreatable extends boolean = false,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = InputProps & { isCreatable?: boolean } & InputProps &
  (IsCreatable extends true
    ? CreatableProps<Option, IsMulti, Group>
    : SelectProps<Option, IsMulti, Group>);

export const InnerSelect = <
  Option,
  IsCreatable extends boolean = false,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  {
    id,
    isCreatable = false,
    size: sizeProp,
    hideLabel = false,
    error,
    ...props
  }: Props<Option, IsCreatable, IsMulti, Group>,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) => {
  const Input = isCreatable
    ? ReactCreatable<Option, IsMulti, Group>
    : ReactSelect<Option, IsMulti, Group>;
  const intent = error ? "error" : "primary";
  const size = sizeProp || "base";
  return (
    <div>
      <Label
        htmlFor={id}
        size={inputSizeToLabelSize[size]}
        disabled={props.isDisabled}
        className={hideLabel ? "sr-only" : undefined}
      >
        {props.label}
      </Label>
      <div className={classNames("relative", hideLabel ? "" : "mt-1")}>
        <Input
          instanceId={`react-select-${id}`}
          ref={ref}
          id={id}
          unstyled
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
              minWidth: 0,
            }),
            control: () => ({
              minHeight: "unset",
            }),
            option: (base) => ({
              ...base,
              fontSize: undefined,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "300px",
            }),
          }}
          classNames={{
            dropdownIndicator: ({ isDisabled }) => {
              return classNames(
                "text-stone-400 pl-1",
                isDisabled ? "" : "border-black"
              );
            },
            singleValue: () => {
              return "py-1.5";
            },
            clearIndicator: () => {
              return "text-stone-500 px-2";
            },
            indicatorsContainer(props) {
              return "text-stone-500";
            },
            control: ({ isFocused, isDisabled }) =>
              classNames(
                ...inputBaseStyles,
                ...inputVariantsToStyles[intent],
                ...inputSizesToStyles[size],
                isFocused && "",
                "min-h-none w-full",
                "rounded-full",
                "font-mono",
                isDisabled ? "bg-stone-800" : "bg-black"
              ),
            option: ({ isFocused, isSelected }) =>
              classNames(
                "cursor-pointer select-none relative text-white",
                sizeToOptionSize[size],
                isSelected ? "bg-stone-600" : "hover:bg-stone-700 ",
                !isSelected && isFocused ? "bg-stone-700" : ""
              ),
            placeholder: ({ isDisabled }) => {
              return classNames(
                isDisabled ? "text-stone-800" : "text-stone-600"
              );
            },
            menu: () => {
              return classNames("my-2");
            },
            menuList: () => {
              return classNames(
                "py-1 bg-black rounded-md shadow-lg rounded-md font-mono"
              );
            },
            noOptionsMessage: () => {
              return classNames(sizeToNoOptionSize[size], "text-neon bg-black");
            },
          }}
          {...props}
          aria-describedby={`${id}-error`}
        />
      </div>
      {error ? (
        <Text id={id} size={size}>
          {error}
        </Text>
      ) : null}
    </div>
  );
};

export default forwardRef(InnerSelect);
