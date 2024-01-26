import { useFeedFilters } from "@/lib/feed";
import FeedFilterPill from "./FeedFilterPill";

export default function FeedFilterPills() {
  const {
    area: activeAreas = [],
    era: activeEras = [],
    wisdomType: activeWisdomTypes = [],
  } = useFeedFilters();
  return (
    <div className="flex gap-4 -mx-1 pb-2 flex-wrap">
      {activeAreas.map((area) => (
        <FeedFilterPill type="area" value={area} />
      ))}
      {activeEras.map((era) => (
        <FeedFilterPill type="era" value={era} />
      ))}
      {activeWisdomTypes.map((wisdomType) => (
        <FeedFilterPill type="wisdomType" value={wisdomType} />
      ))}
    </div>
  );
}
