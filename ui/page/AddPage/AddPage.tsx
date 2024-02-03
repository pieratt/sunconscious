import { fetchEnrichedAuthors, fetchEnrichedSources } from "@/db";
import AddAuthorForm from "./AddAuthorForm";
import AddSourceForm from "./AddSourceForm";
import AddWisdomForm from "./AddWisdomForm";

export default async function AddPage() {
  const authors = await fetchEnrichedAuthors();
  const sources = await fetchEnrichedSources();
  return (
    <div className="rounded-2xl py-4 px-3 my-4 mx-3 md:py-8 md:px-6 md:m-8 border-stone-400 border flex flex-col gap-24">
      <AddWisdomForm authors={authors} sources={sources} />
      <AddAuthorForm />
      <AddSourceForm authors={authors} />
    </div>
  );
}
