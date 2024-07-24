import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import anonymousClientImg from './../../../../assets/img/anonymous-400.png';
import { Image } from 'antd';
import { CalculateAge } from '../../../../utils/dob';
import { myMoment, strLimit } from '../../../../utils/helper';
import { Doctor } from '../../../../assets/img';
import { useTranslation } from 'react-i18next';

const AfterApproved = ({ data: { user, client_count = 0, today_session_count = 0, next_week_sessions = [], next_appointment = null } }) => {

    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = useState(myMoment(undefined, user.timezone).format('LTS'));
    useEffect(() => {
        setInterval(() => user.timezone && setCurrentTime(myMoment(undefined, user.timezone).format('LTS')), 1000)
    }, [user.timezone]);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-3 mb-4 mb-lg-0 order-3 order-lg-1">
                    <br className='my-0 my-lg-3' />
                    <div className="card card-shadow rounded-7 min-h-500">
                        <div className="card-body">
                            <div className='text-center h-100'>
                                <Image src={user?.profile_img} alt="User Image" fallback={Doctor} className='w-60 rounded-circle border border-2' />
                                <h5 className='text-dark'>{`${user.title} ${user.given_name}`}</h5>
                                <ul className="list-group">
                                    <li className="list-group-item mb-1 border rounded-3 text-start">
                                        <a className='text-dark' href="!#">{t('cons.health-assessment')}</a>
                                    </li>
                                    <li className="list-group-item mb-1 border rounded-3 text-start">
                                        <a className='text-dark' href="!#">{t('cons.notes-post-meeting')}</a>
                                    </li>
                                    <li className="list-group-item mb-1 border rounded-3 text-start">
                                        <a className='text-dark' href="!#">{t('cons.webinars')}</a>
                                    </li>
                                </ul>
                                <Link to="/consultant/edit-account" className="btn btn-grad fw-normal my-3 px-5">{t('cons.set-up-profile')}</Link>
                            </div>
                        </div>
                        <div className="card-footer border-0 bg-white rounded-7">
                            <div className='mt-auto mb-0 text-center'>
                                <a href="https://www.youtube.com/playlist?list=PL7bT1Z2aI7GZcRk7MJMv-1yAlrSZWm1-4" target="_blank" rel="noopener noreferrer" className="btn btn-grad fw-normal my-3">{t('cons.watch-the-instruction-video')}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2">
                    <br className='my-0 my-lg-3' />
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-lg-0">
                            <div className="card card-shadow rounded-7">
                                <div className="card-body py-4 px-3">
                                    <h5 className='py-0 my-0 text-dark'>{t('cons.visit-for-today')}</h5>
                                    <h2 className='py-0 my-2 text-purple'>{today_session_count}</h2>
                                    <p className='my-0 py-0 '>{t('cons.total-users')}</p>
                                    <p className='my-0 py-0 fw-bold text-dark fs-5'>{client_count}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-lg-0">
                            <div className="card card-shadow rounded-7">
                                <div className="card-body p-4">
                                    <h5 className='py-0 my-0 text-dark'>{t('time-zone')}</h5>
                                    <h3 className='py-0 my-3'>{currentTime}</h3>
                                    <h5 className='py-0 my-2' style={{ fontSize: '1.3rem' }}>{myMoment(undefined, user.timezone).format('LL | z')}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <h5 className='text-dark mb-3'>{t('cons.upcoming-booking-for-the-week')}</h5>
                            <div className="card card-shadow rounded-7">
                                <div className="card-body p-0">
                                    <div className="table-responsive" style={{ minHeight: 260 }}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className='border-top-0' scope="col">{t('cons.order-id')}</th>
                                                    <th className='border-top-0' scope="col">{t('name')}</th>
                                                    <th className='border-top-0' scope="col">{t('date')} ({myMoment(undefined, user.timezone).format('z')})</th>
                                                    <th className='border-top-0' scope="col">{t('contact')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {next_week_sessions.slice(0, 5).map((row, i) => (
                                                    <tr key={i}>
                                                        <td>{row?.orderId}</td>
                                                        <td>{`${row?.client_title} ${row?.client_name}`}</td>
                                                        <td>{row?.book_date}</td>
                                                        <td>{row?.client_mobile}</td>
                                                    </tr>
                                                ))}

                                                {next_week_sessions.length === 0 && <tr>
                                                    <td colSpan={5} className='text-center'>
                                                        <div className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: 180 }}>
                                                            <h5 className='my-3'>{t('no-records')}</h5>
                                                            <p className='text-gray'>{t('cons.you-will-start-receiving-the-appointments')}</p>
                                                        </div>
                                                    </td>
                                                </tr>}

                                                {next_week_sessions.length > 5 && <tr>
                                                    <td colSpan={5} className='text-center py-2'>
                                                        <Link to="/consultant/my-booking" className="btn btn-link">{t('cons.show-more')}</Link>
                                                    </td>
                                                </tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 mb-4 mb-lg-0 order-2 order-lg-3">
                    <h5 className='py-0 mt-0 mb-3 text-dark text-center'>{t('cons.next-appointment')}</h5>
                    <div className="card card-shadow rounded-7 min-h-500">
                        <div className="card-body p-4">
                            {next_appointment ? <div>
                                <div className="text-center mb-3">
                                    <Image style={{ width: 100, height: 100, objectFit: 'contain', aspectRatio: 1 }} src={`${process.env.REACT_APP_API_BASE_URL}${next_appointment?.profile_image}`}
                                        alt="" className='avatar-1' fallback={anonymousClientImg} />
                                    <h5 className='my-0 py-0'>{`${next_appointment?.client_title} ${next_appointment?.client_name}`}</h5>
                                    <p className='my-0 py-0'>{next_appointment?.client_gender}</p>
                                    <p className='my-0 py-0'>{t('age')} : {CalculateAge(next_appointment?.client_dob)} years</p>
                                </div>
                                <div className='mb-3'>
                                    <p className="fw-bold text-dark my-0 py-0">{t('cons.last-checked')}</p>
                                    <p className='my-0 py-0'>
                                        {next_appointment?.lastChecked}
                                    </p>
                                </div>
                                <div className='mb-3'>
                                    <p className="fw-bold text-dark my-0 py-0">{t('cons.observation')}</p>
                                    <p className='my-0 py-0'>
                                        {strLimit(next_appointment?.observation, 200)}
                                    </p>
                                </div>
                                <div>
                                    <p className="my-2 py-0"> <b className='text-dark'>{t('time')} - </b> {next_appointment?.book_date} </p>
                                </div>
                            </div> : <div className="text-center no-record d-nonwe">
                                <h5 className='text-dark'>{t('no-record')}</h5>
                                <p>{t('cons.you-will-start-receiving-the-appointments')} </p>
                            </div>}

                        </div>
                        <div className="card-footer border-0 bg-white rounded-7">
                            <div className='mt-auto mb-0 text-center'>
                                <button className="btn btn-grad fw-normal my-3 px-5">{t('cons.reschedule')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AfterApproved