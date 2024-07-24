export type IFavorite = {
  authurId: string[];
  keyword: string[];
  disorder: string[];
  objective: string[];
};

export interface IRecord {
  _id: string;
  name: string;
}

export interface IAuthor {
  _id: string;
  name: string;
  status: number;
  record: IRecord[];
}

export interface IDisorder {
  status: number;
  Disorders: Disorder[];
  Keyword: Keyword[];
  Objectives: Objective[];
}

export interface Disorder {
  _id: string;
  name: string;
}

export interface Keyword {
  _id: string;
  name: string;
}

export interface Objective {
  _id: string;
  name: string;
}
