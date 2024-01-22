"use client";

import { AreaToAttrs, areas } from "@/lib/areas";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import useFeedContext from "@/context/FeedContext";
import { Checkbox } from "@/ui/common/Checkbox";

export default function AreasFilter() {
  const { activeAreas, dispatch } = useFeedContext();
  return (
    <div>
      <FilterHeader>Areas</FilterHeader>
      <div>
        {areas.map((a) => {
          const { color, name } = AreaToAttrs[a];
          return (
            <Checkbox
              key={a}
              id={`area-${a}`}
              className={classNames(color, "uppercase")}
              label={name}
              checked={activeAreas.includes(a)}
              onChange={() => dispatch({ type: "toggleActiveArea", area: a })}
            />
          );
        })}
      </div>
    </div>
  );
}
