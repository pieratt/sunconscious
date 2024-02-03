import { AuthorRecord, SourceRecord, WisdomRecord } from "@/db";
import { WisdomTypeToAttrs } from "./wisdomTypes";
import { EraToAttrs } from "./eras";
import { AreaToAttrs } from "./areas";

function isValidUrl(urlString: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(urlString);
}

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

  if (source.url !== undefined && !isValidUrl(source.url)) {
    throw new Error("Invalid URL");
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
