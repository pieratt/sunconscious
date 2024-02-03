"use client";

import { addWisdomAction } from "@/lib/actions";
import AddButton from "./AddButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { AuthorRecord, SourceRecord, WisdomRecord } from "@/db";
import { Select } from "@/ui/common/Select";

import { SelectInstance } from "react-select";

const initialState: Omit<WisdomRecord, "id"> = {};

type Option = { value: string; label: string };

export default function AddWisdomForm(props: {
  authors: AuthorRecord[];
  sources: SourceRecord[];
}) {
  const { pending } = useFormStatus();
  const [_, formAction] = useFormState(addWisdomAction, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const sourceRef = useRef<SelectInstance | null>(null);
  const authorRef = useRef<SelectInstance | null>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        formAction(formData);
        ref.current?.reset();
        sourceRef.current?.clearValue();
      }}
      className="flex flex-col gap-2"
    >
      <Text className="text-neon uppercase">Add wisdom</Text>
      <Select<Option>
        // FIXME: react-select types are a pita
        // @ts-expect-error
        ref={sourceRef}
        name="source"
        size="lg"
        id="wisdom-source"
        options={props.sources.map((source) => ({
          label: source.title,
          value: source.id,
        }))}
        label="Source"
        hideLabel
        isClearable
        required
        placeholder="Source"
      />
      <Select<Option>
        // FIXME: react-select types are a pita
        // @ts-expect-error
        ref={authorRef}
        name="author"
        size="lg"
        id="wisdom-author"
        options={props.authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
        label="Author"
        hideLabel
        isClearable
        required
        placeholder="Author"
      />

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
      <Input
        disabled={pending}
        id="url"
        name="url"
        label="Url"
        type="text"
        size="lg"
        hideLabel
        placeholder="URL (optional)"
        className="w-full"
      />

      <AddButton />
    </form>
  );
}
