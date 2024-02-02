import { addUser } from "@/lib/actions";
import CreateUserButton from "./CreateUserButton";

export default function AddPage() {
  return (
    <form action={addUser}>
      <input type="text" name="username" hidden defaultValue="kinney" />
      <CreateUserButton />
    </form>
  );
}
