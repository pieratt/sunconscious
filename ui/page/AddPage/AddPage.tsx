import { addAuthor } from "@/lib/actions";
import AddAuthorButton from "./AddAuthorButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";

export default function AddPage() {
  return (
    <div className="rounded-2xl py-8 px-6 m-8 border-stone-400 border">
      <form action={addAuthor} className="flex flex-col gap-2">
        <Text className="text-neon uppercase">Add author</Text>
        <Input
          id="author"
          name="author"
          label="Author"
          type="text"
          size="lg"
          hideLabel
          required
          placeholder="Name"
          className="w-full"
        />
        <AddAuthorButton />
      </form>
    </div>
  );
}
