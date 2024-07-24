import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../components/FormButton';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { Userbank } from '../../interfaces/Consultant/consultant-step1';
import { useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';
import { currencies } from '../../utils/currencies';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const BankDetailsPage = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [bankImg, setbankImg] = useState<File>();
    const [pic, setPic] = useState<string>();

    const [Country] = useGetCountry('get-country');
    const Navigate = useNavigate();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<Userbank>();

    useEffect(() => {
        (async () => {
            await ConsultantApi.getMyBankConsultant('get-consultant-bank-details', token)
                .then(res => {
                    reset(res);
                    setPic(res?.add_bank_information);
                }).catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message });
                });
        })();
    }, [reset, token]);

    const submitData = (data: Userbank) => {
        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('add_bank_information', bankImg);
        ConsultantApi.loginPost(Formdata, 'consultant-bank-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(updateConstultantTokenData({ status, BankDetails: 1 }));
                    Navigate('/consultant/edit-account/profile-detail');
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
    return (
        <>
            <PageHeader title={t('auth.bank-details')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.payment-currency')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.payment-currency')} className='mb-2 mb-md-0'>
                                            {currencies.map(row => <Option value={row}>{row}</Option>)}
                                        </Select>
                                    )}
                                    name='payment_currency'
                                    control={control}
                                    rules={{
                                        required: 'Payment Currency is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.payment_currency?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.tax-information')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.tax-information')} />}
                                    name='tax_information'
                                    control={control}
                                    rules={{
                                        required: 'TAX ID is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.tax_information?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('country')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('country')} className='mb-2 mb-md-0' >
                                            {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='country'
                                    control={control}
                                    rules={{
                                        required: 'Country is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.country?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.bank-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.bank-name')} />}
                                    name='bank_name'
                                    control={control}
                                    rules={{
                                        required: 'Bank Name is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.bank_name?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.bank-agency-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.bank-agency-name')} />}
                                    name='bank_Agency_name'
                                    control={control}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.agency-address')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.agency-address')} />}
                                    name='agency_address'
                                    control={control}
                                    rules={{
                                        required: 'Agency Address is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.agency_address?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.swift-code')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' min={0} placeholder={t('auth.swift-code')} />}
                                    name='swift_code'
                                    control={control}
                                    rules={{
                                        required: 'Swift Code / BIC Code is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.swift_code?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.bank-account-number')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='number' min={0} placeholder={t('auth.bank-account-number')} />}
                                    name='account_number'
                                    control={control}
                                    rules={{
                                        required: 'Account Number is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.account_number?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.branch-code')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' min={0} placeholder={t('auth.branch-code')} />}
                                    name='branch_code'
                                    control={control}
                                    rules={{
                                        required: 'Branch Code is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.branch_code?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.iban')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.iban')} />}
                                    name='Iban'
                                    control={control}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.control-key')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.control-key')} />}
                                    name='control_key'
                                    control={control}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.account-holder-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} type='text' placeholder={t('auth.account-holder-name')} />}
                                    name='account_holder_name'
                                    control={control}
                                    rules={{
                                        required: 'Account Holder Name is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.account_holder_name?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.account-currency')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.account-currency')} >
                                            {currencies.map(row => <Option value={row}>{row}</Option>)}
                                        </Select>
                                    )}
                                    name='account_currency'
                                    control={control}
                                    rules={{
                                        required: 'Account Currency is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.account_currency?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.additional-banking-information')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader src={pic} setImage={setbankImg} alt={t('auth.additional-banking-information')} />
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

export default BankDetailsPage;
