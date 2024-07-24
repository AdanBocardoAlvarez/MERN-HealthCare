import { useEffect, useState } from 'react';
import { Button, Input, Form, Radio, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useGetCountry } from '../../../../hooks/Consultant/useBasicProfile';
import { useGetNationality } from '../../../../hooks/Client/UseClient';
import { IHealthAssesment } from '../../../../interfaces/Client/healthAssesment';
import { ClientApi } from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

type Props = {
    submitText?: string;
};

export type Mode = {
    onBlur: 'onBlur';
    onChange: 'onChange';
    onSubmit: 'onSubmit';
    onTouched: 'onTouched';
    all: 'all';
};

type TitleRadioValues = {
    name: string;
    value: string;
    ids: string;
    index: string;
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};

const DefaultGenderValues = [
    {
        name: 'Male',
        value: 'Male',
        ids: 'Male',
        index: '1'
    },
    {
        name: 'Female',
        value: 'Female',
        ids: 'Female',
        index: '2'
    },
    {
        name: 'Other',
        value: 'Other',
        ids: 'Other',
        index: '3'
    },
    {
        name: 'Not Disclosing',
        value: 'Not Disclosing',
        ids: 'Not Disclosing',
        index: '4'
    }
];

const DefaultSleepValues = [
    {
        name: 'Peaceful',
        value: 'Peaceful',
        ids: 'Peaceful',
        index: '1'
    },
    {
        name: 'Disturbed',
        value: 'Disturbed',
        ids: 'Disturbed',
        index: '2'
    },
    {
        name: 'No sleep i.e. Insomnia',
        value: 'No sleep i.e. Insomnia',
        ids: 'No sleep i.e. Insomnia',
        index: '3'
    },
    {
        name: 'Cannot wake up easily',
        value: 'Cannot wake up easily',
        ids: 'Cannot wake up easily',
        index: '4'
    }
];

const DefaultConsultationValues = [
    {
        name: 'Detox',
        value: 'Detox',
        ids: 'Detox',
        index: '1'
    },
    {
        name: 'Stress management',
        value: 'Stress management',
        ids: 'Stress management',
        index: '2'
    },
    {
        name: 'Personal development',
        value: 'Personal development',
        ids: 'Personal development',
        index: '3'
    },
    {
        name: 'Disorder',
        value: 'Disorder',
        ids: 'Disorder',
        index: '4'
    },
    {
        name: 'Muscular discomfort ',
        value: 'Muscular discomfort ',
        ids: 'Muscular discomfort ',
        index: '5'
    },
    {
        name: 'Energising/Fatigue',
        value: 'Energising/Fatigue',
        ids: 'Energising/Fatigue',
        index: '6'
    },
    {
        name: 'Sleep imbalance',
        value: 'Sleep imbalance',
        ids: 'Sleep imbalance',
        index: '7'
    },
    {
        name: 'Emotional balance',
        value: 'Emotional balance',
        ids: 'Emotional balance',
        index: '8'
    }
];

const DefaultAllergiesValues = [
    {
        name: 'YES',
        value: 'YES',
        ids: 'YES',
        index: '1'
    },
    {
        name: 'NO',
        value: 'NO',
        ids: 'NO',
        index: '2'
    },
    {
        name: 'DO NOT KNOW',
        value: 'DO NOT KNOW',
        ids: 'DO NOT KNOW',
        index: '3'
    }
];

const DefaultLensesValues = [
    {
        name: 'YES',
        value: 'YES',
        ids: 'YES',
        index: '1'
    },
    {
        name: 'NO',
        value: 'NO',
        ids: 'NO',
        index: '2'
    }
];
const DefaultBooleanValues = [
    {
        name: 'YES',
        value: 'YES',
        ids: 'YES',
        index: '1'
    },
    {
        name: 'NO',
        value: 'NO',
        ids: 'NO',
        index: '2'
    }
];

const DefaultTherapistPreferenceValues = [
    {
        name: 'MALE',
        value: 'MALE',
        ids: 'MALE',
        index: '1'
    },
    {
        name: 'FEMALE',
        value: 'FEMALE',
        ids: 'FEMALE',
        index: '2'
    },
    {
        name: 'N/A',
        value: 'N/A',
        ids: 'N/A',
        index: '3'
    }
];

const FormItem = Form.Item;
const Option = Select.Option;
const defaultSubmitText = 'Submit';

