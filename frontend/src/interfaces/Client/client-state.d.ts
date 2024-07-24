type IConsultantDetails = {
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
};

export type IClienttBooking = {
  consultant_bookid: string;
  amount: string;
  fees: string;
  book_date: string;
  book_time: string;
  pdf_path: string | null;
  orderId: string | null;
  paymentId: string | null;
  signature: string | null;
  ConsultantDetails: IConsultantDetails[];
  ProfileDetails: string[];
};

export type IClientComplaintPostType = {
  raised_against: string;
  complaint_type: string;
  attachment: File | string;
  additional_details: string;
};
