"use client";

import { Button } from "@/ui/common/Button";
import { useFormStatus } from "react-dom";

export default function CreateUserButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit">
      {pending ? "Creating..." : "Create User"}
    </Button>
  );
}
