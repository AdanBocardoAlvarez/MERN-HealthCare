import { useCallback, useEffect, useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { IDigitalProduct } from '../../../../interfaces/Admin/digitalProduct';

const pageData: IPageData = {
    title: 'Edit Digital Product',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Edit Digital Product'
        }
    ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const EditDigitalProductPage = () => {
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm<IDigitalProduct>();
    const [digitalProductPic, setDigitalProductPic] = useState<File | null>(null);
    const [digitalProductPDF, setDigitalProductPDF] = useState<File | null>(null);
    const [digitalProductImage, setDigitalProductImage] = useState<string>();
    const [digitalProductpdf, setDigitalProductpdf] = useState<string>();

    const token = useSelector((state: AppState) => state.consultant.Token);
    const [Author] = useGetAuthor('blog/get-author');
    const Navigate = useNavigate();

    const GetMyBasicProfile = useCallback(async () => {
        await AdminApi.getRecordByID(`digital-product/get-record-by-id?id=${id}`, token).then(
            async (res) => {
                reset(res);
                setValue("date", res.date.slice(0, 10))
                setValue('author_name', res.author_name);
                setValue('des', res.des);
                setValue('subtitletitle', res.subtitletitle);
                setDigitalProductImage(`${process.env.REACT_APP_API_BASE_URL}${res.image}`);
                setDigitalProductpdf(`${process.env.REACT_APP_API_BASE_URL}${res.pdf}`);
            }
        ).catch((err) => {
            const message = err?.response?.data?.message || err.message;
            openNotificationWithIcon({ type: 'error', message: message });
            Navigate('/admin/view-digital-product');
        });
    }, [id, token, setValue, Navigate, reset]);

    useEffect(() => {
        GetMyBasicProfile();
    }, [GetMyBasicProfile]);

    usePageData(pageData);

    const submitData = (data) => {
        const Formdata = new FormData();
        for (const key in data) {
            if (key !== "image" && key !== "pdf") {
                Formdata.append(key, data[key] !== undefined ? data[key] : '');
            }

        }
        Formdata.append('image', digitalProductPic);
        Formdata.append('pdf', digitalProductPDF);

        AdminApi.createPatch(Formdata, 'digital-product/edit')
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    Navigate('/admin/view-digital-product');
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
        <div className='stack'>
            <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                        <FormItem label='Add Digital Product Title'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        placeholder='Enter Add Digital Product Title'
                                        className='input'
                                        type='text'
                                        {...field}
                                        aria-label='Add Digital Product Title'
                                        aria-describedby='Enter Add Digital Product Title'
                                    />
                                )}
                                name='title'
                                control={control}
                                rules={{
                                    required: 'Add Digital Product Title is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.title?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Add Digital Product Author'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Add Digital Product Author'
                                        className=' md-0 mb-2 required'
                                        aria-label='Add Digital Product Author '
                                        aria-describedby='Select Add Digital Product Author'
                                    >
                                        {Author?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='author_name'
                                control={control}
                                rules={{
                                    required: 'Add Digital Product Author is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.author_name?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Add Digital Product Image'>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    src={digitalProductImage}
                                    setImage={setDigitalProductPic}
                                    alt='Add Digital Product Image'
                                />
                            </div>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Add Digital Product Pdf'>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    src={digitalProductpdf}
                                    setImage={setDigitalProductPDF}
                                    alt='Add Digital Product Pdf'
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Date ' className='form-group'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        placeholder='Select Date'
                                        className='md-0 mb-2'
                                        aria-label='Date'
                                        aria-describedby='Select Date'
                                    />
                                )}
                                name='date'
                                control={control}
                                rules={{
                                    required: 'Select Date is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.date?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
                        <FormItem label='Add Digital Product Subtitle'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        placeholder='Enter Add Digital Product Subtitle'
                                        className='input'
                                        type='text'
                                        {...field}
                                        aria-label='Add Digital Product Subtitle'
                                        aria-describedby='Enter Add Digital Product Subtitle'
                                    />
                                )}
                                name='subtitletitle'
                                control={control}
                                rules={{
                                    required: 'Add Digital Product Subtitle is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.subtitletitle?.message}</span>
                        </FormItem>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Description'>
                            <Controller
                                render={({ field }) => (
                                    <Input.TextArea
                                        placeholder='Enter Description'
                                        className='input'
                                        autoSize={{ minRows: 4, maxRows: 6 }}
                                        {...field}
                                        aria-label='Description'
                                        aria-describedby='Enter Description'
                                    />
                                )}
                                name='des'
                                control={control}
                                rules={{
                                    required: 'Description is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.des?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
            </Form>
        </div>
    );
};

export default EditDigitalProductPage;
