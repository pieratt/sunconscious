import AreasFilter from "./AreasFilter";
import ErasFilter from "./ErasFilter";
import WisdomTypeFilter from "./WisdomTypeFilter";

export default function FeedFilters() {
  return (
    <div className="flex flex-col gap-8">
      <AreasFilter />
      <WisdomTypeFilter />
      <ErasFilter />
    </div>
  );
}
