export interface IQuote {
  status: number;
  active_policy?: number;
  _id: string;
  quote_title: string;
  author_name: string;
}

export type IWebSetting = {
  id?: string;
  web_title: string;
  domain_name_without_extension: string;
  web_logo: File | string;
  footer_logo: File | string;
  email_logo: File | string;
  fab_icon: File | string;
  web_tw: string;
  web_yt: string;
  web_insta: string;
  web_linkedin: string;
  web_legal_name: string;
};
