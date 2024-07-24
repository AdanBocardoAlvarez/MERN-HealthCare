import { Link, useNavigate } from 'react-router-dom';
import RegisterPage from '../../assets/img/client-reg-bg.jpg';
import { Button, Input, Form, Radio, Select, Checkbox } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import './Client-Sign-up.css';

import {
    DefaultGenderValues,
    DefaultTitleValues,
    TimeZoneList,
    radioStyle
} from '../../utils/comman';
import { useEffect, useId, useState } from 'react';
import { openNotificationWithIcon } from '../components/Toast';
import { ClientApi } from '../../api/api';
import { useGetCity, useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import WebLogo from '../../layout/components/logo/WebLogo';
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
    contact_number_whatapp: number;
    preferred_type: string;
    country_of_residence: string;
    city: string;
    password: string;
    confirm_password: string;
    otp: number;
    accept_tc_pp: boolean;
    accept_pp: boolean;
    timezone: string;
    mobile_otp?: number;
    email_otp?: number;
};

const FormItem = Form.Item;
const Option = Select.Option;
const CheckBoxGroup = Checkbox.Group;

const ClientSignUp = () => {

    const id = useId();
    const id2 = useId();

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [isLoading, setisLoading] = useState(false)
    const [Country] = useGetCountry('get-country');
    const [City] = useGetCity('get-city');

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ mode: 'onTouched' });


    const submitData = (data) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key] || '');
        }

        setisLoading(true)
        ClientApi.PostRegister(params, 'sign-up')
            .then((datas) => {
                const message = datas.message;
                setisLoading(false)
                reset()
                openNotificationWithIcon({ type: 'success', message: message });
                navigate('/public/client/sign-in');
            })
            .catch((err) => {
                setisLoading(false)
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });

    }

    const country_of_res = watch('country_of_residence');

    const filledFields = watch(['accept_tc_pp', 'accept_pp']);
    useEffect(() => {
        filledFields ? setDisableSubmit(false) : setDisableSubmit(true);
    }, [filledFields]);

    const sendMobileOTP = async () => {
        const phoneNumber = watch("contact_number");
        const contact_number_isd = watch("contact_number_isd");

        if (!phoneNumber) { return openNotificationWithIcon({ type: 'error', message: 'Mobile Number is Required' }); }
        if (!contact_number_isd) { return openNotificationWithIcon({ type: 'error', message: 'Country Code is Required' }); }

        const formData = new URLSearchParams();
        formData.append('number', phoneNumber.toString())
        formData.append('contact_number_isd', contact_number_isd.toString())

        ClientApi.createPost(formData, 'send-mobile-otp')
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
    }

    const sendEmailOTP = async () => {
        const email = watch("email");
        if (!email) { return openNotificationWithIcon({ type: 'error', message: 'Email is Required' }); }

        const formData = new URLSearchParams();
        formData.append('email', email);

        ClientApi.createPost(formData, 'send-email-otp')
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
    }

    return (
        <div className="row registration">
            <div className="col-lg-8 overflow-auto vh-100 scrollbar-none">
                <div className="container-lg px-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <Form onSubmitCapture={handleSubmit(submitData)} layout='vertical'>
                                <div className='row'>
                                    <div className="col-12">
                                        <div className="content-box pt-4 pb-2">
                                            <WebLogo />
                                        </div>
                                        <h1 className='h3 fw-bold text-dark mt-0'>Client Registration</h1>
                                    </div>
                                    <div className="col-sm-12 col-md-12">
                                        <FormItem label={t('auth.title')} required>
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

                                    <div className='col-sm-6 col-md-6'>
                                        <FormItem label={t('name')} required>
                                            <Controller
                                                render={({ field }) => (
                                                    <Input {...field} type='text' placeholder={t('name')} className='mb-3' />
                                                )}
                                                name='given_name'
                                                control={control}
                                                rules={{
                                                    required: 'Name is Required'
                                                }}
                                            />
                                            <Controller
                                                render={({ field }) => (
                                                    <Input {...field} type='text' placeholder={t('auth.last-name')} />
                                                )}
                                                name='family_name'
                                                control={control}
                                                rules={{
                                                    required: 'Last Name is Required'
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.given_name?.message}</span>{' '} <span className='text-danger mb'>{errors.family_name?.message}</span>
                                        </FormItem>

                                        <FormItem label={t('auth.gender')} required>
                                            <Controller
                                                render={({ field }) => (
                                                    <Radio.Group {...field} className='d-flex flex-wrap gap-1 custom-check justify-content-around'>
                                                        {DefaultGenderValues.map(({ name, ids, index, value }) => <div key={ids} className='px-2' style={{ width: '45%', minWidth: 160 }}>
                                                            <label key={index} className={`btn btn-custom-check ${value === field.value ? 'border-primary' : ''}`} htmlFor={ids}>{t(`auth.${name}`)}</label>
                                                            <Radio style={radioStyle} className='d-none' id={ids} value={value}></Radio>
                                                        </div>)}
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

                                        <FormItem label={t('auth.date-of-birth')} required>
                                            <Controller
                                                render={({ field }) => <Input {...field} type='date' placeholder={t('auth.date-of-birth')} className="input-date" />}
                                                name='DOB'
                                                control={control}
                                                rules={{
                                                    required: 'Date of Birth is Required'
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.DOB?.message}</span>{' '}
                                        </FormItem>

                                        <FormItem label={t('password')} required>
                                            <Controller
                                                render={({ field }) => <Input.Password {...field} maxLength={200} placeholder={t('password')} />}
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

                                        <FormItem label={t('auth.confirm-password')} required>
                                            <Controller
                                                render={({ field }) => <Input.Password {...field} maxLength={200} placeholder={t('auth.confirm-password')} />}
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

                                    <div className='col-sm-6 col-md-6'>
                                        <FormItem label={t('auth.contact-number')} required>
                                            <div className="input-group mb-2">
                                                <Controller
                                                    render={({ field }) => (
                                                        <select  {...field} className='ant-input first' aria-label='ISD Code' >
                                                            {Country?.map((res) => <option key={res._id} value={res.isdcode}>{res.isdcode}</option>)}
                                                        </select>
                                                    )}
                                                    name='contact_number_isd'
                                                    defaultValue='+91'
                                                    control={control}
                                                    rules={{
                                                        required: 'ISD Code is Required'
                                                    }}
                                                />

                                                <Controller
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type='number'
                                                            maxLength={20}
                                                            className='mb-2 middle'
                                                            placeholder={t('auth.contact-number')}

                                                        />
                                                    )}
                                                    name='contact_number'
                                                    control={control}
                                                    rules={{
                                                        required: 'Contact Number is Required.'
                                                    }}
                                                />
                                                <Button typeof="button" onClick={sendMobileOTP} ghost type='primary' className='btn end'>{t('auth.verify')}</Button>
                                            </div>

                                            <Controller
                                                render={({ field }) => <Input {...field} type='text' maxLength={5} placeholder={t('auth.mobile-otp')} />}
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
                                                    required: 'Mobile OTP is Required',
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.mobile_otp?.message}</span>
                                        </FormItem>

                                        <FormItem label={t('email')} required>
                                            <div className="mb-2 input-group">
                                                <Controller
                                                    render={({ field }) => <Input {...field} type='text' placeholder={t('email')} className='first w-100' />}
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
                                                <Button typeof="button" onClick={sendEmailOTP} ghost type='primary' className='btn end'>{t('auth.verify')}</Button>
                                            </div>
                                            <Controller
                                                render={({ field }) =>  <Input {...field} type='text' maxLength={5} placeholder={t('auth.email-otp')} />}
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
                                            <span className='text-danger mb'>{errors.email?.message}</span>{' '} <span className='text-danger mb'>{errors.email_otp?.message}</span>
                                        </FormItem>

                                        <FormItem label='Preferred type of contact' required>
                                            <Controller
                                                render={({ field: { onChange } }) => (
                                                    <CheckBoxGroup
                                                        onChange={onChange}
                                                        className='custom-check'
                                                        options={[
                                                            { label: t('auth.sms'), value: '1' },
                                                            { label: t('email'), value: '2' }
                                                        ]}
                                                    />
                                                )}
                                                name='preferred_type'
                                                control={control}
                                                rules={{
                                                    required: 'Preferred type of contact is Required'
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.preferred_type?.message} </span>
                                        </FormItem>

                                        <FormItem label={t('country')} required>
                                            <Controller
                                                render={({ field }) => (
                                                    <Select {...field} placeholder={t('country')} className='mb-2 md-0' >
                                                        {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                                    </Select>
                                                )}
                                                name='country_of_residence'
                                                control={control}
                                                rules={{
                                                    required: 'Country is Required'
                                                }}
                                            />
                                            <span className='text-danger mb'>{errors.country_of_residence?.message}</span>{' '}
                                        </FormItem>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <FormItem label={t('city')} required>
                                                    <Controller
                                                        render={({ field }) => (
                                                            <Select {...field} placeholder={t('city')} className='mb-2 md-0'  >
                                                                {City?.filter(row => row.countryId === country_of_res)?.map((res) => (
                                                                    <Option key={res._id} value={res._id}>
                                                                        {res.name}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        )}
                                                        name='city'
                                                        control={control}
                                                        rules={{
                                                            required: 'City is Required'
                                                        }}
                                                    />
                                                    <span className='text-danger mb'>{errors.city?.message}</span>{' '}
                                                </FormItem>
                                            </div>
                                            <div className="col-lg-6">
                                                <FormItem label={t('auth.timezone')} required>
                                                    <Controller
                                                        render={({ field }) => (
                                                            <Select   {...field} placeholder={t('auth.timezone')} className='mb-2 md-0'>
                                                                {TimeZoneList?.map((res) => <Option key={res.value} value={res.value}>{res.name}</Option>)}
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
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-12'>
                                        <FormItem className='mb-1'>
                                            <div className='d-flex align-items-center'>
                                                <Controller
                                                    render={({ field }) => <Checkbox id={id} {...field} />}
                                                    name='accept_tc_pp'
                                                    control={control}
                                                    rules={{
                                                        required: 'Terms & conditions is Required'
                                                    }}
                                                />
                                                <label htmlFor={id} className='mx-4 my-0 p-0'>
                                                    <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}${t('footer.terms-doc')}`}> {t('auth.accept-terms-conditions')}</a>
                                                </label>
                                            </div>
                                            <span className='text-danger mb'>{errors.accept_tc_pp?.message}</span>{' '}
                                        </FormItem>

                                        <FormItem>
                                            <div className='d-flex align-items-center'>
                                                <Controller
                                                    render={({ field }) => <Checkbox id={id2} {...field} />}
                                                    name='accept_pp'
                                                    control={control}
                                                    rules={{
                                                        required: 'Privacy Policy is Required'
                                                    }}
                                                />
                                                <label htmlFor={id2} className='mx-4'>
                                                    <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}${t('footer.privacy-doc')}`}> {t('auth.accept-privacy-policy')}</a>
                                                </label>
                                            </div>
                                            <span className='text-danger mb'>{errors.accept_pp?.message}</span>{' '}
                                        </FormItem>
                                    </div>
                                    <div className='d-flex justify-content-around buttons-list settings-actions mb-5'>
                                        <Link style={{ minWidth: 160 }} to="/" className='ant-btn css-dev-only-do-not-override-1pem0an border-2 ant-btn-primary ant-btn-background-ghost' >{t('cancel')}</Link>
                                        <Button style={{ minWidth: 160 }} type='primary' loading={isLoading} htmlType='submit' disabled={disableSubmit}>
                                            {t('auth.sign-up')}
                                        </Button>
                                    </div>
                                    <div className='col-12'>
                                        <p className='my-4 text-center fs-5'>
                                            {t('auth.have-acc')} <Link to='/public/client/sign-in'>{t('auth.sign-in')}</Link>
                                        </p>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
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
