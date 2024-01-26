"use client";

import { EraToAttrs, eras } from "@/lib/eras";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import { Checkbox } from "@/ui/common/Checkbox";
import { useFeedFilters } from "@/lib/feed";

export default function ErasFilter() {
  const { era: activeEras = [], setFilter } = useFeedFilters();
  return (
    <div>
      <FilterHeader>Eras</FilterHeader>
      <div>
        {eras.map((era) => {
          const { name } = EraToAttrs[era];
          return (
            <Checkbox
              key={era}
              id={`era-${era}`}
              className={classNames("text-white", "uppercase")}
              label={name}
              checked={activeEras.includes(era)}
              onChange={() => {
                const updatedFilters = activeEras.includes(era)
                  ? activeEras.filter((a) => a !== era)
                  : [...activeEras, era];
                setFilter({ param: "era", value: updatedFilters });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
