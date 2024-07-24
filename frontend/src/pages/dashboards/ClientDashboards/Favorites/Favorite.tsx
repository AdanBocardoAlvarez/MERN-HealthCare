import { useEffect } from 'react';
import { Form, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { openNotificationWithIcon } from '../../../components/Toast';
import { ClientApi } from '../../../../api/api';
import { useGetApi } from '../../../../hooks/Consultant/useBasicProfile';
import { IFavorite } from '../../../../interfaces/Client/favorite';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const FormItem = Form.Item;
const Option = Select.Option;

const Favorite = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.client.Token);
    const [Author] = useGetAuthor('blog/get-author');
    const [Objective] = useGetApi('get-objectives');
    const [Disorder] = useGetApi('get-disorders');
    const [Keywords] = useGetApi('get-keywords');

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IFavorite>();

    useEffect(() => {
        ClientApi.getFavouriteDetails('favourite-blog', token).then((res) => {
            reset(res);
        }).catch((err) => {
            const message = err?.response?.data?.message || err.message;
            openNotificationWithIcon({ type: 'error', message: message });
        });
    }, [token, reset]);

    const submitData = (data: IFavorite) => {
        ClientApi.postClientFavourite(data, 'favourite', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
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
            <PageHeader title={t('cnt.favorite')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 required'>
                            <FormItem label={t('consultant-name')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('consultant-name')} className=' md-0 mb-2 required' mode='multiple' >
                                            {Author?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='authurId'
                                    control={control}
                                    rules={{ required: 'Blog Author is Required' }}
                                />
                                <span className='text-danger px-3'>{errors.authurId?.message}</span>
                            </FormItem>
                        </div>

                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label={t('auth.keywords')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.keywords')} className='mb-2 mb-md-0 selectMultiple' mode='multiple' >
                                            {Keywords?.map((res) => (
                                                <Option key={res._id} value={res._id}>{res.name}</Option>
                                            ))}
                                        </Select>
                                    )}
                                    name='keyword'
                                    control={control}
                                    rules={{ required: false }}
                                />
                                <span className='text-danger px-3'>{errors.keyword?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label={t('disorders')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('disorders')} className='mb-2 mb-md-0 selectMultiple' mode='multiple'>
                                            {Disorder?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='disorder'
                                    control={control}
                                    rules={{ required: false }}
                                />
                                <span className='text-danger px-3'>{errors.disorder?.message}</span>
                            </FormItem>
                        </div>
                        <div className='col-sm-12 col-md-6 '>
                            <FormItem label={t('auth.objectives')}>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={t('auth.objectives')} className='mb-2 mb-md-0 selectMultiple' mode='multiple'>
                                            {Objective?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                        </Select>
                                    )}
                                    name='objective'
                                    control={control}
                                    rules={{ required: false }}
                                />
                                <span className='text-danger px-3'>{errors.objective?.message}</span>
                            </FormItem>
                        </div>
                    </div>

                    <FormButton ClearText={t('clear')} PrimaryText={t('save')} reset={reset} />
                </Form>
            </div>
        </>
    );
};

export default Favorite;
