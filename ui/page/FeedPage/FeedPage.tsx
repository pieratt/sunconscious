"use client";
import { RightSidebar } from "@/ui/common/RightSidebar.tsx";
import { Text } from "@/ui/common/Typography";
import useFeedContext from "@/context/FeedContext";
import { WisdomItem } from "@/ui/bespoke/WisdomItem";
import Link from "next/link";
import { FeedFilters } from "@/ui/bespoke/FeedFilters";
import { useFilteredWisdom } from "@/lib/feed";
import FeedFilterPills from "./FeedFilterPills";

export default function FeedPage() {
  const { dispatch, isSidebarOpen } = useFeedContext();
  const filteredWisdom = useFilteredWisdom();
  return (
    <div className="relative flex w-full p-6 ">
      <div className="w-full md:mr-80">
        <FeedFilterPills />
        <div className="pb-4">
          <Text className="uppercase">{filteredWisdom.length} Results</Text>
        </div>
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
        <Link className="py-6" href="/">
          <Text className="uppercase text-neon hover:text-neon-hover">
            Sunconscious
          </Text>
        </Link>
        <FeedFilters />
      </RightSidebar>
    </div>
  );
}
