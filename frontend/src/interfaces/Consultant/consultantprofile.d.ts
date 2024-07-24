interface AddressDetails {
    house_number: string;
    street_name: string;
    street_name2: string;
    postal_code: number;
    CountryOfResidence: { name: string }[];
    City: { name: string }[];
}
interface BankDetails {
    payment_currency: string;
    tax_information: string;
    country: string;
    bank_name: string;
    bank_Agency_name: string;
    agency_address: string;
    swift_code: string;
    account_number: number;
    branch_code: string;
    Iban: string;
    control_key: string;
    account_holder_name: string;
    account_currency: string;
    add_bank_information: string;
    CountryName: any[]; // Define the correct type
}

interface EducationDetails {
    gra_degree_name: string;
    gra_school_name: string;
    gra_year_of_graduation: string;
    gra_num_of_degree: string;
    gra_degree_attachment: string;
    post_degree_name: string;
    post_school_name: string;
    post_year_of_graduation: string;
    post_country: { name: string }[];
    post_num_of_degree: string;
    post_degree_attachment: string;
    edu_specialization: string;
    edu_disorders: string;
    edu_resume: string;
    graduate_country: { name: string }[];
    SpecializationName: { name: string }[];
    disorderName: { name: string }[];
}

interface TimeSlot {
    [day: string]: {
        day: string;
        SlotTime?: number;
        morning: string[];
        afternoon: string[];
        evening: string[];
        night: string[];
    };
}

interface ProfileAndKeyword {
    profile_img: string;
    bio: string;
    professionalCounseling: string;
    intro_vedio: string;
    Objectives: string[];
    keywords: string[];
}

interface BasicDetails {
    spoken_language: string[];
    profession: string;
    nationality: { name: string }[];
    id_number: string;
    id_number_attachment: string;
    year_of_exprience: string;
    year_of_experience?: string;
    criminal_record: string;
    criminal_record_attachment: string;
    countryOfBirth: { name: string }[];
    CorrespondenceLanguage: { name: string }[];
}

type ObjectiveUseByConsultant = string[];

type KeyWordNameUseByConsultant = string[];
type SpokenLanguageName = {
    _id: null | string;
    spokenLanguageName: [
        {
            name: string;
        }
    ];
};

interface feess {
    fees?: number
}

export interface IConsultantProfile {
    _id: string;
    title: string;
    unique_code: string;
    family_name: string;
    given_name: string;
    document?: string;
    gender: string;
    DOB: string;
    email: string;
    contact_number: number;
    alternative_number: number;
    contact_number_isd: string;
    alternative_number_isd: string;
    contact_number_whatapp: number;
    preferred_type: string[];
    verified_status: number;
    active_status: number;
    BasicDetails: BasicDetails[];
    AddressDetails: AddressDetails[];
    BankDetails: BankDetails[];
    EducationDetails: EducationDetails[];
    TimeSlot: TimeSlot[];
    ProfileAndKeyword: ProfileAndKeyword[];
    ObjectiveUseByConsultant: ObjectiveUseByConsultant[];
    KeyWordNameUseByConsultant: KeyWordNameUseByConsultant[];
    fees: Number[];
    Fees?: [];
    consultantFees?: feess[];
    consultantDegrees: any[];
    SpokenLanguageName: SpokenLanguageName[];
}

export type IGetProfileAndKeyword = {
    _id: string;
    profile_img: string;
    bio: string;
    intro_vedio: string;
    keywords: string[];
    Objectives: string[];
};

export type IGetBasicProfile = {
    consultantUserId: string;
    Correspondence_language: string;
    spoken_language: Array<string>;
    profession: string;
    country_of_birth: string;
    nationality: string;
    id_number: string;
    id_number_attachment: string;
    criminal_record: string;
    criminal_record_attachment: string;
};

export type IGetBankDetails = {
    payment_currency: string;
    tax_information: string;
    country: string;
    bank_name: string;
    bank_Agency_name: string;
    agency_address: string;
    swift_code: string;
    account_number: number;
    branch_code: string;
    Iban: string;
    control_key: string;
    account_holder_name: string;
    account_currency: string;
    add_bank_information: string;
    consultant_bankUser: string;
};

export type IGetEducationDetails = {
    userEducation: string;
    gra_degree_name: string;
    gra_school_name: string;
    gra_year_of_graduation: string;
    gra_country: string;
    gra_num_of_degree: string;
    gra_degree_attachment: string;
    post_degree_name: string;
    post_school_name: string;
    post_year_of_graduation: string;
    post_country: string;
    post_num_of_degree: string;
    post_degree_attachment: string;
    edu_specialization: string[];
    edu_disorders: string[];
    edu_resume: string;
};

export type IGetMyAllCerificate = {
    _id: string;
    userCertificate: string;
    name: string;
    certificate_name: string;
    year_of_certificate: string;
    num_of_certificate: string;
    certificate_attachment: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    __v: 0;
};
