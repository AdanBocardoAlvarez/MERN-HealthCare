import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ConsultantApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../components/Toast';
import RegisterPage from '../../../assets/img/client-reg-bg.jpg';
import FormButton from '../../components/FormButton';
import { IClientPassword } from '../../../interfaces/Client/consultant-change-pass';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { resetClientTokenData } from '../../../redux/client/actions';
import WebLogo from '../../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

const FormItem = Form.Item;

const ResetPasswordPage = () => {
    const token = useSelector((state: AppState) => state.client.Token);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { reset_password_token, email } = useParams()

    const { t } = useTranslation();
    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<IClientPassword>({ mode: 'onTouched' });

    const SubmitData = (data: IClientPassword) => {
        const Formdata = new URLSearchParams();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }

        Formdata.append('reset_password_token', reset_password_token);
        Formdata.append('email', email);

        ConsultantApi.changePassword(Formdata, 'setting/reset-password', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(resetClientTokenData());
                    Navigate('/public/sign-in');
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
                    <h1 className='h4 mt-0 mb-4'>{t('auth.reset-password')}</h1>
                    <Form layout='vertical' className='d-flex flex-column ' onSubmitCapture={handleSubmit(SubmitData)} >
                        <div className='col-sm-12 col-md-12'>
                            <FormItem label={t('auth.new-password')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            placeholder={`${t('enter')} ${t('auth.new-password')}`}
                                            autoComplete='off'
                                            style={{ maxWidth: 500 }}
                                        />
                                    )}
                                    name='new_password'
                                    control={control}
                                    rules={{
                                        required: 'New Password is Required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long.'
                                        },
                                        pattern: {
                                            value:
                                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
                                            message:
                                                'Password must contain at least 1 capital letter, 1 small letter, 1 special character, and 1 number *'
                                        }
                                    }}
                                />
                                <span className='text-danger mb'>{errors.new_password?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-12 '>
                            <FormItem label={t('auth.confirm-password')} required>
                                <Controller
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            placeholder={`${t('enter')} ${t('auth.confirm-password')}`}
                                            autoComplete='off'
                                            style={{ maxWidth: 500 }}
                                        />
                                    )}
                                    name='confirm_password'
                                    control={control}
                                    rules={{
                                        required: 'Confirm Password is Required',
                                        validate: (val) => {
                                            if (watch('new_password') !== val) {
                                                return 'Your passwords do no match';
                                            }
                                        }
                                    }}
                                />
                                <span className='text-danger mb'>{errors.confirm_password?.message}</span>{' '}
                            </FormItem>
                        </div>
                        <FormButton reset={reset} ClearText={t('clear')} PrimaryText={t('save')} />
                    </Form>
                    <br />
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

export default ResetPasswordPage;