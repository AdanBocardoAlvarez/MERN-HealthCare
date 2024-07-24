import './Client-Sign-up.css';
import RegisterPage from '../../assets/img/client-reg-bg.jpg';
import WebLogo from '../../layout/components/logo/WebLogo';
import { useState, useId, useEffect } from 'react';
import { Button, Input, Form, Radio, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'antd/lib/checkbox';
import { openNotificationWithIcon } from '../components/Toast';
import { ConsultantApi } from '../../api/api';
import { useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import { DefaultContactValues, DefaultGenderValues, DefaultTitleValues, TimeZoneList, radioStyle } from '../../utils/comman';
import { useTranslation } from 'react-i18next';

type FormValues = {
    title: string;
    family_name: string;
    given_name: string;
    gender: string;
    DOB: string;
    email: string;
    contact_number_isd: string;
    contact_number: number;
    alternative_number_isd?: string;
    alternative_number?: number;
    contact_number_whatapp: number;
    preferred_type: string;
    password: string;
    confirm_password: string;
    email_otp: string;
    mobile_otp: string;
    timezone: string;
    accept_tc: boolean;
    accept_pp: boolean;
};

const FormItem = Form.Item;
const CheckBoxGroup = Checkbox.Group;

const ClientSignUp = () => {

    const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const id = useId();
    const id2 = useId();

    const [Country] = useGetCountry('get-country');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [isLoading, setisLoading] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isAltDropdownOpen, setIsAltDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionAlt, setSelectedOptionAlt] = useState(null);

    const filledFields = watch(['accept_tc', 'accept_pp']);

    useEffect(() => {
        filledFields ? setDisableSubmit(false) : setDisableSubmit(true);
    }, [filledFields]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const alterToggleDropdown = () => {
        setIsAltDropdownOpen(!isAltDropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };
    const selectOptionAlt = (option) => {
        setSelectedOptionAlt(option);
        setIsAltDropdownOpen(false);
    };

    const submitData = (data: FormValues) => {
        // params.append('contact_number_isd', selectedOption.isdcode);
        if (data.alternative_number === undefined) {
            data = { ...data, alternative_number: 1111111111 };
        }

        const params = new URLSearchParams();
        for (const key in data) {
            if (key === 'accept_tc') {
                params.append(`accept_tc_pp`, `${data[key] ? 1 : 0}`);
            } else {
                params.append(key, data[key] || '');
            }
        }
        params.append('contact_number_isd', selectedOption?.isdcode);
        params.append('alternative_number_isd', selectedOptionAlt !== null ? selectedOptionAlt.isdcode : 'ISD');
        setisLoading(true)
        ConsultantApi.createPost(params, 'sign-up')
            .then((datas) => {
                const message = datas.message;
                setisLoading(false)
                openNotificationWithIcon({ type: 'success', message: message });
                navigate('/public/consultant/sign-in');
                reset();
            })
            .catch((err) => {
                setisLoading(false)
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    useEffect(() => {
        Country.length > 0 && setSelectedOption(Country[0])
        Country.length > 0 && setSelectedOptionAlt(Country[0])
    }, [Country])

    const labell = ({ title, OnClick, verify = '' }) => (
        <div className='d-flex justify-content-between' style={{ width: '100%', cursor: 'pointer' }}>
            <div>{title}</div>
            <div
                style={{
                    padding: '3px 15px',
                    backgroundColor: '#2e8b11',
                    color: 'white',
                    borderRadius: '5px'
                }}
                onClick={OnClick}
            >
                {verify}
            </div>
        </div>
    );

    const handleVerify = (flag) => {
        const phoneNumber = watch("contact_number");
        const contact_number_isd = watch("contact_number_isd", selectedOption?.isdcode || "+91");
        const email = watch("email");

        if (!email && flag === "Email") {
            return openNotificationWithIcon({ type: 'error', message: 'Email is Required' });
        }
        if (!phoneNumber && flag === "Number") {
            return openNotificationWithIcon({ type: 'error', message: 'Number is Required' });
        }

        if (!contact_number_isd && flag === "Number") {
            return openNotificationWithIcon({ type: 'error', message: 'Country Code is Required' });
        }

        const formData = new URLSearchParams();
        if (flag === "Number") {
            formData.append('number', phoneNumber.toString())
            formData.append('contact_number_isd', contact_number_isd.toString())
        }

        flag === "Email" && formData.append('email', email);

        ConsultantApi.createPost(formData, flag === "Number" ? 'send-mobile-otp' : 'send-email-otp')
            .then((datas) => {
                const message = datas.message;
                const status = datas.message;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <div className="row registration">
            <div className="col-lg-8 overflow-auto vh-100 scrollbar-none">
                <div className="container-lg p-5">
                    <div className="pt-4 pb-2">
                        <WebLogo />
                    </div>
                    <h1 className='h4'>{t('auth.registration')}</h1>
                    <p className='text-color-200  mb-5'>{t('auth.for-health-specialist')}</p>
                    <Form onSubmitCapture={handleSubmit(submitData)} layout='vertical'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.title')}>
                                    <Controller
                                        render={({ field }) => (
                                            <Radio.Group {...field}>
                                                {DefaultTitleValues.map(({ name, ids, index, value }) => (
                                                    <label key={index} htmlFor={ids}>
                                                        <Radio style={radioStyle} id={ids} value={value}>{t(`auth.${name}`)}</Radio>
                                                    </label>
                                                ))}
                                            </Radio.Group>
                                        )}
                                        name='title'
                                        control={control}
                                        rules={{
                                            required: 'Title is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.title?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.gender')}>
                                    <Controller
                                        render={({ field }) => (
                                            <Radio.Group {...field}>
                                                {DefaultGenderValues.map(({ name, ids, index, value }, i) => (
                                                    <label key={index} htmlFor={ids}>
                                                        <Radio style={radioStyle} id={ids} value={value}>{t(`auth.${name}`)}</Radio>
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
                                    <span className='text-danger mb'>{errors.gender?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.family-name')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='text'
                                                placeholder={`${t('enter')} ${t('auth.family-name')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='family_name'
                                        control={control}
                                        rules={{
                                            required: 'Family Name / Surname is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.family_name?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.given-name')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='text'
                                                placeholder={`${t('enter')} ${t('auth.given-name')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='given_name'
                                        control={control}
                                        rules={{
                                            required: 'Given Name is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.given_name?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.date-of-birth')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='date'
                                                placeholder={`${t('enter')} ${t('auth.date-of-birth')}`}
                                            />
                                        )}
                                        name='DOB'
                                        control={control}
                                        rules={{
                                            required: 'Date of Birth is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.DOB?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6 mb-3' style={{ position: 'relative' }}>
                                <FormItem label={t('auth.preferred-type-of-contact')} required>
                                    <Controller
                                        render={({ field: { onChange } }) => <CheckBoxGroup className='d-block' onChange={onChange} options={[
                                            { label: t('auth.sms'), value: '1' },
                                            { label: t('email'), value: '2' }
                                        ]} />}
                                        name='preferred_type'
                                        control={control}
                                        rules={{ required: 'Preferred type of contact is Required' }}
                                    />
                                </FormItem>
                                <span style={{ position: 'absolute', bottom: '0px' }} className='text-danger mb'>
                                    {errors.preferred_type?.message}
                                </span>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <FormItem label={t('auth.isd-code')}>
                                            <div className='dropdown'>
                                                <div className='dropdown-toggle' onClick={toggleDropdown}>
                                                    {selectedOption && (
                                                        <img
                                                            src={selectedOption.country_flag}
                                                            alt={selectedOption.isdcode}
                                                            className='dropdown-option-image '
                                                        />
                                                    )}
                                                    <span className='dropdown-option-label'>
                                                        {selectedOption ? selectedOption.isdcode : '+91'}
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
                                            <span className='text-danger mb'>{errors.contact_number_isd?.message}</span>{' '}
                                        </FormItem>
                                    </div>
                                    <div className='col-md-7'>
                                        <FormItem label={labell({
                                            title: t('auth.contact-number'),
                                            OnClick: () => handleVerify("Number"),
                                            verify: t('auth.verify')
                                        })} required>
                                            <Controller
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='number'
                                                        maxLength={20}
                                                        placeholder={`${t('enter')} ${t('auth.contact-number')}`}
                                                        autoComplete='off'
                                                    />
                                                )}
                                                name='contact_number'
                                                control={control}
                                                rules={{
                                                    required: 'Contact Number is Required'
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.contact_number?.message}</span>{' '}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={labell({
                                    title: t('email'),
                                    OnClick: () => handleVerify("Email"),
                                    verify: t('auth.verify')
                                })} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='text'
                                                placeholder={`${t('enter')} ${t('email')}`}
                                                autoComplete='off'
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
                                    <span className='text-danger mb'>{errors.email?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <FormItem label={t('auth.mobile-otp')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='text'
                                                maxLength={5}
                                                placeholder={`${t('enter')} ${t('auth.mobile-otp')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='mobile_otp'
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Please enter a valid OTP number.',
                                            },
                                            minLength: {
                                                value: 5,
                                                message: 'Input OTP length shoud be 5.',
                                            },
                                            maxLength: {
                                                value: 5,
                                                message: 'Input OTP length shoud be 5.',
                                            },
                                            required: 'Mobile OTP is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.mobile_otp?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <FormItem label={t('auth.email-otp')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type='text'
                                                maxLength={5}
                                                placeholder={`${t('enter')} ${t('auth.email-otp')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='email_otp'
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Please enter a valid OTP number.',
                                            },
                                            minLength: {
                                                value: 5,
                                                message: 'Input OTP length shoud be 5.',
                                            },
                                            maxLength: {
                                                value: 5,
                                                message: 'Input OTP length shoud be 5.',
                                            },
                                            required: 'Email OTP is Required',
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.email_otp?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <FormItem label={t('auth.alternative-isd')}>
                                            <div className='dropdown'>
                                                <div className='dropdown-toggle' onClick={alterToggleDropdown}>
                                                    {selectedOptionAlt && (
                                                        <img
                                                            src={selectedOptionAlt.country_flag}
                                                            alt={selectedOptionAlt.isdcode}
                                                            className='dropdown-option-image'
                                                        />
                                                    )}
                                                    <span className='dropdown-option-label'>
                                                        {selectedOptionAlt ? selectedOptionAlt.isdcode : 'ISD'}
                                                    </span>
                                                    <span className='dropdown-caret'></span>
                                                </div>
                                                <ul className={`dropdown-menu ${isAltDropdownOpen ? 'open' : ''}`}>
                                                    {Country.map((option, index) => (
                                                        <li key={index} onClick={() => selectOptionAlt(option)}>
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
                                            <span className='text-danger mb'>{errors.alternative_number_isd?.message}</span>{' '}
                                        </FormItem>
                                    </div>
                                    <div className='col-md-7'>
                                        <FormItem label={t('auth.alternative-number')}>
                                            <Controller
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='number'
                                                        maxLength={20}
                                                        placeholder={`${t('enter')} ${t('auth.alternative-number')}`}
                                                        autoComplete='off'
                                                    />
                                                )}
                                                name='alternative_number'
                                                control={control}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.timezone')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Select   {...field} placeholder={`${t('select')} ${t('auth.timezone')}`} className='mb-2 md-0' aria-label='TimeZone' aria-describedby='Select TimeZone'>
                                                {TimeZoneList?.map((res) => <Select.Option key={res.value} value={res.value}>{res.name}</Select.Option>)}
                                            </Select>
                                        )}
                                        name='timezone'
                                        control={control}
                                        rules={{
                                            required: 'TimeZone is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.timezone?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.contact-number-whatsapp')}>
                                    <Controller
                                        render={({ field }) => (
                                            <Radio.Group {...field}>
                                                {DefaultContactValues.map(({ name, ids, index, value }) => (
                                                    <label key={index} htmlFor={ids}>
                                                        <Radio style={radioStyle} id={ids} value={value}>
                                                            {t(`auth.${name}`)}
                                                        </Radio>
                                                    </label>
                                                ))}
                                            </Radio.Group>
                                        )}
                                        name='contact_number_whatapp'
                                        control={control}
                                        rules={{
                                            required: 'Contact Number is Required'
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.contact_number_whatapp?.message}</span>
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('password')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input.Password
                                                {...field}
                                                maxLength={200}
                                                placeholder={`${t('enter')} ${t('password')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='password'
                                        control={control}
                                        rules={{
                                            required: 'Password is Required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters long.'
                                            },
                                            pattern: {
                                                value:
                                                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
                                                message:
                                                    'Password must contain at least 1 capital letter, 1 small letter, 1 special character, and 1 number *'
                                            }
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.password?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <FormItem label={t('auth.confirm-password')} required>
                                    <Controller
                                        render={({ field }) => (
                                            <Input.Password
                                                {...field}
                                                maxLength={200}
                                                placeholder={`${t('enter')} ${t('auth.confirm-password')}`}
                                                autoComplete='off'
                                            />
                                        )}
                                        name='confirm_password'
                                        control={control}
                                        rules={{
                                            required: 'Confirm Password is Required',
                                            validate: (val) => {
                                                if (watch('password') !== val) {
                                                    return 'Passwords do not match';
                                                }
                                            }
                                        }}
                                    />
                                    <span className='text-danger mb'>{errors.confirm_password?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-12'>
                                <FormItem className='mb-1'>
                                    <div className='d-flex align-items-center'>
                                        <Controller
                                            render={({ field: { onChange, value } }) => <Checkbox checked={value} onChange={onChange} id={id} />}
                                            name='accept_tc'
                                            control={control}
                                            rules={{
                                                required: 'Terms & conditions is Required'
                                            }}
                                        />
                                        <label htmlFor={id} className='mx-4 fs-6 my-0 p-0'>
                                            <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}${t('footer.terms-doc')}`}> {t('auth.accept-terms-conditions')}</a>
                                        </label>
                                    </div>
                                    <span className='text-danger mb'>{errors.accept_tc?.message}</span>{' '}
                                </FormItem>
                            </div>
                            <div className='col-sm-12 col-md-12'>
                                <FormItem>
                                    <div className='d-flex align-items-center '>
                                        <Controller
                                            render={({ field: { onChange, value } }) => <Checkbox checked={value} onChange={onChange} id={id2} />}
                                            name='accept_pp'
                                            control={control}
                                            rules={{
                                                required: 'Privacy Policy is Required'
                                            }}
                                        />
                                        <label htmlFor={id2} className='mx-4 fs-6'>
                                            <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}${t('footer.privacy-doc')}`}> {t('auth.accept-privacy-policy')}</a>
                                        </label>
                                    </div>
                                    <span className='text-danger mb'>{errors.accept_pp?.message}</span>{' '}
                                </FormItem>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between buttons-list settings-actions'>
                            <Button type='primary' htmlType='submit' loading={isLoading} disabled={disableSubmit}>
                                {t('auth.sign-up')}
                            </Button>
                            <Button onClick={() => navigate('/public/sign-in')} danger>{t('cancel')}</Button>
                        </div>
                    </Form>
                </div>
            </div >
            <div className="col-lg-4 d-none d-lg-block">
                <div className='reg-page-bg'>
                    <img src={RegisterPage} alt="Bg" />
                </div>
            </div>
        </div >
    );
};

export default ClientSignUp;
