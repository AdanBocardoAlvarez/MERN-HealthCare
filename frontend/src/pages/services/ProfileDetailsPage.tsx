import { useState, useEffect, useRef, useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import FormButton from '../components/FormButton';
import { useForm, Controller } from 'react-hook-form';
import { UserProfile } from '../../interfaces/Consultant/consultant-step1';
import { useGetApi } from '../../hooks/Consultant/useBasicProfile';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { updateConstultantTokenData } from '../../redux/consultant-token/actions';
import JoditEditor from 'jodit-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const ProfileDetailsPage = () => {

    const token = useSelector((state: AppState) => state.consultant.Token);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const editor = useRef(null);
    const editor_2 = useRef(null);

    const [profilePic, setProfilePic] = useState<File>();
    const [Pic, setPic] = useState<string>();
    const [Keywords] = useGetApi('get-keywords');
    const [Objective] = useGetApi('get-objectives');

    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm<UserProfile>({ mode: 'onTouched' });

    useEffect(() => {
        (async () => {
            await ConsultantApi.getMyProfileAndKeywordConsultant('get-profile-keywords-details', token)
                .then(async (res) => {
                    reset(res);
                    setPic(res?.profile_img);
                }).catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message });
                });
        })();
    }, [token, reset]);

    const SubmitData = (data: UserProfile) => {
        const Formdata = new FormData();
        for (const key in data) {
            if (data[key] !== undefined) Formdata.append(key, data[key] || '');
        }
        Formdata.append('profile_img', profilePic);
        ConsultantApi.loginPost(Formdata, 'consultant-profile-keywords-details', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    Navigate('/consultant/edit-account');
                    dispatch(updateConstultantTokenData({ status, ProfileDetail: 1 }));
                    Navigate('/consultant/edit-account/profile-detail');
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    const config = useMemo(() => ({
        readonly: false,
        // toolbarButtonSize: "small",
        // safeMode: true,
        showXPathInStatusbar: false,
        height: null,
        maxHeight: 250,
        removeButtons: ['eraser', 'strikethrough', 'ul', 'ol', 'font', 'paragraph', 'superscript', 'subscript', 'classSpan', 'paragraph', 'lineHeight', 'superscript', 'subscript', 'classSpan', 'file', 'image', 'video', 'spellcheck', 'cut', 'copy', 'paste', 'selectall', 'copyformat', 'table', 'link', 'symbols', 'indent', 'outdent', 'left', 'brush', 'undo', 'redo', 'find', 'source', 'fullsize', 'preview', 'print', 'about', 'file']
    }), [])


    return (
        <>
            <PageHeader title={t('auth.profile-details')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(SubmitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.bio')}>
                                <Controller
                                    render={({ field }) => <JoditEditor
                                        className='custom-jodit'
                                        ref={editor}
                                        value={field.value}
                                        config={config}
                                        onBlur={newContent => setValue('bio', newContent)} // preferred to use only this option to update the content for performance reasons
                                    // onChange={newContent => setValue('bio', newContent)}
                                    />}
                                    name='bio'
                                    control={control}
                                    rules={{
                                        required: 'Enter your bio'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.bio?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.background-experience')}>
                                <Controller
                                    render={({ field }) => <JoditEditor
                                        className='custom-jodit'
                                        ref={editor_2}
                                        value={field.value}
                                        config={config}
                                        onBlur={newContent => setValue('professionalCounseling', newContent)} // preferred to use only this option to update the content for performance reasons
                                    // onChange={newContent => setValue('bio', newContent)}
                                    />}
                                    name='professionalCounseling'
                                    control={control}
                                    rules={{
                                        required: 'Enter your Background Experinece / Publication'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.professionalCounseling?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label={t('auth.introductory-video')}>
                                <Controller
                                    render={({ field }) => <Input {...field} placeholder='Enter Introductory Video' autoComplete='off' />}
                                    name='intro_vedio'
                                    control={control}
                                    rules={{ required: false }}
                                />
                                <span className='text-danger px-3'>{errors.intro_vedio?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.keywords')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.keywords')} className='mb-2 mb-md-0 selectMultiple' mode='multiple' >
                                            {Keywords?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='keywords'
                                    control={control}
                                    rules={{ required: 'Please Select Keywords' }}
                                />
                                <span className='text-danger px-3'>{errors.keywords?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('auth.objectives')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.objectives')} className='mb-2 mb-md-0 selectMultiple' mode='multiple'>
                                            {Objective?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='Objectives'
                                    control={control}
                                    rules={{
                                        required: 'Please Select Objectives'
                                    }}
                                />
                                <span className='text-danger px-3'>{errors.Objectives?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <FormItem label={t('auth.profile-photo')}>
                                <div className={`avatar-wrapper mt-0`}>
                                    <ImageLoader src={Pic} setImage={setProfilePic} alt={t('auth.profile-photo')} />
                                </div>
                            </FormItem>
                        </div>
                    </div>
                    <FormButton reset={reset} ClearText={t('clear')} isShown={true} PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    );
};

export default ProfileDetailsPage;
