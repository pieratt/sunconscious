"use server";

import { createAuthor } from "@/db";

export async function addAuthorAction(prevState: any, formData: FormData) {
  const newAuthorName = (formData.get("authorName") || "") as string;

  if (!newAuthorName || newAuthorName.length < 3) {
    console.error("Names must be at least 3 characters long.");
    return;
  }

  try {
    const resp = await createAuthor(newAuthorName);
  } catch (err) {
    console.error(err);
  }
  return { authorName: newAuthorName };
}
