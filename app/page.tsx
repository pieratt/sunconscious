import { FeedProvider } from "@/context/FeedContext";
import { FeedPage } from "@/ui/page/FeedPage";
import { fetchEnrichedWisdom } from "@/db";

export default async function Home() {
  const wisdom = await fetchEnrichedWisdom();
  return (
    <FeedProvider>
      <FeedPage wisdom={wisdom} />
    </FeedProvider>
  );
}
