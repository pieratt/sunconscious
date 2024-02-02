import { promises as fs } from "fs";
import { Area, Era, IWisdom, WisdomType } from "@/lib/types";

const WISDOM_DB = "/db/wisdom.json";
const USERS_DB = "/db/users.json";
const SOURCES_DB = "/db/sources.json";
const AUTHORS_DB = "/db/authors.json";

interface WisdomRecord {
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

interface UserRecord {
  id: string;
  username: string;
}

interface SourceRecord {
  id: string;
  name: string;
  url?: string;
  authors: string[];
}

interface AuthorRecord {
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
