import { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useGetClientNameConsultant, useGetComplaintConsultantType } from '../../../../hooks/Consultant/useMyProfileConsultant';
import { IConsultantComplaintPostType } from '../../../../interfaces/Consultant/consultant';
import { ConsultantApi } from '../../../../api/api';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const AddConsultantComplaintPage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [ComplaintPic, setComplaintPic] = useState<File | null>();
    const [ClientName] = useGetClientNameConsultant('get-client-list');
    const [ComplaintType] = useGetComplaintConsultantType('get-complaint-type');

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IConsultantComplaintPostType>();

    const submitData = (data: IConsultantComplaintPostType) => {
        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('type', '2');
        Formdata.append('attachment', ComplaintPic);

        ConsultantApi.createPost(Formdata, 'send-complaint', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    reset();
                    setComplaintPic(null);
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                    reset();
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
                reset();
            });
    };
    return (
        <>
            <PageHeader title={t('add-complaint')} />
            <div className='stack'>
                <div className='d-flex flex-wrap justify-content-between '>
                    <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/dashboard' >
                        <ArrowLeftOutlined style={{ fontSize: '100%' }} />
                        <span className='text-md'>{t('dashboard')}</span>
                    </Link>
                    <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/view-complaint-by-me'>
                        <span className='text-md'>{t('view-complaint')}</span>
                        <ArrowRightOutlined style={{ fontSize: '100%' }} />
                    </Link>
                </div>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                            <FormItem label={t('client-name')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} className='mb-2' placeholder={t('client-name')}>
                                            {ClientName?.map((res) => <Option key={res._id} value={res._id}>{res.given_name}</Option>)}
                                        </Select>
                                    )}
                                    name='raised_against'
                                    control={control}
                                    rules={{ required: 'Client Name is Required' }}
                                />
                                <span className='text-danger px-3'>{errors.raised_against?.message}</span>
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                            <FormItem label={t('complaint-type')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} className='mb-2' placeholder={t('complaint-type')}>
                                            {ComplaintType?.map((res) => <Option key={res._id} value={res._id}>{res.name} </Option>)}
                                        </Select>
                                    )}
                                    name='complaint_type'
                                    control={control}
                                    rules={{ required: 'Complaint Type is Required' }}
                                />
                                <span className='text-danger px-3'>{errors.complaint_type?.message}</span>
                            </FormItem>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('additional-information')}>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea className='input' autoSize={{ minRows: 4, maxRows: 6 }} placeholder={t('additional-information')} {...field} />
                                    )}
                                    name='additional_details'
                                    control={control}
                                    rules={{ required: false }}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('complaint-attachment')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader setImage={setComplaintPic} alt={t('complaint-attachment')} />
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

export default AddConsultantComplaintPage;