const HealthAssesment = ({ submitText = defaultSubmitText }: Props) => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<IHealthAssesment>({ mode: 'onTouched' });
    const token = useSelector((state: AppState) => state.client.Token);
    const [genderValues] = useState<TitleRadioValues[]>(DefaultGenderValues);
    const [consultationValues] = useState<TitleRadioValues[]>(DefaultConsultationValues);
    const [sleepValues] = useState<TitleRadioValues[]>(DefaultSleepValues);
    const [allergiesValues] = useState<TitleRadioValues[]>(DefaultAllergiesValues);
    const [lensesValues] = useState<TitleRadioValues[]>(DefaultLensesValues);
    const [medicationValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [highBloodBressureValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [lowBloodBressureValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [diabetesValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [epilepsyValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [heartDiseaseValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [skinDiseaseValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [asthmaValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [varicoseVeinsValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [headachesMigrainesValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [arthritisRheumatismValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [sunburnValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [claustrophobicValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [phobiasValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [accidentValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [pregnantValues] = useState<TitleRadioValues[]>(DefaultBooleanValues);
    const [therapistPreferenceValues] = useState<TitleRadioValues[]>(
        DefaultTherapistPreferenceValues
    );
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [Country] = useGetCountry('get-country');
    const [Nationality] = useGetNationality('get-nationality');
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [medicationSpecify, setMedicationSpecify] = useState(false);
    const [specifySurgeryIllnessAccident, setSpecifySurgeryIllnessAccident] = useState(false);

    const allergies = watch('allergies');
    const medication = watch('medication');
    const SpecifySurgeryIllnessAccident = watch('surgery_illness_accident');

    useEffect(() => {
        allergies === 'YES' ? setDisableSubmit(true) : setDisableSubmit(false);
        medication === 'YES' ? setMedicationSpecify(true) : setMedicationSpecify(false);
        SpecifySurgeryIllnessAccident === 'YES'
            ? setSpecifySurgeryIllnessAccident(true)
            : setSpecifySurgeryIllnessAccident(false);
    }, [allergies, medication, SpecifySurgeryIllnessAccident]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const submitData = (data: IHealthAssesment) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key]);
        }
        params.append('contact_number_isd', selectedOption.isdcode);
        ClientApi.PostRegister(params, 'health-assessment', token)
            .then((datas) => {
                // const message = datas.message;
                navigate('/public/client/sign-in');
                reset();
            })
            .catch((err) => {
                // const message = err.response.data.message;
                reset();
            });
    };

    return (
        <>
            <Form onSubmitCapture={handleSubmit(submitData)} layout='vertical'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Name'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Name'
                                        autoComplete='off'
                                        aria-label='Name'
                                        aria-describedby='Enter Name'
                                    />
                                )}
                                name='name'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.name?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Treatment'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Treatment'
                                        autoComplete='off'
                                        aria-label='Treatment'
                                        aria-describedby='Enter Treatment'
                                    />
                                )}
                                name='treatment'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.treatment?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Date'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        placeholder='Date'
                                        aria-describedby='Enter Date'
                                        aria-label='Date'
                                    />
                                )}
                                name='date'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.date?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label='Nationality'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Nationality'
                                        className=' mb-0 mb-2'
                                        aria-label='Nationality'
                                        aria-describedby='Select Nationality'
                                    >
                                        {Nationality?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='nationality'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label='Profession'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Enter Profession'
                                        autoComplete='off'
                                        aria-label='Profession'
                                        aria-describedby='Enter Profession'
                                    />
                                )}
                                name='profession'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.profession?.message}</span>{' '} */}
                        </FormItem>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <FormItem label='ISD'>
                                    <div className='dropdown'>
                                        <div className='dropdown-toggle' onClick={toggleDropdown}>
                                            {selectedOption && (
                                                <img
                                                    src={selectedOption.country_flag}
                                                    alt={selectedOption.isdcode}
                                                    className='dropdown-option-image'
                                                />
                                            )}
                                            <span className='dropdown-option-label'>
                                                {selectedOption ? selectedOption.isdcode : 'ISD'}
                                            </span>
                                            <span className='dropdown-caret'></span>
                                        </div>
                                        <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                            {Country.map((option, index) => (
                                                <li key={index} onClick={() => selectOption(option)}>
                                                    <img
                                                        src={option.country_flag}
                                                        alt={option.isdcode}
                                                        className='dropdown-option-image'
                                                    />
                                                    <span className='dropdown-option-label'>{option.isdcode}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <span className='text-danger mb'>{errors.contact_number_isd?.message}</span>{' '} */}
                                </FormItem>
                            </div>
                            <div className='col-md-8'>
                                <FormItem label='Contact Number'>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='number'
                                                maxLength={10}
                                                placeholder='Contact Number'
                                                autoComplete='off'
                                                aria-label='Contact Number'
                                                aria-describedby='Enter Contact Number'
                                            />
                                        )}
                                        name='contactNo'
                                        control={control}
                                        rules={{
                                            required: false
                                        }}
                                    />
                                    {/* <span className='text-danger mb'>{errors.contactNo?.message}</span>{' '} */}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Country Of Residence'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Country of residence'
                                        className=' mb-0 mb-2'
                                        aria-label='Country of residence'
                                        aria-describedby='Select Country of residence'
                                    >
                                        {Country?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='country_of_residence'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.country_of_residence?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Gender'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field} className='pop'>
                                        {genderValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='gender'
                                control={control}
                                rules={{
                                    required: 'Gender is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.gender?.message}</span>
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Date of Birth'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        placeholder='Date'
                                        aria-describedby='Enter Date of Birth'
                                        aria-label='Date'
                                    />
                                )}
                                name='DOB'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.dob?.message}</span> */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Email'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Email'
                                        autoComplete='off'
                                        aria-label='Email'
                                        aria-describedby='Enter Email Address'
                                    />
                                )}
                                name='email'
                                control={control}
                                rules={{
                                    required: 'Email is Required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Enter a valid e-mail address'
                                    }
                                }}
                            />
                            <span className='text-danger mb'>{errors.email?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 '>
                        <FormItem label='Reason for consultation'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {consultationValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='reason_for_consultation'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='How well do you sleep ?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {sleepValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='sleep'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Do you have any allergies?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {allergiesValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='allergies'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    {disableSubmit && (
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label='Specify Allergies'>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea
                                            {...field}
                                            placeholder='Specify Allergies'
                                            autoComplete='off'
                                            aria-label='Specify Allergies'
                                            aria-describedby='Enter Specify Allergies'
                                        />
                                    )}
                                    name='specify_allergies'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.name?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                    )}
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Do you wear any contact lenses?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {lensesValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='lenses'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Are you taking any medication or are under medical supervision?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {medicationValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='medication'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    {medicationSpecify && (
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label='Specify Medication'>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea
                                            {...field}
                                            placeholder='Specify Medication'
                                            autoComplete='off'
                                            aria-label='Specify Medication'
                                            aria-describedby='Enter Specify Medication'
                                        />
                                    )}
                                    name='specify_medication'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.name?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                    )}
                </div>

                <div className='row my-3'>
                    <p>Do you suffer from any following conditions</p>
                    <div className='row'>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='High blood pressure'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {highBloodBressureValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='highBloodPressure'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Low blood pressure'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {lowBloodBressureValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='lowBloodPressure'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Diabetes'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {diabetesValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='diabetes'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Epilepsy'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {epilepsyValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='epilepsy'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Heart disease'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {heartDiseaseValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='heartDisease'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Skin disease'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {skinDiseaseValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='skinDisease'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Asthma'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {asthmaValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='asthma'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Varicose veins '>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {varicoseVeinsValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='varicoseVeins'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Headaches / Migraines'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {headachesMigrainesValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='headaches_migraines'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Arthritis / Rheumatism '>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {arthritisRheumatismValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='arthritis_rheumatism'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-2 '>
                            <FormItem label='Sunburn'>
                                <Controller
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            {sunburnValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>
                                                        {name}
                                                    </Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='sunburn'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Are you claustrophobic?  '>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {claustrophobicValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='claustrophobic'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Do you have any phobias?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {phobiasValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='phobias'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Have you had any recent accident / surgery / illness?'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {accidentValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='surgery_illness_accident'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                    {specifySurgeryIllnessAccident && (
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label='Specify Accident / Surgery / Illness'>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea
                                            {...field}
                                            placeholder='Specify Accident / Surgery / Illness'
                                            autoComplete='off'
                                            aria-label='Specify Accident / Surgery / Illness'
                                            aria-describedby='Enter Specify Accident / Surgery / Illness'
                                        />
                                    )}
                                    name='specify_surgery_illness_accident'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                                {/* <span className='text-danger mb'>{errors.name?.message}</span>{' '} */}
                            </FormItem>
                        </div>
                    )}
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='Pregnant'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {pregnantValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='pregnant'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label='My therapist preference is'>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {therapistPreferenceValues.map(({ name, ids, index, value }) => (
                                            <label key={index} htmlFor={ids}>
                                                <Radio style={radioStyle} id={ids} value={value}>
                                                    {name}
                                                </Radio>
                                            </label>
                                        ))}
                                    </Radio.Group>
                                )}
                                name='therapist_preference'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                            {/* <span className='text-danger mb'>{errors.gender?.message}</span>{' '} */}
                        </FormItem>
                    </div>
                </div>
                <div className='d-flex justify-content-between buttons-list settings-actions'>
                    <Button danger>Cancel</Button>
                    <Button type='primary' htmlType='submit'>
                        {submitText}
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default HealthAssesment;
