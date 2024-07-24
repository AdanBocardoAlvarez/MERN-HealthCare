export interface IAdminPanel {
  __v: number | null;
  deleted_at: string | null;
  updated_at: string | null;
  created_at: string | null;
  active_policy: number | string | null;
  active_tc: number | string | null;
  content: string;
  name: string;
  _id: string;
  consultant_name: string;
  complaint_type: string;
  title: string;
  client_name: string;
  additional_information: string;
  quote_title: string;
  author_name: string;
  status: number;
  Disorders: IBlogDisorder[];
  Keyword: IBlogKeyword[];
  Objectives: IBlogObjective[];
  SlotTime: number;
  data: ConsultationData;
  count: number;
  fees: number | Number;
}

interface IWaitingUserlist {
  __v: number | null;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  updated_at: string | null;
  created_at: string | null;
}


interface IContactUSlist {
  __v: number | null;
  _id: string;
  email: string;
  updated_at: string | null;
  created_at: string | null;
}

type ConsultationData = {
  _id: string;
  ConsultantID: string;
  fees: any;
  status: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

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

export type IAdminAllComplaint = {
  _id: string;
  raised_by: string;
  raised_against: string;
  complaint_type: string;
  action_type: null | string | number;
  status: number;
  decision_favour: number;
  desc: null | string;
  additional_details: string;
  attachment: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  __v: number;
  raisedByClientName: ClientName[];
  againstClientName: ClientName[];
  raisedByConsultantName: ConsultantName[];
  againstConsultantName: ConsultantName[];
  complaintType: ComplaintType[];
};

type ClientName = {
  _id: string;
  given_name: string;
};

type ConsultantName = {
  _id: string;
  given_name: string;
};

type ComplaintType = {
  name: string;
};

export type IPostComplaint = {
  status: number | string;
  action_type: number | string;
  decision_favour: string | number;
  desc: string;
};

export type IGetComplaintRecord = {
  _id: string;
  action_type: null | string | number;
  status: null | string | number;
  decision_favour: null | string | number;
  desc: null | string;
};
