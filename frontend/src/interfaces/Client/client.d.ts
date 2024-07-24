export type IComplaintTypeClient = {
  _id: string;
  name: string;
};

export type IGetConsultantListClient = {
  _id: string;
  given_name: string;
};

export type IGetClientComplaintList = {
  _id: string;
  action_type: number | null | string;
  status: number;
  desc: null;
  decision_favour: number;
  attachment: string;
  raised_byName?: Array<string>;
  raised_againstName?: Array<string>;
  complaintType?: Array<string>;
  consultantName?: Array<string>;
};

export type IGetMyProfile = {
  _id: string;
  title: string;
  unique_code: string;
  family_name: string;
  given_name: string;
  gender: string;
  DOB: string;
  email: string;
  contact_number: 963078941;
  contact_number_isd: string;
  preferred_type: string[];
  ClientDetails: [];
};
