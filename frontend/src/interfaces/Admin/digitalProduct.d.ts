export interface IDigitalProduct {
  _id: string;
  title: string;
  author_name: string;
  des: string;
  status: number;
  date:string;
  subtitletitle:string;
  image:string;
  pdf:string;
  AuthorName:{
    _id:string;
    given_name:string
  }[];
  state:{}[]

  authorDetail:string[];
  content:string;
 created_at:string;
 keywords:string[];

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


