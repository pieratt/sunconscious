import { FeedProvider } from "@/context/FeedContext";
import { FeedPage } from "@/ui/page/FeedPage";

export default function Home() {
  return (
    <FeedProvider>
      <FeedPage />
    </FeedProvider>
  );
}
