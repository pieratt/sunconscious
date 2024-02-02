"use server";

import { promises as fs } from "fs";

import { v4 as uuidv4 } from "uuid";
import { fetchUsers } from "@/db";

export async function addUser(formData: FormData) {
  const usersById = await fetchUsers();

  const usernames = Object.values(usersById).map((user) =>
    user.username.toLowerCase()
  );
  const newUsername = (formData.get("username") || "") as string;

  if (newUsername === "") {
    throw new Error("Username cannot be empty");
  }

  if (usernames.includes(newUsername.toLowerCase())) {
    throw new Error("Username already exists");
  }

  const newUser = {
    id: uuidv4(),
    username: newUsername,
  };

  const updatedUsers = {
    ...usersById,
    [newUser.id]: newUser,
  };

  console.log(updatedUsers);

  // const updatedUsers = await fs.writeFile();
}
