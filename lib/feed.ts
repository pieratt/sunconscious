import wisdom from "@/db/wisdom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Area, Era, WisdomType } from "./types";

export function useFilteredWisdom() {
  const {
    area: activeAreas = [],
    era: activeEras = [],
    wisdomType: activeTypes = [],
  } = useFeedFilters();

  if (
    activeTypes.length === 0 &&
    activeEras.length === 0 &&
    activeAreas.length === 0
  ) {
    return wisdom;
  }

  return wisdom.filter((w) => {
    const { areas, era, type } = w;
    return (
      (activeAreas.length === 0 ||
        activeAreas.every((a) => areas.includes(a))) &&
      (activeEras.length === 0 || activeEras.includes(era)) &&
      (activeTypes.length === 0 || activeTypes.includes(type))
    );
  });
}

type FeedFilterParam = "wisdomType" | "era" | "area";

export type ParamsState = {
  wisdomType?: WisdomType[];
  era?: Era[];
  area?: Area[];
};

export type SetAreaPayload = {
  param: "area";
  value: Area[];
};

export type SetEraPayload = {
  param: "era";
  value: Era[];
};

export type SetWisdomTypesPayload = {
  param: "wisdomType";
  value: WisdomType[];
};

export type SetFilterPayload =
  | SetWisdomTypesPayload
  | SetAreaPayload
  | SetEraPayload;

function useParamsNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (params: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`);
  };
}

function getParamsState(searchParams: URLSearchParams): ParamsState {
  const areas = searchParams.getAll("area") as Area[];
  const eras = searchParams.getAll("era") as Era[];
  const wisdomTypes = searchParams.getAll("wisdomType") as WisdomType[];

  return {
    area: areas.length > 0 ? areas : undefined,
    era: eras.length > 0 ? eras : undefined,
    wisdomType: wisdomTypes.length > 0 ? wisdomTypes : undefined,
  };
}

export function useFeedFilters() {
  const searchParams = useSearchParams();
  const paramsNav = useParamsNav();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const setFilter = (payload: SetFilterPayload) => {
    if (payload.param === "area") {
      const updatedAreas = payload.value;
      current.delete("area");
      updatedAreas.forEach((area) => {
        current.append("area", area);
      });
    }

    if (payload.param === "era") {
      const updatedAreas = payload.value;
      current.delete("era");
      updatedAreas.forEach((era) => {
        current.append("era", era);
      });
    }

    if (payload.param === "wisdomType") {
      const updatedAreas = payload.value;
      current.delete("wisdomType");
      updatedAreas.forEach((wisdomType) => {
        current.append("wisdomType", wisdomType);
      });
    }

    paramsNav(current);
  };

  const removeFilter = (param: FeedFilterParam, value?: string) => {
    if (value) {
      const values = current.getAll(param);
      const updatedValues = values.filter((v) => v !== value);
      current.delete(param);
      updatedValues.forEach((v) => {
        current.append(param, v);
      });
    } else {
      current.delete(param);
    }
    paramsNav(current);
  };

  const paramsState = getParamsState(current);

  return {
    setFilter,
    clearFilters: () => {
      paramsNav(new URLSearchParams());
    },
    removeFilter,
    ...paramsState,
  };
}
