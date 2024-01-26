import { FeedFilters } from "@/ui/bespoke/FeedFilters";
import { Text } from "@/ui/common/Typography";
import Link from "next/link";

export default function FeedSidebarBody() {
  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      <Link href="/">
        <Text className="uppercase text-neon hover:text-neon-hover">
          Sunconscious
        </Text>
      </Link>
      <FeedFilters />
    </div>
  );
}
