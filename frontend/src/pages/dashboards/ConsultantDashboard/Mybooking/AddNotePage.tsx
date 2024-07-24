import { Controller, useForm } from 'react-hook-form';
import { Form, Input } from 'antd';
import FormButton from '../../../components/FormButton';
import { ConsultantApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const FormItem = Form.Item;
type FormProps = {
    sessionId: string;
    clientId: string;
    description: string;
};

const AddNotePage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const { clientId, sessionId } = useParams();
    const Navigate = useNavigate();
    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm<FormProps>();

    const submitData = async (data: FormProps) => {
        const params = new URLSearchParams();
        params.append('clientId', clientId);
        params.append('sessionId', sessionId);
        params.append('description', data.description);
        ConsultantApi.loginPost(params, 'add-note-for-client', token)
            .then((datas) => {
                const message = datas.message;
                openNotificationWithIcon({ type: 'success', message: message });
                Navigate('/consultant/my-booking');
            })
            .catch((err) => {
                openNotificationWithIcon({ type: 'error', message: err?.response?.data?.message || err.message });
            });
    };


    useEffect(() => {
        (() => {
            ConsultantApi.GetNoteSingle(`get-single-note?sessionId=${sessionId}`, token)
                .then((res) => { setValue('description', res.description) })
                .catch((err) => {
                    openNotificationWithIcon({ type: 'error', message: err?.response?.data?.message || err.message });
                });
        })();
    }, [sessionId, token, setValue]);

    return (
        <>
            <PageHeader title={t('cons.add-note')} />
            <div className='stack w-100'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-12 required'>
                            <FormItem label={t('cons.add-note')}>
                                <Controller
                                    render={({ field }) => (
                                        <Input.TextArea {...field} placeholder={t('cons.add-note')} cols={10} maxLength={500} autoComplete='off' />
                                    )}
                                    name='description'
                                    control={control}
                                    rules={{
                                        required: 'Note is Required',
                                        minLength: {
                                            value: 10,
                                            message: "Minimum character should be 10."
                                        },
                                        maxLength: {
                                            value: 500,
                                            message: "Maximum allowed text character limit is 500."
                                        }
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.description?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <FormButton reset={reset} ClearText={t('clear')} isShown PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    );
};

export default AddNotePage;
