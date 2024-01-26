import { AreaToAttrs } from "@/lib/areas";
import { EraToAttrs } from "@/lib/eras";
import { ParamsState } from "@/lib/feed";
import { WisdomTypeToAttrs } from "@/lib/wisdomTypes";
import { Text } from "@/ui/common/Typography";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type FilterType = keyof ParamsState;

type ElementType<T> = T extends (infer U)[] ? U : never;
type FilterValue<T extends FilterType> = NonNullable<
  ElementType<ParamsState[T]>
>;

interface Props<T extends FilterType> {
  type: T;
  value: NonNullable<ElementType<ParamsState[T]>>;
}

export function getFilterAttrs<T extends FilterType>(
  type: T,
  value: FilterValue<T>
) {
  switch (type) {
    case "wisdomType":
      return WisdomTypeToAttrs[value as keyof typeof WisdomTypeToAttrs];
    case "era":
      return EraToAttrs[value as keyof typeof EraToAttrs];
    case "area":
      return AreaToAttrs[value as keyof typeof AreaToAttrs];
    default:
      throw new Error("Invalid filter type");
  }
}

export default function FeedFilterPill<T extends FilterType>(props: Props<T>) {
  const { type, value } = props;
  const { name, color } = getFilterAttrs<T>(type, value);

  return (
    <div className="flex flex-nowrap gap-0.5 items-center">
      <Text className={classNames(color, "uppercase")}>{name}</Text>
      <XMarkIcon className="w-4 h-4 text-stone-500" />
    </div>
  );
}
