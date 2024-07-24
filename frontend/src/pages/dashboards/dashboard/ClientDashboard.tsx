import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import FormItem from 'antd/es/form/FormItem';
import { CalendarOutlined, ClockCircleOutlined, LinkOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Form, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppState } from '../../../redux/store';
import { ClientApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../components/Toast';
import { getAge } from '../../../utils/dob';
import { myMoment } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

const ClientDashboardPage = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm();
    const token = useSelector((state: AppState) => state.client.Token);
    const [data, setData] = useState({
        next_appointment: false,
        next_appointment_: {
            _id: "",
            consultant_bookid: "",
            client_bookid: "",
            fees: "",
            book_date: "",
            book_time: "",
            orderId: "",
            InvoicNumber: "",
            consultant_title: "",
            consultant_unique_code: "",
            consultant_family_name: "",
            consultant_given_name: "",
            consultant_gender: "",
            consultant_DOB: "",
            consultant_profession: "",
            consultant_year_of_experience: "",
            consultant_language: "",
            consultant_profile_img: "",
            last_connect: null
        },
        user: {
            title: "",
            profession: '',
            family_name: "",
            given_name: "",
            user_id: "",
            unique_code: "",
            email: "",
            contact_number: "",
            gender: "",
            DOB: "",
            timezone: "",
            profile_image: "",
            verified_status: null,
            active_status: null,
            is_live_chat: false,
        },
    });

    const [currentTime, setCurrentTime] = useState(myMoment(undefined, data?.user?.timezone).format('LTS'));

    useEffect(() => {
        setInterval(() => { data?.user?.timezone && setCurrentTime(myMoment(undefined, data?.user?.timezone).format('LTS')) }, 1000)
    }, [data?.user?.timezone]);

    useEffect(() => {
        ClientApi.simpleGet('get-dashboard', token)
            .then((res) => { setData(prev => (res)) })
            .catch((err) => { openNotificationWithIcon({ type: 'error', message: err?.response?.data?.message || err.message }) });
    }, [token]);

    const SubmitData = (data) => navigate({ pathname: '/our-experts', search: `?search=${data?.search}` });

    return <div className="container">
        <h3 className="mb-3 mt-0 text-dark text-center">{t('about-us.welcome-to')} <span className="gradent-text">{t('vhealthy')}</span></h3>
        <div className='justify-content-center mb-lg-4 mb-2'>
            <Form layout='vertical' onSubmitCapture={handleSubmit(SubmitData)}>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 mx-auto' style={{ position: 'relative' }}>
                        <FormItem>
                            <Controller
                                name='search' control={control}
                                render={({ field }) => <div className='position-relative'>
                                    <Input placeholder={t('cnt.search-for-expert-here')} className='rounded-1 bg-white' type='text' {...field} />
                                    <SearchOutlined style={{ fontSize: '20px', position: 'absolute', right: 14, top: 11 }} />
                                </div>}
                            />
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0 order-2 order-lg-1">
                <div className="card card-shadow rounded-7 min-h-500">
                    <div className="card-body">
                        <div className='text-center h-100'>
                            <h3 className='text-dark'>{t('cnt.your-profile')}</h3>
                            <Avatar src={`${process.env.REACT_APP_API_BASE_URL}${data?.user?.profile_image}`} alt="User Image" size={140} />
                            <div className='py-3'>
                                <h5 className='my-0 py-0 text-dark'>{`${data?.user?.title} ${data?.user?.given_name} ${data?.user?.family_name}`.trim()}</h5>
                                <p className='my-0 py-0'>{data?.user?.profession}</p>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item mb-1 border rounded-3 text-start">
                                    <span><b>{t('email')} :</b> {data?.user?.email} </span>
                                </li>
                                <li className="list-group-item mb-1 border rounded-3 text-start">
                                    <span><b>{t('mobile')} :</b> {data?.user?.contact_number} </span>
                                </li>
                                <li className="list-group-item mb-1 border rounded-3 text-start">
                                    <span><b>{t('age')} :</b> {getAge(data?.user?.DOB)} {t('years')} </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-footer border-0 bg-white rounded-7">
                        <div className='mt-auto mb-0 text-center'>
                            <Link to="/client/general-info" className="btn btn-grad fw-normal my-2 px-5">{t('update-profile')}</Link>
                            <a href="https://www.youtube.com/playlist?list=PL7bT1Z2aI7GZcRk7MJMv-1yAlrSZWm1-4" target="_blank" rel="noopener noreferrer" className="btn btn-grad fw-normal my-2">{t('cons.watch-the-instruction-video')}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-8 mb-4 mb-lg-0 order-1 order-lg-2">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card card-shadow rounded-7">
                            <div className="card-body p-4 background-dashboard-card">
                                <h5 className='my-0 fs-5 text-dark'>{t('cnt.dash-line-1')}</h5>
                                <h5 className='my-0 fs-5 text-dark'>{t('cnt.dash-line-2')}</h5>
                                <h5 className='my-0 fs-5 text-dark'>{t('cnt.dash-line-3')}</h5>
                                <h5 className='my-0 fs-5 text-dark'>{t('cnt.dash-line-4')}</h5>
                                <Link to="/our-experts" className="btn btn-grad btn-lg mt-3">{t('connect')}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h4 className="gradent-text mt-2 mb-3">{t('time-zone')}</h4>
                        <div className="card card-shadow rounded-7">
                            <div className="card-body py-4">
                                <h5 className='text-dark my-3 ms-2'><ClockCircleOutlined className='me-2' /> {currentTime}</h5>
                                <h5 className='text-dark my-3 ms-2'><CalendarOutlined className='me-2' />{myMoment(undefined, data?.user?.timezone).format('ll')}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <h4 className="gradent-text">{t('your-experts')}</h4>
                        <div className="card card-shadow rounded-7">
                            <div className="card-body">
                                {data?.next_appointment !== null && data?.next_appointment !== false && <NextAppointment data={data?.next_appointment} />}
                                {data?.next_appointment === null && <NoRecord />}
                                {data?.next_appointment === false && <h5 className='text-center my-5'> <LoadingOutlined className='me-3' /> {t('loading')}...</h5>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

const NextAppointment = ({ data }) => {
    const { t } = useTranslation();
    return <div className="d-flex flex-wrap justify-content-center">
        <div className='text-center' style={{ minWidth: 200 }}>
            <Avatar size={80} src={data?.consultant_profile_img} />
            <h5 className='py-0 my-2 text-dark'>{`${data?.consultant_title} ${data?.consultant_given_name} ${data?.consultant_family_name}`.trim()}</h5>
            <p className='mt-0 mb-1 py-0 fw-bold'>{data?.consultant_profession}</p>
            <p className='mt-0 mb-1 py-0'>{t('language')} : {data?.consultant_language}</p>
            <p className='mt-0 mb-1 py-0'>{t('experience')} : {data?.consultant_year_of_experience} Years</p>
        </div>
        <div className="flex-grow-1">
            <div className="d-flex flex-wrap justify-content-around mb-5">
                <div className='mb-2'>
                    <h5 className='my-2'>{t('appointed-day')}</h5>
                    <p className='border border-2 text-center fw-bold px-3 py-2 rounded-3'><CalendarOutlined className='me-2' /> {data.book_date}</p>
                </div>
                <div className='mb-2'>
                    <h5 className='my-2'>{t('appointed-time')}</h5>
                    <p className='border border-2 text-center fw-bold px-3 py-2 rounded-3'><ClockCircleOutlined className='me-2' /> {data.book_time}</p>
                </div>
            </div>
            <div className='text-center'>
                {data.last_connect && <h5 className='my-2'>{t('last-checked')} <span className="text-muted">On {data.last_connect} </span></h5>}
                {data.is_live_chat ?
                    <Link to={`/chat-room/${data._id}`} className="btn btn-lg btn-grad px-5"><LinkOutlined className='me-2' /> {t('join')}</Link> :
                    <button className="btn btn-lg btn-grad px-5" disabled><LinkOutlined className='me-2' /> {t('join')}</button>}
            </div>
        </div>
    </div>
}


const NoRecord = () => {
    const { t } = useTranslation();
    return <div className='p-4'>
        <h4 className='text-center'>{t('no-data-available')}</h4>
        <h5 className='text-center py-0 my-2' dangerouslySetInnerHTML={{ __html: t('please-book') }}></h5>
        <div className="text-center">
            <Link to="/our-experts" className="btn btn-grad btn-lg mt-3">{t('connect')}</Link>
        </div>
    </div>
}

export default ClientDashboardPage;
