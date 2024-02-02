"use server";

import { v4 as uuidv4 } from "uuid";
import { fetchAuthors } from "@/db";

export async function addAuthor(formData: FormData) {
  const authorsById = await fetchAuthors();

  const authorNames = Object.values(authorsById).map((author) =>
    author.name.toLowerCase()
  );
  const newAuthorName = (formData.get("author") || "") as string;

  if (newAuthorName === "") {
    throw new Error("Username cannot be empty");
  }

  if (authorNames.includes(newAuthorName.toLowerCase())) {
    throw new Error("Author already exists");
  }

  const newUser = {
    id: uuidv4(),
    username: newAuthorName,
  };

  const updatedAuthors = {
    ...authorsById,
    [newUser.id]: newUser,
  };

  console.log(updatedAuthors);

  // const updatedAuthors = await fs.writeFile();
}
