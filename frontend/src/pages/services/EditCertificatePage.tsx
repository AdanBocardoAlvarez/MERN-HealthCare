import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Input } from 'antd';
import { UserCertificate } from '../../interfaces/Consultant/consultant-step1';
import { ConsultantApi } from '../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import FormButton from '../components/FormButton';
import { openNotificationWithIcon } from '../components/Toast';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
const FormItem = Form.Item;

const EditCertificateForm = () => {

    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [CertificateImage, setCertificateImage] = useState<File>();
    const [CertificatePic, setCertificatePic] = useState<string>();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm<UserCertificate>();


    useEffect(() => {
        (async () => {
            await ConsultantApi.getSingleMyCertificate(`get-single-consultant-certificates?id=${id}`, token)
                .then(async (res) => {
                    setValue('name', res.name);
                    setValue('certificate_name', res.certificate_name);
                    setValue('year_of_certificate', res.year_of_certificate);
                    setValue('num_of_certificate', res.num_of_certificate);
                    setCertificatePic(res.certificate_attachment);
                })
                .catch((err) => {
                    navigate('/consultant/edit-account/certificate-detail');
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message })
                });
        })();
    }, [id, setValue, token, navigate]);

    const submitData = (data: UserCertificate) => {
        const Formdata = new FormData();
        Formdata.append('id', id);
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('certificates', CertificateImage);
        ConsultantApi.CertificatePatch(Formdata, 'edit-consultant-certificates', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    navigate('/consultant/edit-account/certificate-detail');
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message })
            });
    };

    return (
        <>
            <PageHeader title={t('auth.certificate-details')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row mt-5'>
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
                                <span className='text-danger px-3'>{errors?.certificate_name?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.year-of-certification')} className='form-group'>
                                <Controller
                                    render={({ field }) => <Input {...field} type='date' className='md-0 mb-2' placeholder={t('auth.year-of-certification')} />}
                                    name="year_of_certificate"
                                    control={control}
                                    rules={{
                                        required: 'Year of Certification is Required'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors?.year_of_certificate?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
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
                                <span className='text-danger px-3'>{errors.name?.message}</span>
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
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.certificate-attachment')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader src={CertificatePic} setImage={setCertificateImage} alt={t('auth.certificate-attachment')} />
                                </div>
                            </FormItem>
                        </div>
                    </div>
                    <FormButton reset={reset} ClearText='Clear' isShown={true} PrimaryText='Save' />
                </Form>
            </div>
        </>
    );
};

export default EditCertificateForm;
