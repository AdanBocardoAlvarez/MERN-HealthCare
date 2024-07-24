import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ClientApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../../pages/components/Toast';
import FormItem from 'antd/es/form/FormItem';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

type FormValues = { email: string; };

const SubForm = () => {

    const { t } = useTranslation();
    const [isLoading, setisLoading] = useState(false)
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key] || '');
        }

        setisLoading(true)
        ClientApi.postLogin(params, 'save-client')
            .then((data) => {
                const message = data.message;
                const status = data.status;
                setisLoading(false)
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
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

    return (
        <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='mb-4'>
            <FormItem label=''>
                <Controller
                    render={({ field }) => (
                        <input {...field} className='newsL mb-0' name='email'
                            type='email'
                            placeholder={t('footer.enter-email')}
                            autoComplete='off'
                            aria-label={t('footer.enter-email')}
                            aria-describedby={t('footer.enter-email')}
                        />
                    )}
                    name='email'
                    control={control}
                    rules={{
                        required: 'Email is Required'
                    }}
                />
                <span className='text-danger mb'>{errors.email?.message}</span>
            </FormItem>
            <Button
                block={true}
                type='text'
                htmlType='submit'
                className='subsci_btn'
                loading={isLoading}
            >
                {t('footer.subscribe')}
            </Button>
        </Form>
    )
}

export default SubForm