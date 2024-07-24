export interface IPostData {
    message: string;
    status: number;
}

export interface ILang {
    _id: string;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    __v: string;
    status: number;
}

export interface ICountry {
    _id: string;
    name: string;
    isdcode: string;
    country_flag: string;
    status: number;
    cities: Array<[]>;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    __v: number;
}

export interface ICity {
    _id: string;
    countryId: string;
    name: string;
    status: number;
    cities: Array<[]>;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    __v: number;
}

export interface INationality {
    _id: string;
    name: string;
    status: number;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    __v: number;
}

export type UserBasic = {
    title: string;
    family_name: string;
    given_name: string;
    gender: string;
    DOB: string;
    preferred_type: string;
    timezone: string;

    nationality: string;
    spoken_language: Array<string>;
    Correspondence_language: string;
    profession: string;
    country_of_birth: string;
    id_number: string;
    id_number_attachment: File | string;
    year_of_experience: string;
    criminal_record: string;
    criminal_record_attachment: File | string;
};

export type UserAddress = {
    house_number: string;
    street_name: string;
    Correspondence_language: string;
    street_name2: string;
    postal_code: number;
    city: string;
    country_of_residence: string;
};

export type Userbank = {
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
    add_bank_information: File | string;
    consultant_bankUser: string;
};

export type UserEducation = {
    userEducation: string;
    gra_degree_name: string;
    gra_school_name: string;
    gra_year_of_graduation: number | string;
    gra_country: string;
    gra_num_of_degree: string | number;
    gra_degree_attachment: File | string;
    post_degree_name: string;
    post_school_name: string;
    post_year_of_graduation: number | string;
    post_country: string;
    post_num_of_degree: string;
    post_degree_attachment: File | string;
    edu_specialization: Array<string>;
    edu_disorders: Array<string>;
    edu_resume: File | string;
};

export type UserCertificate = {
    _id?: string;
    userCertificate: string;
    name: string;
    certificate_name: string;
    year_of_certificate: string;
    num_of_certificate: string;
    certificate_attachment: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
    __v?: 0;
};

export type UserProfile = {
    bio: string;
    professionalCounseling: string;
    intro_vedio: string;
    keywords: Array<string>;
    Objectives: Array<string>;
    profile_img: File | string;
};

export type ConsultantTiming = {
    day: string;
    noon: string;
    morning: Array<string>;
    afternoon: Array<string>;
    evening: Array<string>;
    night: Array<string>;
    date?: string;
};

export interface ITiming {
    label: string;
    value: string;
}

export interface ITimingPostData {
    Day: string;
    TimeSlot: ConsultantTiming[];
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

export type IGetEducationDetails = {
    _id: string;
    userEducation: string;
    gra_degree_name: string;
    gra_school_name: string;
    gra_year_of_graduation: number;
    gra_country: string;
    gra_num_of_degree: string;
    // gra_degree_attachment: string;
    post_degree_name: string;
    post_school_name: string;
    post_year_of_graduation: string;
    post_country: string;
    post_num_of_degree: string;
    // post_degree_attachment: string;
    edu_specialization: string;
    edu_disorders: string;
    // edu_resume: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    __v: number;
};

export type IGetBasicProfileDetails = {
    _id: string;
    consultantUserId: string;
    Correspondence_language: string;
    spoken_language: string[];
    profession: string;
    country_of_birth: string;
    nationality: string;
    id_number: string;
    id_number_attachment: File;
    year_of_experience: string;
    criminal_record: boolean;
    criminal_record_attachment: File;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    __v: number;
};
