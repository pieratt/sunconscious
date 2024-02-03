import { AreaToAttrs, areas } from "@/lib/areas";
import { Checkbox } from "@/ui/common/Checkbox";
import { Text } from "@/ui/common/Typography";
import { chunk } from "@/lib/funcs";
import classNames from "classnames";

export default function AreaCheckboxes() {
  return (
    <div className="bg-black px-3 pt-3 pb-4">
      <div className="pb-1">
        <Text className="text-white uppercase pb-1">Areas</Text>
      </div>
      <div className="flex flex-wrap">
        {chunk(areas, 3).map((chunk, i) => (
          <div className="w-40" key={`chunk-${i}`}>
            {chunk.map((area) => {
              const { color, name } = AreaToAttrs[area];
              return (
                <Checkbox
                  key={area}
                  id={`wisdom-select-area-${area}`}
                  name={area}
                  className={classNames(color, "uppercase")}
                  label={name}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
