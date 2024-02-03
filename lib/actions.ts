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
    return { ok: true };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return { ok: false, message: err.message };
    }
    return { ok: false };
  }
}

export async function addSourceAction(_: any, input: FormData) {
  const source = cleanSourceInput(input);

  try {
    await createSource(source);
    revalidatePath("/add");
    return { ok: true };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return { ok: false, message: err.message };
    }
    return { ok: false };
  }
}

export async function addWisdomAction(_: any, input: FormData) {
  const wisdom = cleanWisdomInput(input);

  try {
    await createWisdom(wisdom);
    revalidatePath("/add");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return { ok: false, message: err.message };
    }
    return { ok: false };
  }
}
