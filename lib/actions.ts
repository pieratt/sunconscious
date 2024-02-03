"use server";

import { createAuthor, createSource } from "@/db";
import { revalidatePath } from "next/cache";

export async function addAuthorAction(prevState: any, formData: FormData) {
  const name = (formData.get("name") || "") as string;

  try {
    await createAuthor({ name });
    revalidatePath("/add");
  } catch (err) {
    console.error(err);
  }
  return { name };
}

export async function addSourceAction(prevState: any, formData: FormData) {
  const title = (formData.get("title") || "") as string;
  const authors = formData.getAll("authors") as string[];
  const url = (formData.get("url") || undefined) as string | undefined;

  const source = {
    title: title,
    authors: authors.filter((author) => author !== ""),
    url,
  };

  try {
    await createSource(source);
    revalidatePath("/add");
  } catch (err) {
    console.error(err);
  }
  return source;
}

export async function addWisdomAction(prevState: any, formData: FormData) {
  console.log("addWisdomAction", formData);
  return {};
}
