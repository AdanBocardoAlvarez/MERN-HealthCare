import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { Controller, useForm } from 'react-hook-form';
import { ConsultantApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../components/Toast';
import RegisterPage from '../../../assets/img/client-reg-bg.jpg';
import WebLogo from '../../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

type FormValues = {
    email: string;
};
const FormItem = Form.Item;

const ForgetPasswordPage = () => {

    const { t } = useTranslation();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        params.append('email', data.email);
        ConsultantApi.simplePost(params, 'setting/forgot-password')
            .then((datas) => {
                const message = datas.message;
                const status = datas.sucess;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    reset();
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
        <div className="row registration">
            <div className="col-lg-8 overflow-auto vh-100 scrollbar-none">
                <div className="container-lg p-5">
                    <div className="pt-4 pb-2">
                        <WebLogo />
                    </div>
                    <h1 className='h4'>{t('auth.forget-password')} {t('Consultant')}</h1>
                    <p className='text-color-200 mb-5'>{t('auth.forget-password-subheading')}</p>
                    <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='mb-4'>
                        <FormItem label={t('email')}>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder={`${t('enter-your')} ${t('email')}`}
                                        autoComplete='off'
                                        style={{ maxWidth: 500 }}
                                    />
                                )}
                                name='email'
                                control={control}
                                rules={{ required: 'Email is Required' }}
                            />
                            <span className='text-danger mb'>{errors.email?.message}</span>{' '}
                        </FormItem>
                        <Button block={false} type='primary' htmlType='submit' icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}>
                            {t('auth.send-link')}
                        </Button>
                    </Form>
                    <br />
                    <p> {t('auth.dont-have-acc')} <Link to='/public/consultant/sign-up'>{t('auth.sign-up')}</Link> </p>
                </div>
            </div >
            <div className="col-lg-4 d-none d-lg-block">
                <div className='reg-page-bg- vh-100'>
                    <img src={RegisterPage} className='h-100' alt="Bg" />
                </div>
            </div>
        </div >
    );
};

export default ForgetPasswordPage;
