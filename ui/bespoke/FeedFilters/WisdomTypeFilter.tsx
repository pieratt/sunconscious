"use client";

import { WisdomTypeToAttrs, wisdomTypes } from "@/lib/wisdomTypes";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import { Checkbox } from "@/ui/common/Checkbox";
import { useFeedFilters } from "@/lib/feed";

export default function WisdomTypesFilter() {
  const { wisdomType: activeWisdomTypes = [], setFilter } = useFeedFilters();
  return (
    <div>
      <FilterHeader>Type</FilterHeader>
      <div>
        {wisdomTypes.map((wisdomType) => {
          const { name } = WisdomTypeToAttrs[wisdomType];
          return (
            <Checkbox
              key={wisdomType}
              id={`wisdom-type-${wisdomType}`}
              className={classNames("text-white", "uppercase")}
              label={name}
              checked={activeWisdomTypes.includes(wisdomType)}
              onChange={() => {
                const updatedFilters = activeWisdomTypes.includes(wisdomType)
                  ? activeWisdomTypes.filter((a) => a !== wisdomType)
                  : [...activeWisdomTypes, wisdomType];
                setFilter({ param: "wisdomType", value: updatedFilters });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
