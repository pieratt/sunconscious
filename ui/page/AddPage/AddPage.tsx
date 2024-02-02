import { createUser } from "@/lib/actions";
import CreateUserButton from "./CreateUserButton";

export default function AddPage() {
  return (
    <form action={createUser}>
      <input type="text" name="username" hidden defaultValue="kinney" />
      <CreateUserButton />
    </form>
  );
}
