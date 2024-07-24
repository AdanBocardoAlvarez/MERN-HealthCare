import { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { ClientApi } from '../../../../api/api';
import { useGetComplaintClientType, useGetConsultantNameClient } from '../../../../hooks/Client/UseClient';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { IClientComplaintPostType } from '../../../../interfaces/Client/client-state';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const AddClientComplaintPage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.client.Token);

    const [ComplaintPic, setComplaintPic] = useState<File | null>();
    const [ConsultantName] = useGetConsultantNameClient('get-consultant-list');
    const [ComplaintType] = useGetComplaintClientType('get-complaint-type');

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IClientComplaintPostType>();

    const submitData = (data: IClientComplaintPostType) => {
        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('attachment', ComplaintPic);
        Formdata.append('type', '1');

        ClientApi.createPost(Formdata, 'send-complaint', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    reset();
                    setComplaintPic(null);
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
        <>
            <PageHeader title={t('add-complaint')} />
            <div className='stack'>
                <div className='d-flex flex-wrap justify-content-between '>
                    <Link className='d-flex align-items-center paragraph-text gap-2' to='/client/dashboard' >
                        <ArrowLeftOutlined style={{ fontSize: '100%' }} />
                        <span className='text-md'>{t('dashboard')}</span>
                    </Link>
                    <Link className='d-flex align-items-center paragraph-text gap-2' to='/client/view-complaint-by-me'>
                        <span className='text-md'>{t('view-complaint')}</span>
                        <ArrowRightOutlined style={{ fontSize: '100%' }} />
                    </Link>
                </div>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                            <FormItem label={t('consultant-name')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('consultant-name')} className='mb-2 mb-md-0'>
                                            {ConsultantName?.map((res) => <Option key={res._id} value={res._id}>{res.given_name}</Option>)}
                                        </Select>
                                    )}
                                    name='raised_against'
                                    control={control}
                                    rules={{
                                        required: 'Consultant Name is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.raised_against?.message}</span>
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                            <FormItem label={t('complaint-type')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('complaint-type')} className='mb-2 mb-md-0'>
                                            {ComplaintType?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='complaint_type'
                                    control={control}
                                    rules={{
                                        required: 'Complaint Type is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.complaint_type?.message}</span>
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('additional-information')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea placeholder={t('additional-information')} className='input' maxLength={1000} autoSize={{ minRows: 4, maxRows: 6 }} {...field} />
                                    )}
                                    name='additional_details'
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: {
                                            value: 10,
                                            message: 'Min input length shoud be 10.',
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: 'Max input length shoud be 1000.',
                                        },
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.additional_details?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('attachment')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader setImage={setComplaintPic} alt={t('attachment')} />
                                </div>
                            </FormItem>
                        </div>
                    </div>
                    <FormButton ClearText={t('clear')} PrimaryText={t('save')} reset={reset} />
                </Form>
            </div>
        </>
    );
};

export default AddClientComplaintPage;
