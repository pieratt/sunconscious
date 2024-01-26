import { useFeedFilters } from "@/lib/feed";
import FeedFilterPill from "./FeedFilterPill";

export default function FeedFilterPills() {
  const {
    area: activeAreas = [],
    era: activeEras = [],
    wisdomType: activeWisdomTypes = [],
  } = useFeedFilters();

  if (
    activeAreas.length === 0 &&
    activeEras.length === 0 &&
    activeWisdomTypes.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex gap-4 pb-2 flex-wrap">
      {activeAreas.map((area) => (
        <FeedFilterPill
          key={`area-filter-pill-${area}`}
          type="area"
          value={area}
        />
      ))}
      {activeEras.map((era) => (
        <FeedFilterPill key={`era-filter-pill-${era}`} type="era" value={era} />
      ))}
      {activeWisdomTypes.map((wisdomType) => (
        <FeedFilterPill
          key={`wisdomType-filter-pill-${wisdomType}`}
          type="wisdomType"
          value={wisdomType}
        />
      ))}
    </div>
  );
}
