export enum Area {
  Mystery = "MYSTERY",
  Self = "SELF",
  Wealth = "WEALTH",
  Communication = "COMMUNICATION",
  Home = "HOME",
  Creativity = "CREATIVITY",
  Health = "HEALTH",
  Partners = "PARTNERS",
  Loss = "LOSS",
  Philosophy = "PHILOSOPHY",
  Purpose = "PURPOSE",
  Network = "NETWORK",
}

export enum WisdomType {
  Theory = "THEORY",
  Practice = "PRACTICE",
}

export enum Era {
  Current = "CURRENT",
  Scientific = "SCIENTIFIC",
  Medieval = "MEDIEVAL",
  Classical = "CLASSICAL",
  Prehistoric = "PREHISTORIC",
}

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
  addedDate: Date;
  areas: Area[];
  type: WisdomType;
}
