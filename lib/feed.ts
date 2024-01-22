import useFeedContext from "@/context/FeedContext";
import wisdom from "@/db/wisdom";

export function useFilteredWisdom() {
  const { activeAreas, activeEras, activeTypes } = useFeedContext();

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
