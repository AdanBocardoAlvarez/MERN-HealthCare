import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Button, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useEffect, useState } from 'react';

interface ICity {
    name: string;
    countryId: string;
}


const pageData: IPageData = {
    title: 'Edit City',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Edit City'
        }
    ]
};

const FormItem = Form.Item;

const EditCityPage = () => {

    const { id } = useParams();
    const Navigate = useNavigate();
    const [countries, setCountries] = useState([])
    const token = useSelector((state: AppState) => state.admin.Token);

    usePageData(pageData);
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<ICity>();


    useEffect(() => {

        AdminApi.simpleGet(`country/index`, token)
            .then((datas) => {
                if (datas.length) {
                    setCountries(datas);
                } else {
                    openNotificationWithIcon({ type: 'error', message: "Please add country first." });
                    Navigate('/admin/view-country');
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
                Navigate('/admin/view-country');
            });


        AdminApi.simpleGet(`city/get-record-by-id?id=${id}`, token)
            .then((datas) => {
                if (datas.status) {
                    reset(datas);
                } else {
                    openNotificationWithIcon({ type: 'error', message: datas.message });
                    Navigate('/admin/view-city');
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [Navigate, id, reset, token])


    const submitData = (data: ICity) => {
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        AdminApi.createPatch(formData.toString(), 'city/edit', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    Navigate('/admin/view-city');
                    reset();
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
                    onClick={() => Navigate('/admin/view-city')}
                >
                    View City
                </Button>
            </div>
            <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                <div className='row'>
                    <div className="col-sm-12 col-md-6 required">
                        <FormItem label='Country'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Country'
                                        className='mb-2 mb-md-0 selectMultiple'
                                        aria-label='Country '
                                        aria-describedby='Select Country'
                                    >
                                        {countries?.map((res) => (
                                            <Select.Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                                name='countryId'
                                control={control}
                                rules={{
                                    required: 'Please Select Country'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.countryId?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                        <FormItem label='City'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        placeholder='Enter City'
                                        className='input'
                                        type='text'
                                        {...field}
                                        aria-label='City'
                                        aria-describedby='Enter City'
                                    />
                                )}
                                name='name'
                                control={control}
                                rules={{
                                    required: 'City is Required'
                                }}

                            />
                            <span className='text-danger px-3'>{errors.name?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
            </Form>
        </div>
    );
};

export default EditCityPage;
