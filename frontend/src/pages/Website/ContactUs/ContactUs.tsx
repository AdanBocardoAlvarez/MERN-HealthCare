import { Button, Checkbox, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ClientApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../components/Toast';
import { AuthBg5 } from '../../../assets/img/index';
import { useState } from 'react';
import WebLogo from '../../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

type FormValues = {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    subject: string;
    message: string;
    accept_tc: boolean;
};

const FormItem = Form.Item;

const ContactUs = () => {

    const { t } = useTranslation();
    const [isLoading, setisLoading] = useState(false)
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

    const handelSubmit = (data: FormValues) => {

        setisLoading(true)
        ClientApi.simplePost(data, 'contact-us')
            .then((data) => {
                setisLoading(false)
                if (data.status) {
                    openNotificationWithIcon({ type: 'success', message: data.message });
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: data.message });
                }
            })
            .catch((err) => {
                setisLoading(false)
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-7 vh-100 overflow-auto scrollbar-none">
                    <div className="row justify-content-center align-items-center- h-100">
                        <div className="col-lg-8">
                            <div className="w-100">
                                <div className='mt-5 mb-3'><WebLogo /></div>
                                <h4 className='mt-0 mb-2 text-color-900'> <span className="gradent-text">{t('vhealthy')}</span> {t('contact-us.platform-inquiry')}</h4>
                                <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='w-100 mb-2'>
                                    <FormItem className="mb-2" label={t('name')} required>
                                        <Controller
                                            render={({ field }) => <Input type='text' placeholder={`${t('enter-your')} ${t('name')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('name')} aria-describedby='Enter Your Name' {...field} />}
                                            name='name'
                                            control={control}
                                            rules={{ required: 'Name is Required' }}
                                        />
                                        <span className='text-danger'>{errors.name?.message}</span>
                                    </FormItem>
                                    <FormItem className="mb-2" label={t('email')} required>
                                        <Controller
                                            render={({ field }) => <Input type='text' placeholder={`${t('enter-your')} ${t('email')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('email')} aria-describedby='Enter Email' {...field} />}
                                            name='email'
                                            control={control}
                                            rules={{
                                                required: 'Email is Required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid Email address."
                                                }
                                            }}
                                        />
                                        <span className='text-danger'>{errors.email?.message}</span>
                                    </FormItem>
                                    <FormItem className="mb-2" label={<label>{t('phone')} <span className='text-muted'>({t('optional')})</span></label>}>
                                        <Controller
                                            render={({ field }) => <Input type='text' maxLength={50} placeholder={`${t('enter-your')} ${t('phone')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('phone')} aria-describedby='Enter Phone Number' {...field} />}
                                            name='phone'
                                            control={control}
                                            rules={{ required: false }}
                                        />
                                        <span className='text-danger'>{errors.phone?.message}</span>
                                    </FormItem>
                                    <FormItem className="mb-2" label={<label>{t('company')} <span className='text-muted'>({t('if-applicable')})</span></label>}>
                                        <Controller
                                            render={({ field }) => <Input type='text' placeholder={`${t('enter-your')} ${t('company')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('company')} aria-describedby='Enter Your Organization / Company' {...field} />}
                                            name='organization'
                                            control={control}
                                            rules={{ required: false }}
                                        />
                                        <span className='text-danger'>{errors.organization?.message}</span>
                                    </FormItem>

                                    <FormItem className="mb-2" label={t('subject')} required>
                                        <Controller
                                            render={({ field }) => <Input type='text' placeholder={`${t('enter-your')} ${t('subject')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('subject')} aria-describedby='Enter Subject' {...field} />}
                                            name='subject'
                                            control={control}
                                            rules={{
                                                required: "Please enter message subject.",
                                                minLength: { value: 10, message: 'Min text length shoud be 10.' },
                                                maxLength: { value: 500, message: 'Max text length shoud be 500.' },
                                            }}
                                        />
                                        <span className='text-danger'>{errors.subject?.message}</span>
                                    </FormItem>

                                    <FormItem className="mb-2" label={t('message')} required>
                                        <Controller
                                            render={({ field }) => <Input.TextArea placeholder={`${t('enter-your')} ${t('message')}`} className='gradent-border bg-white' autoComplete='off' aria-label={t('message')} aria-describedby='Enter your Message' {...field} />}
                                            name='message'
                                            control={control}
                                            rules={{
                                                required: "Please enter your message.",
                                                minLength: { value: 10, message: 'Min text length shoud be 10.' },
                                                maxLength: { value: 500, message: 'Max text length shoud be 500.' },
                                            }}
                                        />
                                        <span className='text-danger'>{errors.message?.message}</span>
                                    </FormItem>

                                    <FormItem className="mb-2">
                                        <div className='d-flex align-items-start'>
                                            <Controller
                                                render={({ field }) => <Checkbox id={`accept_tc`} {...field} checked={field.value} />}
                                                name='accept_tc'
                                                control={control}
                                                rules={{ required: 'Privacy Policy is Required' }}
                                            />
                                            <label htmlFor={`accept_tc`} className='mx-4' dangerouslySetInnerHTML={{ __html: t('contact-us.privacy-policy', { url: `${process.env.PUBLIC_URL}${t('footer.privacy-doc')}` }) }}></label>
                                        </div>
                                        <span className='text-danger mb'>{errors.accept_tc?.message}</span>
                                    </FormItem>

                                    <div className="text-center">
                                        <Button type='text' className='btn-grad border text-color-800 px-5' htmlType='submit' loading={isLoading}>
                                            {t('submit')}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 vh-100 d-none d-lg-block">
                    <img className='w-100 h-100' src={AuthBg5} alt="" />
                </div>
            </div>
        </div >
    );
};


export default ContactUs