"use client";

import { WisdomTypeToAttrs, wisdomTypes } from "@/lib/wisdomTypes";
import FilterHeader from "./FilterHeader";
import classNames from "classnames";
import useFeedContext from "@/context/FeedContext";
import { Checkbox } from "@/ui/common/Checkbox";

export default function TypesFilter() {
  const { activeTypes, dispatch } = useFeedContext();
  return (
    <div>
      <FilterHeader>Type</FilterHeader>
      <div>
        {wisdomTypes.map((t) => {
          const { name } = WisdomTypeToAttrs[t];
          return (
            <Checkbox
              key={t}
              id={`wisdom-type-${t}`}
              className={classNames("text-white", "uppercase")}
              label={name}
              checked={activeTypes.includes(t)}
              onChange={() =>
                dispatch({ type: "toggleActiveType", wisdomType: t })
              }
            />
          );
        })}
      </div>
    </div>
  );
}
