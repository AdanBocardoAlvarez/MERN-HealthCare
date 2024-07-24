export interface ITokenData {
  success?: boolean;
  Token?: string;
  status: boolean;
  message?: string;
  sucess?: boolean;
  verified_status?: number;
  active_status?: number;
  BasicDetails?: number;
  AddressDetails?: number;
  BankDetails?: number;
  CertificateDetail?: number;
  ProfileDetail?: number;
  EducationDetails?: number;
  TimeSlotDetails?: number;
  data?: string;
}

export interface IStatus {
  status: number;
  message: string;
  success?: any;
}
