"use client";

import { Button } from "@/ui/common/Button";
import { useFormStatus } from "react-dom";

export default function AddAuthorButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" className="mt-1">
      {pending ? "Adding..." : "Add"}
    </Button>
  );
}
