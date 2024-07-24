import { Form, Input, Radio, Select } from 'antd';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import FormButton from '../components/FormButton';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useGetApi, useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { UserBasic } from '../../interfaces/Consultant/consultant-step1';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';
import { useDispatch } from 'react-redux';
import { DefaultGenderValues, DefaultTitleValues, TimeZoneList, radioStyle } from '../../utils/comman';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const BasicProfilePage: React.FC = () => {
    const token = useSelector((state: AppState) => state.consultant.Token);;

    const { t } = useTranslation();
    const [idImage, setIdImage] = useState<File>();
    const [idPic, setIdPic] = useState<string>();
    const [Language] = useGetApi('get-languages');
    const [Nationality] = useGetApi('get-nationality');
    const [Country] = useGetCountry('get-country');

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<UserBasic>({ mode: 'onTouched' });


    useEffect(() => {
        (async () => {
            await ConsultantApi.getMyBasicProfileConsultant('get-consultant-basic-details', token)
                .then(res => {
                    reset(res);
                    setIdPic(res?.id_number_attachment);
                }).catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message });
                });
        })();
    }, [token, reset]);

    const submitData = async (data: UserBasic) => {
        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('id_number_attachment', idImage);
        ConsultantApi.loginPost(Formdata, 'consultant-basic-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(updateConstultantTokenData({ status, BasicDetails: 1 }));
                    Navigate('/consultant/edit-account/address-detail');
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                    reset();
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
                // reset();
            });
    };

    const optionFilter = (input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return (
        <>
            <PageHeader title={t('auth.basic-profile-details')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
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
                                            {DefaultGenderValues.map(({ name, ids, index, value }) => (
                                                <label key={index} htmlFor={ids}>
                                                    <Radio style={radioStyle} id={ids} value={value}>{t(`auth.${name}`)}</Radio>
                                                </label>
                                            ))}
                                        </Radio.Group>
                                    )}
                                    name='gender'
                                    control={control}
                                    rules={{ required: 'Gender is Required' }}
                                />
                                <span className='text-danger mb'>{errors.gender?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.family-name')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Input {...field} type='text' placeholder={t('auth.family-name')} autoComplete='off' />
                                    )}
                                    name='family_name'
                                    control={control}
                                    rules={{ required: 'Family Name / Surname is Required' }}
                                />
                                <span className='text-danger mb'>{errors.family_name?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.given-name')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Input {...field} type='text' placeholder={t('auth.given-name')} autoComplete='off' />
                                    )}
                                    name='given_name'
                                    control={control}
                                    rules={{ required: 'Given Name is Required' }}
                                />
                                <span className='text-danger mb'>{errors.given_name?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.date-of-birth')} required>
                                <Controller
                                    render={({ field }) => <Input {...field} type='date' placeholder={t('auth.date-of-birth')} />}
                                    name='DOB'
                                    control={control}
                                    rules={{ required: 'Date of Birth is Required' }}
                                />
                                <span className='text-danger mb'>{errors.DOB?.message}</span>{' '}
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.timezone')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Select   {...field} placeholder={t('auth.timezone')} className='mb-2 md-0' aria-label='TimeZone' aria-describedby='Select TimeZone'>
                                            {TimeZoneList?.map((res) => <Option key={res.value} value={res.value}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='timezone'
                                    control={control}
                                    rules={{ required: 'TimeZone is Required' }}
                                />
                                <span className='text-danger mb'>{errors.timezone?.message}</span>{' '}
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                            <FormItem label={t('auth.language-of-correspondence')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.language-of-correspondence')} className='mb-2 mb-md-0'>
                                            {Language?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='Correspondence_language'
                                    control={control}
                                    rules={{
                                        required: 'Correspondence Language is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.Correspondence_language?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.languages-spoken')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder={t('auth.languages-spoken')}
                                            optionFilterProp='children'
                                            className='mb-2 mb-md-0'
                                            mode='multiple'
                                            filterOption={optionFilter}
                                        >
                                            {Language?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='spoken_language'
                                    control={control}
                                    rules={{
                                        required: 'Spoken Languages is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.spoken_language?.message}</span>
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.profession')}>
                                <Controller
                                    render={({ field }) => (
                                        <Input {...field} placeholder={t('auth.profession')} className='input' type='text' />
                                    )}
                                    name='profession'
                                    control={control}
                                    rules={{
                                        required: 'Profession is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.profession?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('country-of-birth')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('country-of-birth')} optionFilterProp='children' className='mb-2 mb-md-0'>
                                            {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name} </Option>)}
                                        </Select>
                                    )}
                                    name='country_of_birth'
                                    control={control}
                                    rules={{
                                        required: 'Birth Country is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.country_of_birth?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.nationality')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} className='mb-2 mb-md-0' placeholder={t('auth.nationality')} optionFilterProp='children'>
                                            {Nationality?.map((res) => (
                                                <Option key={res._id} value={res._id}>{res.name}</Option>
                                            ))}
                                        </Select>
                                    )}
                                    name='nationality'
                                    control={control}
                                    rules={{
                                        required: 'Nationality is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.nationality?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <Form.Item label={t('auth.years-of-experience')}>
                                <Controller
                                    render={({ field }) => (
                                        <Input placeholder={t('auth.years-of-experience')} className='input' type='number' min={1} {...field} />
                                    )}
                                    name='year_of_experience'
                                    control={control}
                                    rules={{
                                        min: {
                                            value: 1,
                                            message: 'Min value shoud be 1.',
                                        },
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Please enter a number',
                                        },
                                        required: 'Years Of Experience Is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.year_of_experience?.message}</span>
                            </Form.Item>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <Form.Item label={t('auth.id-number')}>
                                <Controller
                                    render={({ field }) => (
                                        <Input placeholder={t('auth.id-number')} className='input' type='text' {...field} />
                                    )}
                                    name='id_number'
                                    control={control}
                                    rules={{
                                        required: 'ID Number is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.id_number?.message}</span>
                            </Form.Item>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.criminal-record')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.criminal-record')} className='mb-2 mb-md-0'>
                                            <Option value='Yes'>Yes</Option>
                                            <Option value='No'>No</Option>
                                        </Select>
                                    )}
                                    name='criminal_record'
                                    control={control}
                                    rules={{
                                        required: 'Criminal Record Status is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.criminal_record?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.id-number-attachment')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader src={idPic} setImage={setIdImage} alt='profile image' />
                                </div>
                            </FormItem>
                        </div>
                    </div>

                    <FormButton reset={reset} ClearText={t('clear')} isShown={true} PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    );
};

export default BasicProfilePage;
