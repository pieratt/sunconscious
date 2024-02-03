"use client";

import { addAuthorAction } from "@/lib/actions";
import AddButton from "./AddButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { AuthorRecord } from "@/db";

const initialState: Omit<AuthorRecord, "id"> = {
  name: "",
};

export default function AddAuthorForm() {
  const { pending } = useFormStatus();
  const [_, formAction] = useFormState(addAuthorAction, initialState);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        formAction(formData);
        ref.current?.reset();
      }}
      className="flex flex-col gap-2"
    >
      <Text className="text-neon uppercase">Add author</Text>
      <Input
        disabled={pending}
        id="name"
        name="name"
        label="Author"
        type="text"
        size="lg"
        hideLabel
        required
        placeholder="Name"
        className="w-full"
      />
      <AddButton />
    </form>
  );
}
