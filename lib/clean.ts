import { AuthorRecord, SourceRecord, WisdomRecord } from "@/db";
import { Area, Era, WisdomType } from "./types";

export function cleanAddAuthorInput(input: FormData): Omit<AuthorRecord, "id"> {
  const name = (input.get("name") || "") as string;

  const author = { name: name.trim() };

  return author;
}

export function cleanSourceInput(input: FormData): Omit<SourceRecord, "id"> {
  const authors = input.getAll("authors") as string[];

  const title = (input.get("title") || "") as string;
  const url = (input.get("url") || undefined) as string;
  const trimmedUrl = url?.trim();

  const source = {
    title: title.trim(),
    authors: authors.filter((author) => author !== ""),
    url: url?.trim() === "" ? undefined : trimmedUrl,
  };

  return source;
}

export function cleanWisdomInput(input: FormData): Omit<WisdomRecord, "id"> {
  const authors = input.getAll("authors") as string[];
  const areas = input.getAll("areas") as string[];
  const tags = input.get("tags") as string;

  const formattedTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  const wisdom: Omit<WisdomRecord, "id"> = {
    excerpt: (input.get("excerpt") || "") as string,
    source: (input.get("source") || "") as string,
    authors: authors.filter((author) => author !== ""),
    addedBy: "1",
    addedAt: new Date().toISOString(),
    areas: areas.filter((area) => area !== "") as Area[],
    type: (input.get("type") || "") as WisdomType,
    era: (input.get("era") || "") as Era,
    tags: formattedTags,
  };

  return wisdom;
}
