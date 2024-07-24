export interface ICourselList {
  id: number;
  TopText: string;
  HeadingText: string;
  Content: string;
  subContent?: string;
  link: string;
  ImageList: Array<string>;
  list?: Array<string>;
}

export interface ITestimonialList {
  id: number;
  Heading: string;
  age: string;
  country: string;
  profession: string;
  Content: string;
  image: string;
}

export interface IPractitioner {
  id: number;
  image: string;
  title: string;
  heading?: string;
  text: string;
}

export interface IBlogList {
  _id: string;
  created_at: string;
  image: string;
  title: string;
  AuthorName: IAuth;
  keywords: string;
  des: string;
}
type IAuth = {
  _id: string;
  given_name: string;
};

export interface IOTPVerification {
  email: string;
  emailOTP: string;
  mobile_number: number;
  mobileOTP: string;
  status: boolean;
  message: string;
}
