import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { setTokenData } from '../../redux/token/actions';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { AdminApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigateAdmin } from '../../utils/use-navigate-admin';
import RegisterPage from '../../assets/img/client-reg-bg.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { Link } from 'react-router-dom';
import WebLogo from '../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

type FormValues = {
    email: string;
    password: string;
};

const FormItem = Form.Item;

const AdminSign = () => {

    const { t } = useTranslation();
    const ClientToken = useSelector((state: AppState) => state.client.Token);
    const ConsultantToken = useSelector((state: AppState) => state.consultant.Token);
    const AdminToken = useSelector((state: AppState) => state.admin.Token);
    const navigate = useNavigate();
    useEffect(() => {
        if (AdminToken) {
            navigate('/admin/dashboard');
        } else if (ConsultantToken) {
            navigate('/consultant/dashboard');
        } else if (ClientToken) {
            navigate('/client/dashboard');
        }
    }, [AdminToken, ConsultantToken, ClientToken, navigate]);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
    const dispatch = useDispatch();
    const navigateAdminHome = useNavigateAdmin();

    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key]);
        }
        AdminApi.Login(params, 'setting/login')
            .then((datas) => {
                const Token = datas.Token;
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    dispatch(setTokenData({ Token, status }));
                    openNotificationWithIcon({ type: 'success', message });
                    navigateAdminHome();
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
                    <h1 className='h4'>{t('auth.login-as-admin')}</h1>
                    <p className='text-color-200 mb-5'>{t('auth.login-to-access-your-account')}</p>
                    <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='mb-4'>
                        <FormItem label={t('email')}>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder={`${t('enter-your')} ${t('email')}`}
                                        style={{ maxWidth: 500 }}
                                    />
                                )}
                                name='email'
                                control={control}
                                rules={{
                                    required: 'Email is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.email?.message}</span>{' '}
                        </FormItem>
                        <FormItem label={t('password')}>
                            <Controller
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        maxLength={10}
                                        placeholder={`${t('enter-your')} ${t('password')}`}
                                        autoComplete='off'
                                        style={{ maxWidth: 500 }}
                                    />
                                )}
                                name='password'
                                control={control}
                                rules={{
                                    required: 'Password is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.password?.message}</span>{' '}
                        </FormItem>
                        <Button block={false} type='primary' htmlType='submit' icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}>
                            {t('auth.login')}
                        </Button>
                    </Form>
                    <br />
                    <p className='mb-1'> <Link to='/public/admin/forget-password'>{t('auth.forget-password')}</Link> </p>
                </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
                <div className='reg-page-bg- vh-100'>
                    <img src={RegisterPage} className='h-100' alt="Bg" />
                </div>
            </div>
        </div>
    );
};

export default AdminSign;
