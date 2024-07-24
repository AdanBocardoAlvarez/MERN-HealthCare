import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ClientApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { Link } from 'react-router-dom';

type FormValues = {
    email: string;
    password: string;
};
const FormItem = Form.Item;

const ClientSign = () => {
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
    }, [navigate, AdminToken, ConsultantToken, ClientToken]);


    return (
        <div className='container-fluid auth-bg-2'>
            <div className="row">
                <div className="col-lg-6 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <InnerChild
                        label="Demandez un accès anticipé"
                        upperText="Rejoignez gratuitement nos 300 passionnés du bien-être préinscrits sur Vhealthy pour débuter votre quête vers un mode de vie plus sain."
                        bottomText="Restez informé et en bonne santé à mesure que notre site web évolue. Excellente journée! " />
                    <div className="mt-3">
                        <Link to="/public/sign-in" className='fw-bold'>Go Back</Link>
                    </div>
                </div>
                <div className="col-lg-6 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <InnerChild
                        label="Request early access"
                        upperText="Join our 300 pre-registered wellbeing enthusiasts for free on Vhealthy to begin your pursuit of a healthier lifestyle"
                        bottomText="Stay tuned and stay healthy as our webpage evolves. Happy day!" />
                    <div className="mt-3">
                        <Link to="/public/sign-in" className='fw-bold'>Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


const InnerChild = ({ bottomText = "", upperText = "", label = "" }) => {

    const [isLoading, setisLoading] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
    const handelSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        for (const key in data) {
            params.append(key, data[key]);
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
        <div className='' style={{ maxWidth: 400 }}>
            <p className='fw-bold text-dark'>{upperText}</p>
            <Form onSubmitCapture={handleSubmit(handelSubmit)} layout='vertical' className='mb-4'>
                <FormItem label={label}>
                    <Controller
                        render={({ field }) => <Input style={{ borderRadius: 5 }} className='gradent-border ' type='email' placeholder='Enter your Email Address' autoComplete='off' aria-label='Enter your Email Address' aria-describedby='Enter your Email Address' {...field} />}
                        name='email'
                        control={control}
                        rules={{ required: 'Email is Required' }}
                    />
                    <span className='text-danger mb'>{errors.email?.message}</span>{' '}
                </FormItem>
                <Button block={true} type='text' htmlType='submit' className='btn-grad border text-color-800' loading={isLoading} >
                    Connect
                </Button>
            </Form>
            <p className='text-center text-color-600'>
                {bottomText} <span style={{ color: 'red' }}>❤</span>
            </p>
        </div>
    )
}


export default ClientSign;
