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

export async function wisdomById() {
  const file = await fs.readFile(process.cwd() + WISDOM_DB, "utf8");
  return JSON.parse(file) as Record<string, WisdomRecord>;
}

export async function usersById() {
  const file = await fs.readFile(process.cwd() + USERS_DB, "utf8");
  return JSON.parse(file) as Record<string, UserRecord>;
}

export async function sourcesById() {
  const file = await fs.readFile(process.cwd() + SOURCES_DB, "utf8");
  return JSON.parse(file) as Record<string, SourceRecord>;
}

export async function authorsById() {
  const file = await fs.readFile(process.cwd() + AUTHORS_DB, "utf8");
  return JSON.parse(file) as Record<string, AuthorRecord>;
}

export async function fetchEnrichedWisdom(): Promise<IWisdom[]> {
  const wisdomRecords = await wisdomById();
  const userRecords = await usersById();
  const sourceRecords = await sourcesById();
  const authorRecords = await authorsById();

  const wisdomArray = Object.values(wisdomRecords);

  return wisdomArray.map((wisdom) => {
    return {
      id: wisdom.id.toString(),
      excerpt: wisdom.excerpt,
      source: sourceRecords[wisdom.source],
      authors: wisdom.authors.map((authorId) => authorRecords[authorId]),
      addedBy: userRecords[wisdom.addedBy],
      addedAt: wisdom.addedAt,
      areas: wisdom.areas,
      type: wisdom.type,
      era: wisdom.era,
      tags: wisdom.tags,
    };
  });
}
