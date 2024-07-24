import { Button, Form, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { useEffect, useState } from 'react';
import { UserEducation } from '../../interfaces/Consultant/consultant-step1';
import { useGetApi } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const FormItem = Form.Item;
const Option = Select.Option;

const SubSection = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [resume, setResume] = useState<File>();
    const [picResume, setPicResume] = useState<string>();
    const [specialization] = useGetApi('get-specialization');
    const [disorder] = useGetApi('get-disorders');

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UserEducation>({ mode: 'onTouched' });


    useEffect(() => {
        (async () => {
            await ConsultantApi.getMyEducationDetailsConsultant('get-consultant-education-details', token)
                .then(async (res) => {
                    if (res) {
                        reset(res);
                        setPicResume(res?.edu_resume);
                    }
                }).catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message });
                });
        })();
    }, [token, reset]);

    const submitData = async (data: UserEducation) => {
        const Formdata = new FormData();
        Formdata.append('edu_specialization', data.edu_specialization?.join(','));
        Formdata.append('edu_disorders', data.edu_disorders?.join(','));
        Formdata.append('edu_resume', resume);
        ConsultantApi.loginPost(Formdata, 'consultant-education-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
            <div className='row'>
                <div className='col-sm-12 col-md-6 required'>
                    <FormItem label={t('specialisation')}>
                        <Controller
                            render={({ field }) => (
                                <Select {...field} placeholder={t('specialisation')} className='md-0' mode='multiple'>
                                    {specialization?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                </Select>
                            )}
                            name='edu_specialization'

                            control={control}
                            rules={{
                                required: 'Select Specialization is Required'
                            }}
                        />
                        <span className='text-danger px-3'>{errors.edu_specialization?.message}</span>
                    </FormItem>
                </div>
                <div className='col-sm-12 col-md-6 required'>
                    <FormItem label={t('disorders')}>
                        <Controller
                            render={({ field }) => (
                                <Select {...field} placeholder={t('disorders')} className=' md-0' mode='multiple' >
                                    {disorder?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                </Select>
                            )}
                            name='edu_disorders'
                            control={control}
                            rules={{
                                required: 'Select Disorders is Required'
                            }}
                        />
                        <span className='text-danger mt-1 px-3'>{errors.edu_disorders?.message}</span>
                    </FormItem>
                </div>
                <div className='col-sm-12 col-md-6 required'>
                    <FormItem label={t('resume')}>
                        <div className={`avatar-wrapper mt-0`}>
                            <ImageLoader accept='.pdf' src={picResume} setImage={setResume} alt={t('resume')} />
                        </div>
                    </FormItem>
                </div>
                <div className='col-sm-12 col-md-6 required'>
                    <br />
                    <Button htmlType='submit'>{t('save')}</Button>
                </div>
            </div>
        </Form>
    )
}

export default SubSection