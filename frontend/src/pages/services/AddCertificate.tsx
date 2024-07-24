import { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UserCertificate } from '../../interfaces/Consultant/consultant-step1';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { openNotificationWithIcon } from '../components/Toast';
import { ConsultantApi } from '../../api/api';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';
import FormButton from '../components/FormButton';
import FormItem from 'antd/es/form/FormItem';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const AddCertificate = () => {

    const [certificateAttachment, setCertificateAttachment] = useState<File>();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const token = useSelector((state: AppState) => state.consultant.Token);
    const { handleSubmit, control, reset, formState: { errors } } = useForm<UserCertificate>();

    const submitData = (data) => {
        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('certificate_attachment', certificateAttachment);

        ConsultantApi.loginPost(Formdata, 'consultant-certificates', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(updateConstultantTokenData({ status, CertificateDetail: 1 }));
                    navigate('/consultant/edit-account/certificate-detail');
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message })
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    return (
        <>
            <PageHeader title={t('auth.add-certificate')} />
            <div className='stack'>
                <div className='text-end'>
                    <Button className='mb-3 ms-1 mx-2' shape='round' type='primary' onClick={() => navigate('/consultant/edit-account/certificate-detail')}>
                        {t('auth.view-certificate')}
                    </Button>
                </div>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.certificate-name')}>
                                <Controller
                                    render={({ field }) => <Input {...field} placeholder={t('auth.certificate-name')} />}
                                    name="certificate_name"
                                    control={control}
                                    rules={{
                                        required: 'Certificate Name is Required'
                                    }}
                                />
                                {errors.certificate_name && <span className='text-danger px-3'>{errors.certificate_name?.message}</span>}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.year-of-certification')} className='form-group'>
                                <Controller
                                    render={({ field }) => <Input {...field} type='date' placeholder={t('auth.year-of-certification')} className='md-0 mb-2' />}
                                    name="year_of_certificate"
                                    control={control}
                                    rules={{
                                        required: 'Year of Certification is Required'
                                    }}
                                />
                                {errors.year_of_certificate && <span className='text-danger px-3'>{errors.year_of_certificate?.message}</span>}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.school-name-for-certificate')}>
                                <Controller
                                    render={({ field }) => <Input {...field} placeholder={t('auth.school-name-for-certificate')} />}
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: 'School Name for certificate is Required'
                                    }}
                                />
                                {errors.name && <span className='text-danger px-3'>{errors.name?.message}</span>}
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.number-of-certificate')}>
                                <Controller
                                    render={({ field }) => <Input {...field} placeholder={t('auth.number-of-certificate')} />}
                                    name="num_of_certificate"
                                    control={control}
                                />
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.certificate-attachment')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader setImage={setCertificateAttachment} alt={t('auth.certificate-attachment')} />
                                </div>
                            </FormItem>
                        </div>
                    </div>

                    <FormButton reset={reset} ClearText={t('clear')} isShown={true} PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    )
}

export default AddCertificate