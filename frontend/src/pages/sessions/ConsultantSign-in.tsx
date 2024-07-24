import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { setConstultantTokenData } from '../../redux/consultant-token/actions';
import { useNavigateConsultant } from '../../utils/use-navigate-consultant';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useEffect, useState } from 'react';
import WebLogo from '../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

type FormValues = {
    email: string;
    password: string;
};

const FormItem = Form.Item;


const ConsultantSign = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const ClientToken = useSelector((state: AppState) => state.client.Token);
    const ConsultantToken = useSelector((state: AppState) => state.consultant.Token);
    const AdminToken = useSelector((state: AppState) => state.admin.Token);
    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
    const navigateConsultantHome = useNavigateConsultant();

    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key]);
        }

        setisLoading(true)
        ConsultantApi.login(params, 'login')
            .then((data) => {
                setisLoading(false)
                if (data.status) {
                    dispatch(setConstultantTokenData(data));
                    openNotificationWithIcon({ type: 'success', message: data.message });
                    navigateConsultantHome();
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: data.message });
                    reset();
                }
            })
            .catch((err) => {
                setisLoading(false)
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
                reset();
            });
    };

    useEffect(() => {
        if (AdminToken) {
            navigate('/admin/dashboard');
        } else if (ConsultantToken) {
            navigate('/consultant/dashboard');
        } else if (ClientToken) {
            navigate('/client/dashboard');
        }
    }, [AdminToken, ConsultantToken, ClientToken, navigate]);

    return (
        <div className="auth-bg-4">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className='my-4'><WebLogo /></div>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 bg-white-opacity rounded-3 border pt-5 mb-5">
                                <h1 className='h4 mt-0 mb-2 text-color-900 text-center'>{t('auth.login-as-consultant')} </h1>
                                <div className="w-100 p-5">
                                    <p className='text-black fw-bold' style={{ minHeight: 110 }} dangerouslySetInnerHTML={{ __html: t('auth.consultant-login-sub-heading') }}></p>
                                    <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='w-100 mb-2'>
                                        <label htmlFor="" className='fs-5 fw-bold'>{t('auth.consultant-login-label')}</label>
                                        <FormItem>
                                            <Controller
                                                render={({ field }) => (
                                                    <Input type='text' placeholder={`${t('enter-your')} ${t('email')}`} className='gradent-border bg-white' autoComplete='off' {...field} />
                                                )}
                                                name='email'
                                                control={control}
                                                rules={{ required: 'Email is Required' }}
                                            />
                                            <span className='text-danger'>{errors.email?.message}</span>{' '}
                                        </FormItem>
                                        <FormItem>
                                            <Controller
                                                render={({ field }) => (
                                                    <Input.Password maxLength={200} placeholder={`${t('enter-your')} ${t('password')}`} className='gradent-border bg-white' autoComplete='off' {...field} />
                                                )}
                                                name='password'
                                                control={control}
                                                rules={{ required: 'Password is Required' }}
                                            />
                                            <span className='text-danger'>{errors.password?.message}</span>{' '}
                                        </FormItem>

                                        <Button type='text' className='btn-grad border text-color-800' block htmlType='submit' loading={isLoading} icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}>
                                            {t('auth.login')}
                                        </Button>
                                    </Form>
                                    <br />
                                    <p className='text-center p-0 fw-bold'><Link to='/public/consultant/forget-password'>{t('auth.forget-password')}</Link> </p>
                                    <p className='text-center p-0 fw-bold'>{t('auth.dont-have-acc')} <Link to='/public/consultant/sign-up'>{t('auth.sign-up')}</Link></p>
                                </div>
                                <hr className='d-block d-lg-none' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsultantSign;
