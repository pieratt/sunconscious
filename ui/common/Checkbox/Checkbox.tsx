import classNames from "classnames";
import { Label } from "@/ui/common/Typography";

type DefaultInputProps = Omit<React.ComponentProps<"input">, "id" | "size">;

interface Props extends DefaultInputProps {
  id: string;
  label: string;
  description?: string;
}

export default function Checkbox({
  id,
  label,
  description,
  className,
  ...props
}: Props) {
  return (
    <div className="relative flex">
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby={description ? `${id}-description` : undefined}
          type="checkbox"
          className={classNames(
            "cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          )}
          {...props}
        />
      </div>
      <div className="flex items-center">
        <Label
          htmlFor={id}
          className={classNames("cursor-pointer ml-2 text-start", className)}
        >
          {label}
        </Label>
      </div>
    </div>
  );
}
