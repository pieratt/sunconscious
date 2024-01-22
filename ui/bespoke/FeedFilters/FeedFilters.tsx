import AreasFilter from "./AreasFilter";
import ErasFilter from "./ErasFilter";
import TypesFilter from "./TypeFilter";

export default function FeedFilters() {
  return (
    <div className="flex flex-col gap-8">
      <AreasFilter />
      <TypesFilter />
      <ErasFilter />
    </div>
  );
}
