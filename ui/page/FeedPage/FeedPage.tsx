"use client";
import { OpenRightSidebarButton, RightSidebar } from "@/ui/common/RightSidebar";
import { Text } from "@/ui/common/Typography";
import useFeedContext from "@/context/FeedContext";
import { WisdomItem } from "@/ui/bespoke/WisdomItem";
import { useFilteredWisdom } from "@/lib/feed";
import FeedFilterPills from "./FeedFilterPills";
import { Suspense } from "react";
import FeedSidebarBody from "./FeedSidebarBody";
import { IWisdom } from "@/lib/types";

interface Props {
  wisdom: IWisdom[];
}

function FeedPageBody(props: Props) {
  const { dispatch, isSidebarOpen } = useFeedContext();
  const filteredWisdom = useFilteredWisdom(props.wisdom);
  return (
    <div className="relative flex w-full py-6 px-4">
      <div className="w-full md:mr-96">
        <div className="flex justify-between items-start">
          <div>
            <FeedFilterPills />
            <div className="pb-4">
              <Text className="uppercase">{filteredWisdom.length} Results</Text>
            </div>
          </div>
          <OpenRightSidebarButton
            onClick={() => dispatch({ type: "setSidebar", isOpen: true })}
          />
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
        <FeedSidebarBody />
      </RightSidebar>
    </div>
  );
}

export default function FeedPage(props: Props) {
  return (
    <Suspense>
      <FeedPageBody {...props} />
    </Suspense>
  );
}
