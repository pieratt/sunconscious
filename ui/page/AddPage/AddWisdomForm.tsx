"use client";

import { addWisdomAction } from "@/lib/actions";
import AddButton from "./AddButton";
import { Text, TextArea } from "@/ui/common/Typography";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { WisdomRecord } from "@/db";
import { Select } from "@/ui/common/Select";

import { SelectInstance } from "react-select";
import { EraToAttrs, eras } from "@/lib/eras";
import { Area, Era, IAuthor, ISource, WisdomType } from "@/lib/types";
import { WisdomTypeToAttrs, wisdomTypes } from "@/lib/wisdomTypes";

const initialState: Omit<WisdomRecord, "id"> = {
  excerpt: "",
  source: "",
  authors: [],
  addedBy: "1",
  addedAt: new Date().toISOString(),
  areas: [],
  type: "THEORY",
  era: "CURRENT",
  tags: [],
};

type Option = { value: string; label: string };
type EraOption = { value: Era; label: string };
type AreaOption = { value: Area; label: string };
type WisdomTypeOption = { value: WisdomType; label: string };

export default function AddWisdomForm(props: {
  authors: IAuthor[];
  sources: ISource[];
}) {
  const { pending } = useFormStatus();
  const [_, formAction] = useFormState(addWisdomAction, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const sourceRef = useRef<SelectInstance | null>(null);
  const authorRef = useRef<SelectInstance | null>(null);
  const eraRef = useRef<SelectInstance | null>(null);
  const wisdomTypeRef = useRef<SelectInstance | null>(null);

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
        disabled={pending}
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
        disabled={pending}
        placeholder="Author"
      />
      <Select<EraOption>
        // FIXME: react-select types are a pita
        // @ts-expect-error
        ref={eraRef}
        name="era"
        size="lg"
        id="wisdom-era"
        options={eras.map((era) => ({
          label: EraToAttrs[era].name,
          value: era,
        }))}
        label="Era"
        hideLabel
        isClearable
        required
        disabled={pending}
        placeholder="Era"
      />
      <Select<WisdomTypeOption>
        // FIXME: react-select types are a pita
        // @ts-expect-error
        ref={wisdomTypeRef}
        name="type"
        size="lg"
        id="wisdom-type"
        options={wisdomTypes.map((type) => ({
          label: WisdomTypeToAttrs[type].name,
          value: type,
        }))}
        label="Type"
        hideLabel
        isClearable
        required
        disabled={pending}
        placeholder="Type"
      />
      <TextArea
        id="excerpt"
        name="excerpt"
        label="Excerpt"
        size="xl"
        rows={12}
        hideLabel
        required
        placeholder="Enter your text here"
        className="w-full"
      />
      <TextArea
        id="tags"
        name="tags"
        label="Tags"
        size="xl"
        rows={4}
        hideLabel
        placeholder="Tag, tag"
        className="w-full"
      />

      <AddButton />
    </form>
  );
}
