import { fetchEnrichedAuthors } from "@/db";
import AddAuthorForm from "./AddAuthorForm";
import AddSourceForm from "./AddSourceForm";

export default async function AddPage() {
  const authors = await fetchEnrichedAuthors();
  return (
    <div className="rounded-2xl py-8 px-6 m-8 border-stone-400 border flex flex-col gap-24">
      <AddAuthorForm />
      <AddSourceForm authors={authors} />
    </div>
  );
}
