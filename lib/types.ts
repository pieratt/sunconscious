export type Area =
  | "MYSTERY"
  | "SELF"
  | "WEALTH"
  | "COMMUNICATION"
  | "HOME"
  | "CREATIVITY"
  | "HEALTH"
  | "PARTNERS"
  | "LOSS"
  | "PHILOSOPHY"
  | "PURPOSE"
  | "NETWORK";

export type WisdomType = "THEORY" | "PRACTICE";

export type Era =
  | "CURRENT"
  | "SCIENTIFIC"
  | "MEDIEVAL"
  | "CLASSICAL"
  | "PREHISTORIC";

export interface IAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface IUser {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface ISource {
  id: string;
  name: string;
  url?: string;
}

export interface IAttribution {
  source: ISource;
  authors: IAuthor[];
}

export interface IWisdom {
  id: string;
  excerpt: string;
  attribution: IAttribution;
  addedBy: IUser;
  addedAt: string;
  areas: Area[];
  type: WisdomType;
  era: Era;
  tags?: string[];
}
