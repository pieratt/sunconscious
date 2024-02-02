"use client";

import { addSourceAction } from "@/lib/actions";
import AddAuthorButton from "./AddButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef, useState } from "react";
import { SourceRecord } from "@/db";

const initialState: Omit<SourceRecord, "id"> = {
  title: "",
  authors: [],
};

export default function AddSourceForm() {
  const { pending } = useFormStatus();
  const [_, formAction] = useFormState(addSourceAction, initialState);
  const [numAuthors, setNumAuthors] = useState(2);
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
      <Text className="text-neon uppercase">Add source</Text>
      <Input
        disabled={pending}
        id="title"
        name="title"
        label="Title"
        type="text"
        size="lg"
        hideLabel
        required
        placeholder="Title"
        className="w-full"
      />
      {Array.from({ length: numAuthors }).map((_, i) => (
        <Input
          disabled={pending}
          id={`author-${i}`}
          name="authors"
          label={`Author ${i + 1}`}
          type="text"
          size="lg"
          hideLabel
          required
          placeholder={`Author ${i + 1}`}
          className="w-full"
        />
      ))}
      <AddAuthorButton />
    </form>
  );
}
