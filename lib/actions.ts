"use server";

import { createAuthor, createSource, createWisdom } from "@/db";
import { revalidatePath } from "next/cache";
import {
  cleanAddAuthorInput,
  cleanSourceInput,
  cleanWisdomInput,
} from "./clean";

export async function addAuthorAction(_: any, input: FormData) {
  const author = cleanAddAuthorInput(input);

  try {
    await createAuthor(author);
    revalidatePath("/add");
  } catch (err) {
    console.error(err);
  }
  return author;
}

export async function addSourceAction(_: any, input: FormData) {
  const source = cleanSourceInput(input);

  try {
    await createSource(source);
    revalidatePath("/add");
  } catch (err) {
    console.error(err);
  }
  return source;
}

export async function addWisdomAction(_: any, input: FormData) {
  const wisdom = cleanWisdomInput(input);

  try {
    await createWisdom(wisdom);
    revalidatePath("/add");
  } catch (err) {
    console.error(err);
  }
  return wisdom;
}
