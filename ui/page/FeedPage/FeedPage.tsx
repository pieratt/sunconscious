"use client";
import { RightSidebar } from "@/ui/common/RightSidebar.tsx";
import { Text } from "@/ui/common/Typography";
import useFeedContext from "@/context/FeedContext";
import { WisdomItem } from "@/ui/bespoke/WisdomItem";
import Link from "next/link";
import { FeedFilters } from "@/ui/bespoke/FeedFilters";
import wisdom from "@/db/wisdom";

function useFilteredWisdom() {
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
        areas.some((a) => activeAreas.includes(a))) &&
      (activeEras.length === 0 || activeEras.includes(era)) &&
      (activeTypes.length === 0 || activeTypes.includes(type))
    );
  });
}

export default function FeedPage() {
  const { dispatch, isSidebarOpen } = useFeedContext();
  const filteredWisdom = useFilteredWisdom();
  return (
    <div className="relative flex w-full p-8 ">
      <div className="w-full md:mr-80">
        <Text className="uppercase">{filteredWisdom.length} Results</Text>
        <div className="flex flex-col gap-4">
          {filteredWisdom.map((w) => (
            <WisdomItem {...w} key={w.id} />
          ))}
        </div>
      </div>
      <RightSidebar
        isOpen={isSidebarOpen}
        onClose={() => dispatch({ type: "setSidebar", isOpen: false })}
      >
        <Link className="py-4" href="/">
          <Text className="uppercase text-neon hover:text-neon-hover">
            Sunconscious
          </Text>
        </Link>
        <FeedFilters />
      </RightSidebar>
    </div>
  );
}