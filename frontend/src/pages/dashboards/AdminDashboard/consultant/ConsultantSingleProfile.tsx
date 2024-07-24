import { IPageData } from '../../../../interfaces/page';
import { usePageData } from '../../../../hooks/usePage';
import { useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Image } from 'antd';
import { Link } from 'react-router-dom';
import ConsultantSingleTable from './ConsultantSIngleTable';
import { CalculateAge } from '../../../../utils/dob';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { Modal, Input, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';
import type { MenuProps } from 'antd';
import { Anonymous } from './../../../../assets/img/index';
type Props = {};

const pageData: IPageData = {
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Consultant',
            route: 'consultant'
        },
        {
            title: 'Consultant Profile'
        }
    ]
};

const FormItem = Form.Item;

const ConsultantSingleProfile = (props: Props) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IAdminPanel>();

    const token = useSelector((state: AppState) => state.admin.Token);
    usePageData(pageData);
    const { id } = useParams();
    const [checkedVerifiedStatus, setCheckedVerifiedStatus] = useState<number>();
    const [checkedActiveStatus] = useState(true);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [visibleModal, setVisibleModal] = useState('');
    const [visibleDuration, setVisibleDuration] = useState('');
    const [visibleConfirmVerify, setVisibleConfirmVerify] = useState<boolean>(false);
    const [buttonStatus, setButtonStatus] = useState('');
    const [flag, setflag] = useState('');
    const [fee, setfee] = useState<Number>();
    const [duration, setDuration] = useState<any>();
    const [suspend, setSuspend] = useState<number>();

    const [verifiedStatus, setVerifiedStatus] = useState({ verified_status: 1, id: '' });
    const [activeStatus, setActiveStatus] = useState({ active_status: 1, id: '' });

    const [consultantProfile, setConsultantProfile] = useState<any>({
        _id: "",
        title: "",
        unique_code: "",
        family_name: "",
        given_name: "",
        gender: "",
        DOB: "",
        email: "",
        document: "",
        contact_number: null,
        alternative_number: null,
        contact_number_isd: "",
        alternative_number_isd: "",
        contact_number_whatapp: null,
        preferred_type: [],
        verified_status: 0,
        active_status: 0,
        fees: 0,
        BasicDetails: {
            spoken_language: [],
            profession: "",
            id_number: "",
            id_number_attachment: "",
            year_of_experience: "",
            criminal_record: "",
            criminal_record_attachment: "",
            countryOfBirth: "",
            CorrespondenceLanguage: "",
            nationality: ""
        },
        AddressDetails: {
            house_number: "",
            street_name: "",
            street_name2: "",
            postal_code: null,
            CountryOfResidence: "",
            City: ""
        },
        BankDetails: {
            payment_currency: "",
            tax_information: "",
            bank_name: "",
            bank_Agency_name: "",
            agency_address: "",
            swift_code: "",
            account_number: null,
            branch_code: "",
            Iban: "",
            control_key: "",
            account_holder_name: "",
            account_currency: "",
            add_bank_information: "",
            CountryName: ""
        },
        EducationDetails: {
            gra_degree_name: "",
            gra_school_name: "",
            gra_year_of_graduation: "",
            gra_num_of_degree: "",
            gra_degree_attachment: "",
            post_degree_name: "",
            post_school_name: "",
            post_year_of_graduation: "",
            post_num_of_degree: "",
            post_degree_attachment: "",
            edu_resume: "",
            graduate_country: "",
            post_country: "",
            disorderName: [],
            SpecializationName: []
        },
        TimeSlot: {
            SlotTime: 10,
            Sunday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Monday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Tuesday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Wednesday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Thursday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Friday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            },
            Saturday: {
                day: "",
                morning: [],
                noon: [],
                afternoon: [],
                evening: [],
                night: []
            }
        },
        ProfileAndKeyword: {
            profile_img: "",
            bio: "",
            intro_vedio: "",
            KeywordsName: [],
            ObjectivesName: []
        },
        Certificates: [],
        SpokenLanguageName: []
    })

    useEffect(() => {
        AdminApi.simpleGet(`consultant/get-consultant-single-record?userId=${id}`, token)
            .then((res) => {
                setConsultantProfile(res)
                setSuspend(res.active_status);
                setCheckedVerifiedStatus(res.verified_status);
                setfee(res.fees);
                setDuration(res?.TimeSlot?.SlotTime);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [id, token]);

    const verifyConsultant = (check, id, buttonStatu, suspend?: number) => {
        setButtonStatus(buttonStatu);
        setSuspend(suspend);
        AdminApi.getConsultantList('consultant/view', token)
            .then((datas) => {
                const result = datas.find((item) => item._id === id);

                if (result) {
                    const status = result.verified_status;
                    buttonStatu === 'verified_status' ? setVerifiedStatus({ verified_status: status === 0 && 1, id: id }) : setActiveStatus({ active_status: suspend, id: id });
                    setVisibleConfirmVerify(false);
                    setCheckedVerifiedStatus(status);
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    useEffect(() => {
        const status = buttonStatus === 'verified_status' ? verifiedStatus : activeStatus;
        const url = buttonStatus === 'verified_status' ? 'consultant/verify' : 'consultant/status';
        if (!isFirstRender && status.id) {
            const urlSearchParams = new URLSearchParams();
            for (const key in status) {
                urlSearchParams.append(key, status[key]);
            }
            const formData = urlSearchParams.toString();
            AdminApi.createPost(formData, url, token).then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    if (buttonStatus === 'verified_status') {
                        // eslint-disable-next-line no-restricted-globals
                        setTimeout(() => location.reload(), 100)
                    }
                    openNotificationWithIcon({ type: 'success', message });
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            }).catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
        } else {
            setIsFirstRender(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStatus, verifiedStatus, buttonStatus, token]);

    const submitData = (data: IAdminPanel) => {
        const Fee = data?.data?.fees;
        const Duration = data?.SlotTime;

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', visibleModal ? visibleModal : visibleDuration);
        visibleModal ? urlSearchParams.append('fees', Fee) : urlSearchParams.append('SlotTime', Duration.toString());

        const formData = urlSearchParams.toString();
        let url = (flag === 'fees') ? 'consultant/add-fees' : 'consultant/add-session-time';
        AdminApi.createPost(formData, url, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    setVisibleModal(undefined);
                    setVisibleDuration(undefined);

                    if (['consultant/add-fees', 'consultant/add-session-time'].includes(url)) {
                        // eslint-disable-next-line no-restricted-globals
                        setTimeout(() => location.reload(), 100)
                    }
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            }).catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    const handleCancelDuration = () => {
        setVisibleDuration(undefined);
    };


    function addDuration(id, flag) {
        setVisibleDuration(id);
        setflag(flag);
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <div onClick={() => verifyConsultant(!checkedActiveStatus, id, 'active_status', 1)}>
                Active
            </div>
        },
        {
            key: '2',
            label: <div onClick={() => verifyConsultant(!checkedActiveStatus, id, 'active_status', 0)}>
                Deactive
            </div>
        },
        {
            key: '3',
            label: <div onClick={() => verifyConsultant(!checkedActiveStatus, id, 'active_status', 2)}>
                Suspend
            </div>
        }
    ];

    return (
        <section>
            <Link style={{ gap: '10px', color: '#626364' }} className='d-flex align-items-center paragraph-text' to='/admin/consultant'>
                <ArrowLeftOutlined style={{ fontSize: '150%' }} />
                <span className='text-md'>Back to Search Result</span>
            </Link>
            <Card className='mt-5 shadow_consultant'>
                <div className='row'>
                    <div className='col-md-4 col-12'>
                        <Image
                            src={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.ProfileAndKeyword?.profile_img}`}
                            className='rounded-full'
                            alt='Consultant Profile Picture'
                            fallback={Anonymous}
                        />
                    </div>
                    <div className='col-md-8 col-12'>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between">
                                    <div className='h2 m-0'>{consultantProfile?.given_name}</div>
                                    <div>
                                        <Button shape='round' disabled={checkedVerifiedStatus !== 0} className={`${checkedVerifiedStatus === 0 ? 'bg-danger' : 'bg-success'} mx-2`} onClick={() => setVisibleConfirmVerify(true)}>
                                            {checkedVerifiedStatus === 0 ? 'Verify' : 'Verified'}
                                        </Button>
                                    </div>
                                </div>
                                {(checkedVerifiedStatus && fee) ? <div className='h4'><span className='paragraph-text'>€{`${fee}`}/Session</span></div> : null}

                            </div>
                            <div className="col-md-6" style={{ fontSize: 15 }}>
                                <div className='row align-items-center mb-3'>
                                    <div className='col-4 col-auto font-weight-bold'>Age</div>
                                    <div className='col-8 col-auto paragraph-text'>
                                        <div>{CalculateAge(consultantProfile?.DOB)} Years</div>
                                    </div>
                                </div>
                                <div className='row align-items-center mb-3'>
                                    <div className='col-4 col-auto font-weight-bold'>Experience</div>
                                    <div className='col-8 col-auto paragraph-text'>
                                        {consultantProfile?.BasicDetails?.year_of_experience || 0} Years
                                    </div>
                                </div>
                                <div className='row align-items-center'>
                                    <div className='col-4 col-auto font-weight-bold'>Location</div>
                                    <div className='col-8 col-auto paragraph-text'>
                                        <div>
                                            {consultantProfile?.AddressDetails?.City},{` `}
                                            {consultantProfile?.AddressDetails?.CountryOfResidence}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <p className='my-2 p-0'><b>Contact Number : </b>{consultantProfile?.contact_number || 'Not Mentioned'}</p>
                                <p className='my-2 p-0'><b>Email : </b>{consultantProfile?.email || 'Not Mentioned'}</p>
                            </div>
                            <div className="col-12">
                                <div className="d-flex gap-1">
                                    {checkedVerifiedStatus ? <Button shape='round' type='primary' onClick={() => { setVisibleModal(id); setflag('fees') }}>
                                        Add Fees
                                    </Button> : null}

                                    {checkedVerifiedStatus ? <Button shape='round' className='mx-2' type='primary' onClick={() => addDuration(id, 'Duration')}>
                                        Add Duration
                                    </Button> : null}

                                    {consultantProfile?.document ? <a className='ant-btn css-dev-only-do-not-override-1pem0an ant-btn-round ant-btn-primary' href={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.document}`} target="_blank" rel="noopener noreferrer"> Contract Doc </a> : null}

                                    {(checkedVerifiedStatus && fee && duration) ? <Dropdown menu={{ items }} placement='bottomLeft' className={`${suspend === 2 ? 'bg-danger' : suspend === 1 ? 'bg-success' : 'bg-danger'} mx-2`}>
                                        <Button aria-label='Status Active Deactive Suspend Changed' shape='round'>
                                            {suspend === 0 ? 'Deactive' : suspend === 1 ? 'Active' : 'Suspend'}
                                        </Button>
                                    </Dropdown> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <ConsultantSingleTable consultantProfile={consultantProfile} />

            <Modal open={visibleModal ? true : false} footer={null} onCancel={handleCancel} className='d-flex ' title={<h3 className='title text-center'>{`Enter ${flag}`}</h3>}>
                <Form layout='vertical' className='w-100' onSubmitCapture={handleSubmit(submitData)} >
                    <FormItem label='Fees (in €)'>
                        <Controller
                            render={({ field }) => <Input placeholder={`Enter Fees`} className='input ' type='number' min={1} step={1} aria-label='Fees' aria-describedby='Enter Fees' {...field} />}
                            name='data.fees'
                            control={control}
                            rules={{
                                min: {
                                    value: 1,
                                    message: 'Min value shoud be 1.',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Please enter a valid integer',
                                },
                                required: 'Fees is Required'
                            }}
                            defaultValue={fee}
                        />
                        <span className='text-danger px-3'>{JSON.stringify(errors?.data?.fees?.message)}</span>
                    </FormItem>
                    <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
                </Form>
            </Modal>

            <Modal open={visibleDuration ? true : false} footer={null} onCancel={handleCancelDuration} className='d-flex ' title={<h3 className='title text-center'>{`Enter ${flag}`}</h3>}>
                <Form layout='vertical' className='w-100' onSubmitCapture={handleSubmit(submitData)}>
                    <FormItem label='Duration (min)'>
                        <Controller
                            render={({ field }) => <Input placeholder={`Enter Duration (min)`} className='input' min={1} step={1} type='number' aria-label='Duration (min)' aria-describedby={`Enter Duration (min)`} {...field} />}
                            name='SlotTime'
                            control={control}
                            rules={{
                                min: {
                                    value: 1,
                                    message: 'Min value shoud be 1.',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Please enter a valid integer',
                                },
                                required: 'SlotTime is Required'
                            }}
                            defaultValue={duration}
                        />
                        <span className='text-danger px-3'>{JSON.stringify(errors?.SlotTime?.message)}</span>
                    </FormItem>
                    <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
                </Form>
            </Modal>

            <Modal open={visibleConfirmVerify} footer={null} onCancel={() => setVisibleConfirmVerify(false)} className='d-flex' title={<h4 className='title text-center'>Do you want to Verify?</h4>}>
                <Button shape='round' aria-label='Confirm' type='primary' onClick={() => verifyConsultant(checkedVerifiedStatus, id, 'verified_status')}>
                    Confirm
                </Button>
                <Button aria-label='Cancel' shape='round' type='primary' onClick={() => setVisibleConfirmVerify(false)} danger>
                    Cancel
                </Button>
            </Modal>

        </section>
    );
};

export default ConsultantSingleProfile;
