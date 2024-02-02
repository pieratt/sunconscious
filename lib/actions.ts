"use server";

import { createAuthor, createSource } from "@/db";

export async function addAuthorAction(prevState: any, formData: FormData) {
  const name = (formData.get("name") || "") as string;

  if (!name || name.length < 3) {
    console.error("Names must be at least 3 characters long.");
    return;
  }

  try {
    const resp = await createAuthor({ name });
  } catch (err) {
    console.error(err);
  }
  return { name };
}

export async function addSourceAction(prevState: any, formData: FormData) {
  const title = (formData.get("title") || "") as string;
  const authors = formData.getAll("authors") as string[];
  const url = (formData.get("url") || undefined) as string | undefined;

  if (!title || title.length < 3) {
    console.error("Source titles must be at least 3 characters long.");
    return;
  }

  if (authors.length === 0) {
    console.error("At least one author must be selected.");
    return;
  }

  const source = {
    title: title,
    authors,
    url,
  };

  try {
    console.log(source);
    // const resp = await createSource(source);
  } catch (err) {
    console.error(err);
  }
  return source;
}
