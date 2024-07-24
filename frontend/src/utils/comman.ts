export type Mode = {
    onBlur: 'onBlur';
    onChange: 'onChange';
    onSubmit: 'onSubmit';
    onTouched: 'onTouched';
    all: 'all';
};
export type TitleRadioValues = {
    name: string;
    value: string;
    ids: string;
    index: string;
};

export type Preferred = {
    label: string;
    value: string;
};

export const radioStyle = { display: 'block', height: '30px', lineHeight: '30px' };

export const DefaultTitleValues = [
    { name: 'mr', value: 'Mr', ids: 'Mr', index: '1' },
    { name: 'ms', value: 'Ms', ids: 'Ms', index: '2' },
    { name: 'dr', value: 'Dr', ids: 'Dr', index: '3' }
];

export const DefaultContactValues = [
    { name: 'contact-number', value: '1', ids: '1', index: '1' },
    { name: 'alternative-number', value: '2', ids: '2', index: '2' }
];

export const DefaultGenderValues = [
    { name: 'male', value: 'Male', ids: 'Male', index: '1' },
    { name: 'female', value: 'Female', ids: 'Female', index: '2' },
    { name: 'other', value: 'Other', ids: 'Other', index: '3' },
    { name: 'not-disclosing', value: 'Not Disclosing', ids: 'Not Disclosing', index: '4' }
];


export const TimeZoneList = [
    { name: 'Europe/Paris', value: 'Europe/Paris', },
    { name: 'Asia/Calcutta', value: 'Asia/Calcutta', },
    { name: 'UTC', value: 'UTC', },
    { name: 'America/New_York', value: 'America/New_York', },
];