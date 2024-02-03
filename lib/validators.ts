import { AuthorRecord, SourceRecord, WisdomRecord } from "@/db";
import { WisdomType } from "./types";
import { WisdomTypeToAttrs } from "./wisdomTypes";
import { EraToAttrs } from "./eras";
import { AreaToAttrs } from "./areas";

export function validateCreateSource(
  source: Omit<SourceRecord, "id">,
  existing: SourceRecord[]
) {
  const sourceTitles = existing.map((source) => source.title.toLowerCase());

  if (source.title === "") {
    throw new Error("Source title cannot be empty");
  }

  if (sourceTitles.includes(source.title.toLowerCase())) {
    throw new Error("Source already exists");
  }
}

export function validateCreateAuthor(
  author: Omit<AuthorRecord, "id">,
  existing: AuthorRecord[]
) {
  const authorNames = existing.map((author) => author.name.toLowerCase());

  if (author.name === "") {
    throw new Error("Author name cannot be empty");
  }

  if (authorNames.includes(author.name.toLowerCase())) {
    throw new Error("Author already exists");
  }
}

export function validateCreateWisdom(wisdom: Omit<WisdomRecord, "id">) {
  if (wisdom.excerpt === "") {
    throw new Error("Quote cannot be empty");
  }

  if (wisdom.source === "") {
    throw new Error("Source must be selected");
  }

  if (wisdom.areas.length === 0) {
    throw new Error("At least one area must be selected");
  }

  wisdom.areas.forEach((area) => {
    if (!Object.keys(AreaToAttrs).includes(area)) {
      throw new Error(`We don't recognize area "${area}"`);
    }
  });

  if (!Object.keys(WisdomTypeToAttrs).includes(wisdom.type)) {
    throw new Error(`We don't recognize type "${wisdom.type}"`);
  }

  if (!Object.keys(EraToAttrs).includes(wisdom.era)) {
    throw new Error(`We don't recognize era "${wisdom.era}"`);
  }

  const filteredAuthors = wisdom.authors.filter((author) => author !== "");

  if (filteredAuthors.length === 0) {
    throw new Error("Author must be selected");
  }
}
