import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ClientApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import FormButton from '../../../components/FormButton';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { IClientPassword } from '../../../../interfaces/Client/consultant-change-pass';
import { resetClientTokenData } from '../../../../redux/client/actions';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const FormItem = Form.Item;

const ChangePasswordPage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.client.Token);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<IClientPassword>();

    const SubmitData = (data: IClientPassword) => {
        const Formdata = new URLSearchParams();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        ClientApi.changePassword(Formdata, 'setting/change-password', token)
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
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };
    return (
        <>
            <PageHeader title={t('change-password')} />
            <div className='stack'>
                <Form
                    layout='vertical'
                    className='d-flex flex-column'
                    onSubmitCapture={handleSubmit(SubmitData)}
                >
                    <div className='col-sm-12 col-md-6 mx-auto required'>
                        <FormItem label={t('auth.current-password')}>
                            <Controller
                                render={({ field }) => (
                                    <Input.Password {...field} maxLength={200} placeholder={t('auth.current-password')} autoComplete='off' />
                                )}
                                name='current_password'
                                control={control}
                                rules={{
                                    required: 'Current Password is Required'
                                }}
                            />
                            <span className='text-danger mb'>{errors.current_password?.message}</span>{' '}
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 mx-auto required'>
                        <FormItem label={t('auth.new-password')}>
                            <Controller
                                render={({ field }) => (
                                    <Input.Password {...field} maxLength={200} placeholder={t('auth.new-password')} autoComplete='off' />
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
                    <div className='col-sm-12 col-md-6 mx-auto required'>
                        <FormItem label={t('auth.confirm-password')}>
                            <Controller
                                render={({ field }) => (
                                    <Input.Password {...field} maxLength={200} placeholder={t('auth.confirm-password')} autoComplete='off' />
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
                    <div className='col-sm-12 col-md-6 mx-auto'>
                        <FormButton reset={reset} ClearText={t('clear')} PrimaryText={t('save')} />
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ChangePasswordPage;
