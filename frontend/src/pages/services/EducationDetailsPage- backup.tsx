import { Form, Input, Select } from 'antd';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../components/FormButton';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { useEffect, useState } from 'react';
import { UserEducation } from '../../interfaces/Consultant/consultant-step1';
import { useGetApi, useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';

const pageData: IPageData = {
    title: 'Education Details',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Consultant-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Edit Account',
            route: 'edit-account'
        },
        {
            title: 'Education Details'
        }
    ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const EducationDetailsPage = () => {
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [Country] = useGetCountry('get-country');

    const Navigate = useNavigate();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        watch
    } = useForm<UserEducation>({ mode: 'onTouched' });
    const dispatch = useDispatch();
    usePageData(pageData);

    const [graDegree, setGraDegree] = useState<File>();
    const [picGra, setPicGra] = useState<string>();

    const [postDegree, setPostDegree] = useState<File>();
    const [picPost, setPicPost] = useState<string>();

    const [resume, setResume] = useState<File>();
    const [picResume, setPicResume] = useState<string>();

    const [Specialization] = useGetApi('get-specialization');
    const [Disorder] = useGetApi('get-disorders');
    const filledFields = watch([
        'post_degree_name',
        'post_school_name',
        'post_country',
        'post_year_of_graduation',
        'post_num_of_degree'
    ]);
    const isAnyFieldFilled = filledFields.some((field) => field !== null && field !== undefined && field !== '');

    useEffect(() => {
        (async () => {
            await ConsultantApi.getMyEducationDetailsConsultant(
                'get-consultant-education-details',
                token
            ).then(async (res) => {
                if (res) {
                    reset(res);
                    setPicGra(res?.gra_degree_attachment);
                    setPicPost(res?.post_degree_attachment);
                    setPicResume(res?.edu_resume);
                }
            }).catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
        })();
    }, [token, reset]);

    const submitData = async (data: UserEducation) => {
        const Formdata = new FormData();
        for (const key in data) {
            if (data[key] !== undefined) Formdata.append(key, data[key] || '');
        }
        Formdata.append('gra_degree_attachment', graDegree);
        Formdata.append('post_degree_attachment', postDegree);
        Formdata.append('edu_resume', resume);

        ConsultantApi.loginPost(Formdata, 'consultant-education-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    dispatch(updateConstultantTokenData({ status, EducationDetails: 1 }));
                    Navigate('/consultant/edit-account/certificate-detail');
                    reset();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                    reset();
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <div className='stack'>
            <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                <section className='text-lg text-contrast-500 text-center py-3 mb-3 bg-color-indigo'>
                    Graduation
                </section>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Degree Name'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Enter Degree Name'
                                        autoComplete='off'
                                        aria-label='Degree Name'
                                        aria-describedby='Enter Degree Name'
                                    />
                                )}
                                name='gra_degree_name'
                                control={control}
                                rules={{
                                    required: 'Degree name is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.gra_degree_name?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='School Name'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        name='gra_school_name'
                                        placeholder='Enter School Name'
                                        autoComplete='off'
                                        aria-label='School Name'
                                        aria-describedby='Enter School Name'
                                    />
                                )}
                                name='gra_school_name'
                                control={control}
                                rules={{
                                    required: 'School Name is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.gra_school_name?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Country'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Country'
                                        className='md-0 mb-2'
                                        aria-label='Country'
                                        aria-describedby='Select Country'
                                    >
                                        {Country?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='gra_country'
                                control={control}
                                rules={{
                                    required: 'Select Country is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.gra_country?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Year of Graduation ' className='form-group'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        placeholder='Select Year of Graduation'
                                        className='md-0 mb-2'
                                        aria-label='Year of Graduation'
                                        aria-describedby='Select Year of Graduation'
                                    />
                                )}
                                name='gra_year_of_graduation'
                                control={control}
                                rules={{
                                    required: 'Select Year of Graduation is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.gra_year_of_graduation?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label='Number of degree (Optional)'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Enter Number of degree (Optional)'
                                        autoComplete='off'
                                        aria-label='Number of degree (Optional)'
                                        aria-describedby='Enter Number of degree (Optional)'
                                    />
                                )}
                                name='gra_num_of_degree'
                                control={control}
                                rules={{
                                    required: false
                                }}
                            />
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Degree Attachment'>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    accept='.jpg,.jpeg,.png'
                                    src={picGra}
                                    setImage={setGraDegree}
                                    alt='Degree Attachment'
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>
                <section className='text-lg text-contrast-500 text-center py-3 mb-3 bg-color-indigo'>
                    Post Graduation
                </section>
                <div className='row'>
                    <div className={`col-sm-12 col-md-6 ${isAnyFieldFilled ? 'required' : ''}`}>
                        <FormItem label='Degree Name'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Enter Degree Name'
                                        autoComplete='off'
                                        aria-label='Degree Name'
                                        aria-describedby='Enter Degree Name'
                                    />
                                )}
                                name='post_degree_name'
                                control={control}
                                rules={{
                                    validate: () => isAnyFieldFilled || true, // Set custom validation rule
                                    required: isAnyFieldFilled ? 'Select Degree name is Required' : false
                                }}
                            />
                            {isAnyFieldFilled && (
                                <span className='text-danger px-3'>{errors.post_degree_name?.message}</span>
                            )}
                        </FormItem>
                    </div>
                    <div className={`col-sm-12 col-md-6 ${isAnyFieldFilled ? 'required' : ''}`}>
                        <FormItem label='School Name'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        name='school_name'
                                        placeholder='Enter School Name'
                                        autoComplete='off'
                                        aria-label='School Name'
                                        aria-describedby='Enter School Name'
                                    />
                                )}
                                name='post_school_name'
                                control={control}
                                rules={{
                                    validate: () => isAnyFieldFilled || true, // Set custom validation rule
                                    required: isAnyFieldFilled ? 'Select School Name is Required' : false
                                }}
                            />
                            {isAnyFieldFilled && (
                                <span className='text-danger px-3'>{errors.post_school_name?.message}</span>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className={`col-sm-12 col-md-6 ${isAnyFieldFilled ? 'required' : ''}`}>
                        <FormItem label='Country'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Country'
                                        className='md-0 mb-2'
                                        aria-label='Country'
                                        aria-describedby='Select Country'
                                    >
                                        {Country?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='post_country'
                                control={control}
                                rules={{
                                    validate: () => isAnyFieldFilled || true, // Set custom validation rule
                                    required: isAnyFieldFilled ? 'Select Country is Required' : false
                                }}
                            />
                            {isAnyFieldFilled && (
                                <span className='text-danger px-3'>{errors.post_country?.message}</span>
                            )}
                        </FormItem>
                    </div>
                    <div className={`col-sm-12 col-md-6 ${isAnyFieldFilled ? 'required' : ''}`}>
                        <FormItem label='Year of Graduation' className='form-group'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='date'
                                        placeholder='Select Year of Post Graduation'
                                        className='md-0 mb-2'
                                        aria-label='Year of Graduation'
                                        aria-describedby='Select Year of Post Graduation'
                                    />
                                )}
                                name='post_year_of_graduation'
                                control={control}
                                rules={{
                                    validate: () => isAnyFieldFilled || true, // Set custom validation rule
                                    required: isAnyFieldFilled ? 'Select Year of Graduation is Required' : false
                                }}
                            />
                            {isAnyFieldFilled && (
                                <span className='text-danger px-3'>{errors.post_year_of_graduation?.message}</span>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <FormItem label='Number of degree (Optional)'>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Enter Number of degree (Optional)'
                                        autoComplete='off'
                                        aria-label='Number of degree (Optional)'
                                        aria-describedby='Enter Number of degree (Optional)'
                                    />
                                )}
                                name='post_num_of_degree'
                                control={control}
                                rules={{ required: false }}
                            />
                        </FormItem>
                    </div>
                    <div className={`col-sm-12 col-md-6 ${isAnyFieldFilled ? 'required' : ''}`}>
                        <FormItem label={`Degree Attachment`}>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    accept='.jpg,.jpeg,.png'
                                    src={picPost}
                                    setImage={setPostDegree}
                                    alt='Degree Attachment'
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>
                <hr className='my-5' />
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Specialization'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Specialization'
                                        className='md-0 mb-2'
                                        mode='multiple'
                                        aria-label='Specialization'
                                        aria-describedby='Select Specialization'
                                    >
                                        {Specialization?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='edu_specialization'

                                control={control}
                                rules={{
                                    required: 'Select Specialization is Required'
                                }}
                            />
                            <span className='text-danger px-3'>{errors.edu_specialization?.message}</span>
                        </FormItem>
                    </div>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Disorders'>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder='Select Disorders'
                                        className=' md-0 mb-2'
                                        aria-label='Disorders'
                                        aria-describedby='Select Disorders'
                                        mode='multiple'
                                    >
                                        {Disorder?.map((res) => (
                                            <Option key={res._id} value={res._id}>
                                                {res.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                name='edu_disorders'
                                control={control}
                                rules={{
                                    required: 'Select Disorders is Required'
                                }}
                            />
                            <span className='text-danger mt-1 px-3'>{errors.edu_disorders?.message}</span>
                        </FormItem>
                    </div>
                </div>
                <hr className='my-5' />
                <div className='row'>
                    <div className='col-sm-12 col-md-6 required'>
                        <FormItem label='Resume - Attachment (PDF)'>
                            <div className={`avatar-wrapper mt-0`}>
                                <ImageLoader
                                    accept='.pdf'
                                    src={picResume}
                                    setImage={setResume}
                                    alt='Resume - Attachment (PDF)'
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>
                <FormButton reset={reset} ClearText='Clear' isShown={true} PrimaryText='Save' />
            </Form>
        </div>
    );
};

export default EducationDetailsPage;
