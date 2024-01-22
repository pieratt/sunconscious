"use client";

import { EraToAttrs, eras } from "@/lib/eras";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import useFeedContext from "@/context/FeedContext";
import { Checkbox } from "@/ui/common/Checkbox";

export default function ErasFilter() {
  const { activeEras, dispatch } = useFeedContext();
  return (
    <div>
      <FilterHeader>Eras</FilterHeader>
      <div>
        {eras.map((e) => {
          const { name } = EraToAttrs[e];
          return (
            <Checkbox
              key={e}
              id={`era-${e}`}
              className={classNames("text-white", "uppercase")}
              label={name}
              checked={activeEras.includes(e)}
              onChange={() => dispatch({ type: "toggleActiveEra", era: e })}
            />
          );
        })}
      </div>
    </div>
  );
}
