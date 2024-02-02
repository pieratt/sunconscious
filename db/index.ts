import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import { Area, Era, IWisdom, WisdomType } from "@/lib/types";

const WISDOM_DB = "/db/wisdom.json";
const USERS_DB = "/db/users.json";
const SOURCES_DB = "/db/sources.json";
const AUTHORS_DB = "/db/authors.json";

export interface WisdomRecord {
  id: string;
  excerpt: string;
  source: string;
  authors: string[];
  addedBy: string;
  addedAt: string;
  areas: Area[];
  type: WisdomType;
  era: Era;
  tags: string[];
}

export interface UserRecord {
  id: string;
  username: string;
}

export interface SourceRecord {
  id: string;
  title: string;
  url?: string;
  authors: string[];
}

export interface AuthorRecord {
  id: string;
  name: string;
}

export async function fetchWisdom() {
  const file = await fs.readFile(process.cwd() + WISDOM_DB, "utf8");
  return JSON.parse(file) as Record<string, WisdomRecord>;
}

export async function fetchUsers() {
  const file = await fs.readFile(process.cwd() + USERS_DB, "utf8");
  return JSON.parse(file) as Record<string, UserRecord>;
}

export async function fetchSources() {
  const file = await fs.readFile(process.cwd() + SOURCES_DB, "utf8");
  return JSON.parse(file) as Record<string, SourceRecord>;
}

export async function fetchAuthors() {
  const file = await fs.readFile(process.cwd() + AUTHORS_DB, "utf8");
  return JSON.parse(file) as Record<string, AuthorRecord>;
}

export async function fetchEnrichedWisdom(): Promise<IWisdom[]> {
  const wisdomById = await fetchWisdom();
  const usersById = await fetchUsers();
  const sourcesById = await fetchSources();
  const authorsById = await fetchAuthors();

  const wisdomArray = Object.values(wisdomById);

  return wisdomArray
    .map((wisdom) => {
      return {
        id: wisdom.id.toString(),
        excerpt: wisdom.excerpt,
        source: sourcesById[wisdom.source],
        authors: wisdom.authors.map((authorId) => authorsById[authorId]),
        addedBy: usersById[wisdom.addedBy],
        addedAt: wisdom.addedAt,
        areas: wisdom.areas,
        type: wisdom.type,
        era: wisdom.era,
        tags: wisdom.tags,
      };
    })
    .sort((a, b) => {
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });
}

export async function createAuthor({ name }: Omit<AuthorRecord, "id">) {
  const authorsById = await fetchAuthors();
  const authorNames = Object.values(authorsById).map((author) =>
    author.name.toLowerCase()
  );

  if (name === "") {
    throw new Error("Author name cannot be empty");
  }

  if (authorNames.includes(name.toLowerCase())) {
    throw new Error("Author already exists");
  }

  const newAuthor = {
    id: uuidv4(),
    name,
  };

  const updatedAuthors = {
    ...authorsById,
    [newAuthor.id]: newAuthor,
  };

  await fs.writeFile(
    process.cwd() + AUTHORS_DB,
    JSON.stringify(updatedAuthors, null, 2)
  );
}

export async function createSource({
  title,
  authors,
  url,
}: Omit<SourceRecord, "id">) {
  const sourcesById = await fetchSources();
  const sourceTitles = Object.values(sourcesById).map((source) =>
    source.title.toLowerCase()
  );

  if (title === "") {
    throw new Error("Source title cannot be empty");
  }

  if (sourceTitles.includes(title.toLowerCase())) {
    throw new Error("Source already exists");
  }

  const newSource: SourceRecord = {
    id: uuidv4(),
    title,
    authors,
    url,
  };

  const updatedSources = {
    ...sourcesById,
    [newSource.id]: newSource,
  };

  await fs.writeFile(
    process.cwd() + SOURCES_DB,
    JSON.stringify(updatedSources, null, 2)
  );
}
