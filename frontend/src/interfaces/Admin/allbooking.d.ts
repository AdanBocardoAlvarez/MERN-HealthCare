export type AllBooking = {
  _id: string;
  consultant_bookid: string;
  client_bookid: string;
  amount: string;
  fees: string;
  book_date: string;
  book_time: string;
  pdf_path: string | null;
  orderId: string | null;
  paymentId: string | null;
  signature: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  __v: number;
  ConsultantDetails: ConsultantDetail;
  clientDetails: ClientDetail;
};

type ConsultantDetail = {
  _id: string;
  given_name: string;
};

type ClientDetail = {
  _id: string;
  given_name: string;
};
