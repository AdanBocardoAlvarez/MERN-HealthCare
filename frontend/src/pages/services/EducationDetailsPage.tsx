import { useCallback, useEffect, useState } from 'react';
import { ConsultantApi } from '../../api/api';
import { openNotificationWithIcon } from '../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { Button, Modal, Table, Form, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useGetCountry } from '../../hooks/Consultant/useBasicProfile';
import SubSection from './SubSection';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

interface IData {
    _id: string;
    degree_name: string;
    school_name: string;
    year_of_graduation: number;
    country: string;
    attachment: string;
}

const FormItem = Form.Item;
const Option = Select.Option;

const EducationDetailsPage = () => {

    const { t } = useTranslation();
    const [Country] = useGetCountry('get-country');
    const token = useSelector((state: AppState) => state.consultant.Token);

    const [edication, setEdication] = useState([]);
    const [attachment, setAttachment] = useState<File>();
    const [formType, setFormType] = useState('add')

    const [showAdd, setShowAdd] = useState(false)
    const [visibleModal, setVisibleModal] = useState();

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IData>({ mode: 'onTouched' });


    const getData = useCallback(() => {
        ConsultantApi.simpleGet('get-consultant-education-list', token)
            .then(async (data) => {
                if (data) setEdication(data);
            }).catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [token])

    useEffect(() => { getData() }, [getData]);

    function deleteCertificate(id: string) {
        ConsultantApi.simpleDelete(`delete-consultant-education?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    getData()
                    setVisibleModal(undefined);
                    openNotificationWithIcon({ type: 'success', message })
                } else {
                    openNotificationWithIcon({ type: 'error', message: message })
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    const handleCancel = () => { setVisibleModal(undefined); };

    const addNew = (data: IData) => {

        if (formType === 'add') {
            if (!attachment) {
                openNotificationWithIcon({ type: 'error', message: "Please select degree document." });
                return;
            }

            const Formdata = new FormData();
            for (const key in data) {
                Formdata.append(key, data[key] || '');
            }
            Formdata.append('attachment', attachment);
            ConsultantApi.simplePost(Formdata, 'add-consultant-education', token)
                .then((datas) => {
                    const message = datas.message;
                    const status = datas.status;
                    if (status) {
                        getData()
                        setShowAdd(false);
                        openNotificationWithIcon({ type: 'success', message });
                    } else {
                        openNotificationWithIcon({ type: 'error', message: message });
                    }
                })
                .catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message })
                });
        }


        if (formType === 'edit') {

            const Formdata = new FormData();
            for (const key in data) {
                Formdata.append(key, data[key] || '');
            }
            Formdata.append('attachment', attachment || null);
            ConsultantApi.simplePatch(Formdata, `edit-consultant-education?id=${data._id}`, token)
                .then((datas) => {
                    const message = datas.message;
                    const status = datas.status;
                    if (status) {
                        getData()
                        setShowAdd(false);
                        openNotificationWithIcon({ type: 'success', message });
                    } else {
                        openNotificationWithIcon({ type: 'error', message: message });
                    }
                })
                .catch((err) => {
                    const message = err?.response?.data?.message || err?.message;
                    openNotificationWithIcon({ type: 'error', message: message })
                });
        }
    };

    const editData = (data: IData) => {
        reset(data);
        setFormType('edit');
        setAttachment(null);
        setShowAdd(true);
    }

    const columns = [
        {
            key: 'degree_name',
            dataIndex: 'degree_name',
            title: t('auth.degree-name'),
            render: (degree_name) => <span className='nowrap'>{degree_name}</span>
        },
        {
            key: 'school_name',
            dataIndex: 'school_name',
            title: t('auth.school-name'),
            render: (schoolName) => <span className='nowrap'>{schoolName}</span>
        },
        {
            key: 'year_of_graduation',
            dataIndex: 'year_of_graduation',
            title: t('auth.year-of-graduation'),
            render: (certificateYear) => <span className='nowrap'>{certificateYear}</span>
        },
        {
            key: 'country_name',
            dataIndex: 'country_name',
            title: t('country'),
            render: (country_name) => <span className='nowrap'>{country_name}</span>
        },
        {
            key: 'attachment',
            dataIndex: 'attachment',
            title: t('auth.degree-attachment'),
            render: (link) => <a href={`${process.env.REACT_APP_API_BASE_URL}${link}`} rel="noreferrer" target='_blank'>Download</a>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: t('actions'),
            render: (id, row) => {
                return <>
                    <Button shape='round' type='primary' className='me-2' onClick={() => editData(row)} >
                        {t('edit')}
                    </Button>
                    <Button shape='round' type='primary' onClick={() => setVisibleModal(id)} danger>
                        <DeleteOutlined />
                    </Button>
                </>
            }
        }
    ];

    return (
        <>
            <PageHeader title={t('auth.education-details')} />
            <div className='stack'>
                <SubSection />
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='my-0'>{t('auth.degrees-list')}</h4>
                    <Button className='mx-2' shape='round' type='primary' onClick={() => setShowAdd(true)}>
                        {t('auth.add-degree')}
                    </Button>
                </div>

                <Table pagination={edication.length <= 10 ? false : {}} className='accent-header' rowKey='_id' dataSource={edication} columns={columns} />

                <Modal open={visibleModal} footer={null} onCancel={handleCancel} title={<h3 className='title text-center'>{t('auth.delete-degree')}</h3>}>
                    <div className="d-flex justify-content-center gap-3 w-100">
                        <Button shape='round' type='primary' onClick={() => deleteCertificate(visibleModal)} danger>
                            {t('delete')}
                        </Button>
                        <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
                            {t('cancel')}
                        </Button>
                    </div>
                </Modal>

                <Modal
                    centered
                    open={showAdd}
                    okButtonProps={{ type: 'primary', htmlType: "submit", form: "hook-form" }}
                    okText={t('auth.add-degree')}
                    cancelText={t('cancel')}
                    cancelButtonProps={{ danger: true }}
                    onCancel={() => setShowAdd(false)}
                    title={<h3 className='title text-center'>{t('auth.add-degree')}</h3>}
                >
                    <div className="row">
                        <Form id="hook-form" layout='vertical' onSubmitCapture={handleSubmit(addNew)}>
                            <div className='row'>
                                <div className='col-sm-12 col-md-6 required'>
                                    <FormItem label={t('auth.degree-name')}>
                                        <Controller
                                            render={({ field }) => (
                                                <Input {...field} placeholder={t('auth.degree-name')} autoComplete='off' maxLength={100} />
                                            )}
                                            name='degree_name'
                                            control={control}
                                            rules={{
                                                required: 'Degree name is Required'
                                            }}
                                        />
                                        <span className='text-danger px-3'>{errors.degree_name?.message}</span>
                                    </FormItem>
                                </div>
                                <div className='col-sm-12 col-md-6 required'>
                                    <FormItem label={t('auth.school-name')}>
                                        <Controller
                                            render={({ field }) => (
                                                <Input {...field} name='school_name' placeholder={t('auth.school-name')} autoComplete='off' maxLength={100} />
                                            )}
                                            name='school_name'
                                            control={control}
                                            rules={{
                                                required: 'School Name is Required'
                                            }}
                                        />
                                        <span className='text-danger px-3'>{errors.school_name?.message}</span>
                                    </FormItem>
                                </div>

                                <div className='col-sm-12 col-md-6 required'>
                                    <FormItem label={t('country')}>
                                        <Controller
                                            render={({ field }) => (
                                                <Select {...field} placeholder={t('country')} className='md-0 mb-2' >
                                                    {Country?.map((res) => <Option key={res._id} value={res._id}>{res.name}</Option>)}
                                                </Select>
                                            )}
                                            name='country'
                                            control={control}
                                            rules={{
                                                required: 'Select Country is Required'
                                            }}
                                        />
                                        <span className='text-danger px-3'>{errors.country?.message}</span>
                                    </FormItem>
                                </div>
                                <div className='col-sm-12 col-md-6 required'>
                                    <FormItem label={t('auth.year-of-graduation')} className='form-group'>
                                        <Controller
                                            render={({ field }) => <Input {...field} type='string' maxLength={4} placeholder={t('auth.year-of-graduation')} className='md-0 mb-2' />}
                                            name='year_of_graduation'
                                            control={control}
                                            rules={{
                                                required: 'Select Year of Graduation is Required',
                                                minLength: {
                                                    value: 4,
                                                    message: "Please enter correct year."
                                                },
                                                maxLength: {
                                                    value: 4,
                                                    message: "Please enter correct year."
                                                },
                                                pattern: {
                                                    value: /^(19|20)\d{2}$/,
                                                    message: 'Please enter correct year',
                                                },
                                            }}
                                        />
                                        <span className='text-danger px-3'>{errors.year_of_graduation?.message}</span>
                                    </FormItem>
                                </div>

                                <div className='col-sm-12 col-md-6 required'>
                                    <FormItem label={t('auth.degree-attachment')} className='form-group'>
                                        <Input
                                            onChange={e => {
                                                if (e.target.files.length <= 0) return;
                                                let first = e.target.files[0];
                                                if (!["application/pdf", "image/png", "image/jpeg", "image/jpg"].includes(first.type)) {
                                                    openNotificationWithIcon({ type: 'error', message: "Please select image or pdf file only..!!" })
                                                    return;
                                                }

                                                setAttachment(first);
                                            }}
                                            type='file'
                                            className='md-0 mb-2'
                                        />
                                        <span className='text-danger px-3'>{errors.attachment?.message}</span>
                                    </FormItem>
                                </div>
                            </div>
                        </Form>
                    </div>

                </Modal>
            </div>
        </>
    );
};

export default EducationDetailsPage;
