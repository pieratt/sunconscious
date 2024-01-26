"use client";

import { AreaToAttrs, areas } from "@/lib/areas";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import { Checkbox } from "@/ui/common/Checkbox";
import { useFeedFilters } from "@/lib/feed";

export default function AreasFilter() {
  const { area: activeAreas = [], setFilter } = useFeedFilters();

  return (
    <div>
      <FilterHeader>Areas</FilterHeader>
      <div>
        {areas.map((area) => {
          const { color, name } = AreaToAttrs[area];
          return (
            <Checkbox
              key={area}
              id={`area-${area}`}
              className={classNames(color, "uppercase")}
              label={name}
              checked={activeAreas.includes(area)}
              onChange={() => {
                const updatedFilters = activeAreas.includes(area)
                  ? activeAreas.filter((a) => a !== area)
                  : [...activeAreas, area];
                setFilter({ param: "area", value: updatedFilters });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
