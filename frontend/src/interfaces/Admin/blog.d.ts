export interface IBlogGet {
  _id: string;
  title: string;
  author_name: string;
  des: string;
  status: number;
  keywords: string[];
  disorder: string[];
  objective: string[];
}

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
  Disorders: IBlogDisorder[];
  Keyword: IBlogKeyword[];
  Objectives: IBlogObjective[];
}

type IBlogDisorder = {
  _id: string;
  name: string;
};

type IBlogKeyword = {
  _id: string;
  name: string;
};

type IBlogObjective = {
  _id: string;
  name: string;
};
