import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import { useState } from 'react';

interface ICountry {
    name: string;
    isdcode: string;
    country_flag?: string; // Make the property optional
}

const pageData: IPageData = {
    title: 'Add Country',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Add Country'
        }
    ]
};

const FormItem = Form.Item;

const AddCountryPage = () => {

    const [image, setImage] = useState<File>(null);
    const Navigate = useNavigate();
    const token = useSelector((state: AppState) => state.admin.Token);
    usePageData(pageData);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<ICountry>();

    const submitData = (data: ICountry) => {

        const Formdata = new FormData();
        for (const key in data) {
            Formdata.append(key, data[key] || '');
        }
        Formdata.append('country_flag', image);
        AdminApi.createPost(Formdata, 'country/store', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    reset();
                    openNotificationWithIcon({ type: 'success', message });
                    Navigate('/admin/view-country');
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
                reset();
            });
    };

    return (
        <div className='stack'>
            <div className='d-flex justify-content-end align-items-center'>
                <Button
                    className='mb-3 ms-1 mx-2'
                    shape='round'
                    type='primary'
                    onClick={() => Navigate('/admin/view-country')}
                >
                    View Country
                </Button>
            </div>
            <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                        <FormItem label='Country'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        placeholder='Enter Country'
                                        className='input'
                                        type='text'
                                        {...field}
                                        aria-label='Country'
                                        aria-describedby='Enter Country'
                                    />
                                )}
                                name='name'
                                control={control}
                                rules={{
                                    required: 'Country is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.name?.message}</span>
                        </FormItem>
                    </div>
                    <div className="col-sm-12 col-md-6 required">
                        <FormItem label='ISD Code'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        placeholder='Enter ISD Code'
                                        className='input'
                                        type='text'
                                        {...field}
                                        maxLength={5}
                                        aria-label='ISD Code'
                                        aria-describedby='Enter ISD Code'
                                    />
                                )}
                                name='isdcode'
                                control={control}
                                rules={{
                                    required: 'ISD Code is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.isdcode?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Country Flag Image'>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    setImage={setImage}
                                    alt='profile image'
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>
                <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
            </Form>
        </div>
    );
};

export default AddCountryPage;
