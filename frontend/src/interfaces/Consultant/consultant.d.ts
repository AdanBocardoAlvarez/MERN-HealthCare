export interface IConsultant {
  status: number;
  _id: string;
  title: string;
  unique_code: string;
  family_name: string;
  given_name: string;
  gender: string;
  DOB: string;
  email: string;
  contact_number: number;
  alternative_number: number;
  contact_number_isd: string;
  alternative_number_isd: string;
  contact_number_whatapp: string;
  preferred_type: Array<number>[];
  verified_status: number;
  active_status: number;
  fees: number;
  SlotTime: number;
}

interface IClientDetails {
  _id: string;
  title: string;
  unique_code: string;
  family_name: string;
  given_name: string;
  gender: string;
  DOB: string;
  email: string;
  contact_number: number;
  contact_number_isd: string;
  preferred_type: string[];
}

export interface IConsultantBooking {
  _id: string;
  client_bookid: string;
  amount: string;
  fees: string;
  book_date: string;
  book_time: string;
  paymentStatus: number;
  pdf_path: string | null;
  ClientDetails: IClientDetails[];
  is_live?: boolean;
}

export interface IBlog {
  _id: any;
  status: number;
  record: {
    _id: string;
    name: string;
  }[];
}

export type IGetAddressDetails = {
  _id: string;
  consultant_address: string;
  house_number: string;
  street_name: string;
  street_name2: string;
  postal_code: number;
  city: string;
  country_of_residence: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  __v: number;
};

export type IGetBasicDetails = {
  _id: string;
  consultantUserId: string;
  Correspondence_language: string;
  spoken_language: string[];
  profession: string;
  country_of_birth: string;
  nationality: string;
  id_number: string;
  id_number_attachment: string;
  year_of_experience: string;
  criminal_record: 'Yes' | 'No'; // Assuming it's a binary choice
  criminal_record_attachment: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  __v: number;
};

export type IGetClientListConsultant = {
  _id: string;
  given_name: string;
};

export type IComplaintTypeConsultant = {
  _id: string;
  name: string;
};

export type IConsultantComplaintPostType = {
  raised_against: string;
  complaint_type: string;
  attachment: File | string;
  additional_details: string;
};

export type IGetConsultanttComplaintList = {
  _id: string;
  action_type: number | null | string;
  status: 0;
  desc: null;
  decision_favour: 0;
  attachment: string;
  raised_byName: Array<string>;
  raised_againstName: Array<string>;
  complaintType: Array<string>;
};
