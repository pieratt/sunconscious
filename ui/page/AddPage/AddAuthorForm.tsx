"use client";

import { addAuthorAction } from "@/lib/actions";
import AddAuthorButton from "./AddAuthorButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";

const initialState = {
  authorName: "",
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
        id="authorName"
        name="authorName"
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
  );
}
