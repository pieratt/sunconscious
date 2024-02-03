"use client";

import { addSourceAction } from "@/lib/actions";
import AddButton from "./AddButton";
import { Input } from "@/ui/common/Input";
import { Text } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef, useState } from "react";
import { AuthorRecord, SourceRecord } from "@/db";
import { Select } from "@/ui/common/Select";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SelectInstance } from "react-select";
import { PlusIcon } from "@heroicons/react/24/outline";

const initialState: Omit<SourceRecord, "id"> = {
  title: "",
  authors: [],
};

type Option = { value: string; label: string };

export default function AddSourceForm(props: { authors: AuthorRecord[] }) {
  const { pending } = useFormStatus();
  const [_, formAction] = useFormState(addSourceAction, initialState);
  const [addlAuthors, setAddlAuthors] = useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const selectRef = useRef<SelectInstance | null>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        formAction(formData);
        ref.current?.reset();
        setAddlAuthors(0);
        selectRef.current?.clearValue();
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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <div className="flex-grow">
            <Select<Option>
              // FIXME: react-select types are a pita
              // @ts-expect-error
              ref={selectRef}
              key={`select-source-author-original`}
              name="authors"
              size="lg"
              id={`author-original`}
              options={props.authors.map((author) => ({
                label: author.name,
                value: author.id,
              }))}
              label={`Author 1`}
              hideLabel
              isClearable
              required
              placeholder="Author 1"
            />
          </div>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              setAddlAuthors(addlAuthors + 1);
            }}
            className="bg-black flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center"
          >
            <PlusIcon className="h-4 w-4 text-stone-400" />
          </button>
        </div>
        {Array.from({ length: addlAuthors }).map((_, i) => (
          <div className="flex gap-2 w-full" key={`select-source-author-${i}`}>
            <div className="flex-grow">
              <Select<Option>
                name="authors"
                size="lg"
                id={`author-${i}`}
                options={props.authors.map((author) => ({
                  label: author.name,
                  value: author.id,
                }))}
                label={`Author ${i + 2}`}
                hideLabel
                isClearable
                required
                placeholder={`Author ${i + 2}`}
              />
            </div>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                setAddlAuthors(addlAuthors - 1);
              }}
              className="bg-black flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center"
            >
              <XMarkIcon className="h-4 w-4 text-stone-400" />
            </button>
          </div>
        ))}
      </div>

      <AddButton />
    </form>
  );
}
