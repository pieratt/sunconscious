"use client";

import { useFormStatus } from "react-dom";

export default function CreateUserButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-neon text-stone-50 px-4 py-2 rounded" type="submit">
      {pending ? "Creating..." : "Create User"}
    </button>
  );
}
