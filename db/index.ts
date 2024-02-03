import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import { Area, Era, IWisdom, WisdomType } from "@/lib/types";
import {
  validateCreateAuthor,
  validateCreateSource,
  validateCreateWisdom,
} from "@/lib/validators";

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

export async function fetchEnrichedAuthors(): Promise<AuthorRecord[]> {
  const authorsById = await fetchAuthors();

  return Object.values(authorsById);
}

export async function createAuthor(author: Omit<AuthorRecord, "id">) {
  const authorsById = await fetchAuthors();

  validateCreateAuthor(author, Object.values(authorsById));

  const newAuthor = {
    id: uuidv4(),
    ...author,
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

export async function createSource(source: Omit<SourceRecord, "id">) {
  const sourcesById = await fetchSources();

  validateCreateSource(source, Object.values(sourcesById));

  const newSource: SourceRecord = {
    id: uuidv4(),
    ...source,
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

export async function createWisdom(wisdom: Omit<WisdomRecord, "id">) {
  const wisdomById = await fetchWisdom();

  validateCreateWisdom(wisdom);

  const newWisdom = {
    id: uuidv4(),
    ...wisdom,
  };

  const updatedWisdom = {
    ...wisdomById,
    [newWisdom.id]: newWisdom,
  };

  await fs.writeFile(
    process.cwd() + WISDOM_DB,
    JSON.stringify(updatedWisdom, null, 2)
  );
}
