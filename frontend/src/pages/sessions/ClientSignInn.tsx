import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { ClientApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { setClientTokenData } from '../../redux/client/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import WebLogo from '../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

type FormValues = {
    email: string;
    password: string;
};
const FormItem = Form.Item;

const ClientSignInn = () => {

    const { t } = useTranslation();
    const ClientToken = useSelector((state: AppState) => state.client.Token);
    const ConsultantToken = useSelector((state: AppState) => state.consultant.Token);
    const AdminToken = useSelector((state: AppState) => state.admin.Token);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key] || '');
        }

        setisLoading(true)
        ClientApi.postLogin(params, 'login')
            .then((datas) => {
                const Token = datas.Token;
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    dispatch(setClientTokenData({ Token, status }));
                    openNotificationWithIcon({ type: 'success', message });
                    reset();
                } else {
                    setisLoading(false)
                    openNotificationWithIcon({ type: 'error', message });
                    reset();
                }
            })
            .catch((err) => {
                setisLoading(false)
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message });
                reset();
            });
    };


    useEffect(() => {
        if (AdminToken) {
            navigate('/admin/dashboard');
        } else if (ConsultantToken) {
            navigate('/consultant/dashboard');
        } else if (ClientToken) {
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                return navigate(redirectUrl);
            } else {
                return navigate('/client/dashboard');
            }
        }
    }, [AdminToken, ConsultantToken, ClientToken, navigate]);

    return (
        <div className="auth-bg-2">
            <div className="container">
                <div className="row min-vh-100 justify-content-center">
                    <div className="col-12">
                        <div className='my-4'><WebLogo /></div>
                        <h1 className='h4 mt-0 mb-2 text-color-900 text-center'>{t('auth.login-as-user')}</h1>
                    </div>

                    <div className="col-lg-6">
                        <div className="w-100 p-5">
                            <p className='text-color-600 fw-bold' style={{ minHeight: 80 }}>{t('auth.client-login-sub-heading')}</p>
                            <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='mb-4'>
                                <label htmlFor="" className='fs-5 fw-bold'>{t('auth.client-login-label')}</label>
                                <FormItem>
                                    <Controller
                                        render={({ field }) => (
                                            <Input type='text' placeholder={`${t('enter-your')} ${t('email')}`} autoComplete='off' className='gradent-border bg-white' {...field} />
                                        )}
                                        name='email'
                                        control={control}
                                        rules={{ required: 'Email is Required' }}
                                    />
                                    <span className='text-danger mb'>{errors.email?.message}</span>{' '}
                                </FormItem>
                                <FormItem>
                                    <Controller
                                        render={({ field }) => (
                                            <Input.Password maxLength={200} placeholder={`${t('enter-your')} ${t('password')}`} autoComplete='off' className='gradent-border bg-white' {...field} />
                                        )}
                                        name='password'
                                        control={control}
                                        rules={{ required: 'Password is Required' }}
                                    />
                                    <span className='text-danger mb'>{errors.password?.message}</span>{' '}
                                </FormItem>
                                <Button block={true} type='text' className='btn-grad border text-color-800' htmlType='submit' loading={isLoading} icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}>
                                    {t('auth.login')}
                                </Button>
                                <p className='text-center my-2' style={{ minHeight: 45 }}>{t('auth.client-login-bottom-text')}</p>
                            </Form>

                            <p className='mb-1 fw-bold text-center'><Link to='/public/client/forget-password'>{t('auth.forget-password')}</Link></p>
                            <p className='text-color-600 fw-bold text-center'>{t('auth.dont-have-acc')} <Link to='/public/client/sign-up'>{t('auth.sign-up')}</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ClientSignInn;
