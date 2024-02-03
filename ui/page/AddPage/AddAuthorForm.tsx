"use client";

import { addAuthorAction } from "@/lib/actions";
import AddButton from "./AddButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";

export default function AddAuthorForm() {
  const { pending } = useFormStatus();
  const [formState, formAction] = useFormState(addAuthorAction, { ok: true });
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
        className="w-full text-white"
      />
      <AddButton />
      {formState && !formState.ok ? (
        <Text size="xs" className="text-red-600">
          {formState.message}
        </Text>
      ) : null}
    </form>
  );
}
