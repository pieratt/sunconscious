"use server";

export async function createUser(formData: FormData) {
  const rawFormData = {
    username: formData.get("username"),
  };

  console.log(rawFormData);
}
