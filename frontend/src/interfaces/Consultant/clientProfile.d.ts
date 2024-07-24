export type IClientSIngleProfile = {
  _id: string;
  title: string;
  unique_code: string;
  family_name: string;
  given_name: string;
  gender: string;
  DOB: string;
  email: string;
  contact_number: number | string;
  contact_number_isd: string;
  preferred_type: string[];
  verified_status: number;
  active_status: number;
  health_assessment?: string;
  consent_form?: string;
  BasicDetails: {
    _id: string;
    clientUserId: string;
    Correspondence_language: string;
    spoken_language: string[];
    profession: string;
    country_of_birth: string;
    nationality: string;
    house_number: string;
    street_name: string;
    street_name2: string;
    postal_code: 342001;
    profile_image: string;
    currency_used: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    __v: 0;
    countryOfBirth: name[];
    CorrespondenceLanguage: name[];
    nationalitys: name[];
    CountryOfResidence: string;
    City: string;
  };
  SpokenLanguageName: name[];
};

type name = {
  name: string;
};
