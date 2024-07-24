import { Form, Input, Select } from 'antd';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import FormButton from '../components/FormButton';
import { useForm, Controller } from 'react-hook-form';
import { UserAddress } from '../../interfaces/Consultant/consultant-step1';
import { useGetCity, useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
const pageData: IPageData = {
    title: 'Address Details',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Apps',
            route: 'dashboard'
        },
        {
            title: 'Profile Page',
            route: 'dashboard'
        },
        {
            title: 'Edit Account',
            route: 'edit-account'
        },
        {
            title: 'Address Details'
        }
    ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const AddressDetailsPage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [Country] = useGetCountry('get-country');
    const [City] = useGetCity('get-city');
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { handleSubmit, control, reset, register, watch, setValue, formState: { errors } } = useForm<UserAddress>();

    useEffect(() => {
        (() => {
            ConsultantApi.getAddressDetails('get-consultant-address-details', token)
                .then(res => reset(res))
                .catch(err => openNotificationWithIcon({ type: 'error', message: err?.response?.data?.message || err?.message }));
        })();
    }, [token, reset]);

    const country_of_res = watch('country_of_residence');

    usePageData(pageData);

    const SubmitData = (data: UserAddress) => {
        const Formdata = new URLSearchParams();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        ConsultantApi.loginPost(Formdata, 'consultant-address-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(updateConstultantTokenData({ status, AddressDetails: 1 }));
                    Navigate('/consultant/edit-account/education-detail');
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                    reset();
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <>
            <PageHeader title={t('auth.address-details')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(SubmitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('house-number')}>
                                <Controller
                                    render={({ field }) => <Input {...field} name='house_number' placeholder={t('house-number')} autoComplete='off' />}
                                    name='house_number'
                                    control={control}
                                    rules={{
                                        required: 'House Number is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.house_number?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('street-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} name='street_name' placeholder={t('street-name')} autoComplete='off' />}
                                    name='street_name'
                                    control={control}
                                    rules={{
                                        required: 'Street Name is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.street_name?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('street-name-2')}>
                                <Controller
                                    render={({ field }) => <Input {...field} name='street_name2' placeholder={t('street-name-2')} autoComplete='off' />}
                                    name='street_name2'
                                    control={control}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('postal-code')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='number' name='postal_code' placeholder={t('postal-code')} autoComplete='off' />}
                                    name='postal_code'
                                    control={control}
                                    rules={{
                                        required: 'Postal Code is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.postal_code?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('country')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('country')} className='mb-2 mb-md-0' >
                                            {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name} </Option>)}
                                        </Select>
                                    )}
                                    {...register('country_of_residence', { onChange: (e) => { setValue('city', '') } })}
                                    name='country_of_residence'
                                    control={control}
                                    rules={{
                                        required: 'Country of Residence is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.country_of_residence?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('city')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('city')} className='mb-2 mb-md-0'>
                                            {City?.filter(country => country.countryId === country_of_res)?.map((res) => (
                                                <Option key={res._id} value={res._id}>{res.name}</Option>
                                            ))}
                                        </Select>
                                    )}
                                    name='city'
                                    control={control}
                                    rules={{
                                        required: 'City is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.city?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <FormButton reset={reset} ClearText={t('clear')} isShown={true} PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    );
};

export default AddressDetailsPage;
