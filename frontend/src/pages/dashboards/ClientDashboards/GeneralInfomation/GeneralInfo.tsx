import { useEffect, useState } from 'react';
import { Input, Form, Radio, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from 'antd/lib/checkbox';
import { useGetApi, useGetCountry } from '../../../../hooks/Consultant/useBasicProfile';
import { useGetNationality } from '../../../../hooks/Client/UseClient';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { ClientApi } from '../../../../api/api';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { DefaultGenderValues, DefaultTitleValues, TimeZoneList, radioStyle } from '../../../../utils/comman';
import { openNotificationWithIcon } from '../../../components/Toast';
import { currencies } from '../../../../utils/currencies';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

type FormValues = {
    title: string;
    family_name: string;
    profile_image: File;
    given_name: string;
    gender: string;
    DOB: string;
    email: string;
    contact_number_isd: string;
    contact_number: number;
    preferred_type: string[];
    city: string;
    nationality: string;
    profession: string;
    house_number: string;
    street_name: string;
    street_name2: string;
    postal_code: string;
    country_of_residence: string;
    Correspondence_language: string;
    currency_used: string;
    country_of_birth: string;
    timezone: string;
};

const FormItem = Form.Item;
const Option = Select.Option;
const CheckBoxGroup = Checkbox.Group;

const GeneralInfo = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.client.Token);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

    const [profileImage, setProfileImage] = useState<File>();
    const [profilePic, setProfilePic] = useState<string>();
    const [editNumber, setEditNumber] = useState(true);
    const [editEmail, setEditEmail] = useState(true);
    const [Language] = useGetApi('get-languages');
    const [Country] = useGetCountry('get-country');
    const [City] = useGetCountry('get-city');
    const [Nationality] = useGetNationality('get-nationality');

    useEffect(() => {
        (async () => {
            await ClientApi.getMyProfile('get-client-basic-details', token).then(async (Data) => {
                reset(Data)
                setProfilePic(`${process.env.REACT_APP_API_BASE_URL}${Data?.profile_image}`);
            }).catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
        })();
    }, [reset, token]);

    const submitData = (data: FormValues) => {

        const params = new FormData();
        for (const key in data) {
            params.append(`${key}`, data[key]);
        }
        params.append('profile_image', profileImage);
        ClientApi.PostRegister(params, 'client-basic-details', token)
            .then((datas) => {
                const message = datas.message;
                openNotificationWithIcon({ type: 'success', message: message });
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    const labell = ({ title, OnClick }) => (
        <div className='d-flex justify-content-between' style={{ width: '100%' }}>
            <div>{title}</div>
            <div style={{ padding: '3px 15px', backgroundColor: '#2e8b11', color: 'white', borderRadius: '5px' }} onClick={OnClick}>
                {t('edit')}
            </div>
        </div>
    );

    return (
        <>
            <PageHeader title={t('view-profile')} />
            <Form onSubmitCapture={handleSubmit(submitData)} layout='vertical'>
                <div className='mb-5'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('profile-image')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader src={profilePic} setImage={setProfileImage} alt={t('profile-image')} />
                                </div>
                            </FormItem>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label={t('auth.title')}>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        {DefaultTitleValues.map(({ name, ids, index, value }, i) => (
                                            <label key={i} htmlFor={ids}>
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
                    <div className='col-sm-12 col-md-6 '>
                        <FormItem label={t('auth.gender')}>
                            <Controller
                                render={({ field }) => (
                                    <Radio.Group {...field} className='pop'>
                                        {DefaultGenderValues.map(({ name, ids, index, value }, i) => (
                                            <label key={i} htmlFor={ids}>
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
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label={t('auth.family-name')}>
                            <Controller
                                render={({ field }) => <Input {...field} type='text' placeholder={t('auth.family-name')} />}
                                name='family_name'
                                control={control}
                                rules={{
                                    required: 'Enter Family Name / Surname is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.family_name?.message}</span>{' '}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label={t('auth.given-name')}>
                            <Controller
                                render={({ field }) => <Input {...field} type='text' placeholder={t('auth.given-name')} />}
                                name='given_name'
                                control={control}
                                rules={{
                                    required: 'Enter Given Name is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.given_name?.message}</span>{' '}
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label={t('auth.date-of-birth')}>
                            <Controller
                                render={({ field }) => <Input {...field} type='date' placeholder={t('auth.date-of-birth')} />}
                                name='DOB'
                                control={control}
                                rules={{
                                    required: 'Enter Date of Birth is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.DOB?.message}</span>{' '}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label={t('auth.country-of-residence')}>
                            <Controller
                                render={({ field }) => (
                                    <Select {...field} placeholder={t('auth.country-of-residence')} className=' mb-0 mb-2'>
                                        {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                    </Select>
                                )}
                                name='country_of_residence'
                                control={control}
                                rules={{
                                    required: 'Country Of Residence is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.country_of_residence?.message}</span>{' '}
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label={t('auth.nationality')} required>
                            <Controller
                                render={({ field }) => (
                                    <Select {...field} placeholder={t('auth.nationality')} className=' mb-0 mb-2'>
                                        {Nationality?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                    </Select>
                                )}
                                name='nationality'
                                control={control}
                                rules={{
                                    required: "Please select Nationality"
                                }}
                            />
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label={t('profession')} required>
                            <Controller
                                render={({ field }) => <Input {...field} type='text' placeholder={t('profession')} />}
                                name='profession'
                                control={control}
                                rules={{
                                    required: "Please enter Profession."
                                }}
                            />
                            <span className='text-danger mb'>{errors.profession?.message}</span>{' '}
                        </FormItem>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='my-3 h3 font-weight-bold'>{t('address')}</div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('house-number')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('house-number')} />}
                                    name='house_number'
                                    control={control}
                                    rules={{
                                        required: 'House Number is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.house_number?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('street-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('street-name')} />}
                                    name='street_name'
                                    control={control}
                                    rules={{
                                        required: 'Street Name is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.street_name?.message}</span>{' '}
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('street-name-2')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('street-name-2')} />}
                                    name='street_name2'
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('postal-code')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('postal-code')} />}
                                    name='postal_code'
                                    control={control}
                                    rules={{
                                        required: 'Postal Code is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.postal_code?.message}</span>{' '}
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('city')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('city')} className=' md-0 mb-2'>
                                            {City?.map((res) => <Option key={res._id} value={res._id}>{res.name} </Option>)}
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
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('country-of-birth')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('country-of-birth')} className=' mb-0 mb-2'>
                                            {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='country_of_birth'
                                    control={control}
                                    rules={{ required: 'Country of Birth is Required' }}
                                />
                                <span className='text-danger mb'>{errors.country_of_birth?.message}</span>{' '}
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <FormItem label={t('auth.isd-code')}>
                                        <Controller
                                            render={({ field }) => <Input {...field} type='text' placeholder={t('auth.isd-code')} disabled={editNumber} />}
                                            name='contact_number_isd'
                                            control={control}
                                            rules={{ required: 'ISD is Required' }}
                                        />
                                        <span className='text-danger mb'>{errors.contact_number_isd?.message}</span>{' '}
                                    </FormItem>
                                </div>
                                <div className='col-md-9'>
                                    <FormItem label={labell({ title: t('contact-number'), OnClick: () => setEditNumber(!editNumber) })} required >
                                        <Controller
                                            render={({ field }) => <Input {...field} type='number' maxLength={10} placeholder={t('contact-number')} disabled={editNumber} />}
                                            name='contact_number'
                                            control={control}
                                            rules={{ required: 'Contact Number is Required' }}
                                        />
                                        <span className='text-danger mb'>{errors.contact_number?.message}</span>{' '}
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem
                                label={labell({ title: t('email'), OnClick: () => setEditEmail(!editEmail) })} >
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('email')} disabled={editEmail} />}
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
                    </div>
                </div>

                <div className='mb-5'>
                    <div className='mb-3 h3 font-weight-bold'>{t('additional-information')}</div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem name='preferred_type' label={t('auth.preferred-type-of-contact')} required>
                                <Controller
                                    render={({ field }) => <CheckBoxGroup {...field} options={[
                                        { label: t('auth.sms'), value: '1' },
                                        { label: t('email'), value: '2' }
                                    ]} style={{ marginBottom: '20px' }} />}
                                    name='preferred_type'
                                    control={control}
                                    rules={{
                                        required: 'Preferred type of Contact is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.preferred_type?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.language-of-correspondence')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.language-of-correspondence')} className=' mb-0 mb-2'>
                                            {Language?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='Correspondence_language'
                                    control={control}
                                    rules={{
                                        required: 'Language Of Correspondence is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.Correspondence_language?.message}</span>{' '}
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.account-currency')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.account-currency')} className=' mb-0 mb-2'>
                                            {currencies.map((row, i) => <Option key={i} value={row}>{row}</Option>)}
                                        </Select>
                                    )}
                                    name='currency_used'
                                    control={control}
                                    rules={{
                                        required: 'Currency Used is Required'
                                    }}
                                />
                                <span className='text-danger mb'>{errors.currency_used?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('time-zone')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Select   {...field} placeholder={t('time-zone')} className='mb-2 md-0' aria-label='TimeZone' aria-describedby='Select TimeZone'>
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
                <FormButton ClearText={t('clear')} PrimaryText={t('save')} reset={reset} />
            </Form>
        </>
    );
};

export default GeneralInfo;
