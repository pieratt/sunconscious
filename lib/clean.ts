import { AuthorRecord, SourceRecord, WisdomRecord } from "@/db";
import { Area, Era, WisdomType } from "./types";
import { areas } from "./areas";

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

function getAreas(input: FormData): Area[] {
  return areas.reduce((accum: Area[], curr: Area) => {
    if (!!input.get(curr)) {
      return [...accum, curr];
    }

    return accum;
  }, [] as Area[]);
}

export function cleanWisdomInput(input: FormData): Omit<WisdomRecord, "id"> {
  const author = input.get("author") as string;
  const tags = input.get("tags") as string;
  const areas = getAreas(input);

  const formattedTags = tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  const wisdom: Omit<WisdomRecord, "id"> = {
    excerpt: (input.get("excerpt") || "") as string,
    source: (input.get("source") || "") as string,
    authors: [author],
    addedBy: "1",
    addedAt: new Date().toISOString(),
    areas,
    type: (input.get("type") || "") as WisdomType,
    era: (input.get("era") || "") as Era,
    tags: formattedTags,
  };

  return wisdom;
}
