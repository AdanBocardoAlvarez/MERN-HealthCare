import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { openNotificationWithIcon } from "../../../components/Toast";
import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/store";
import { Doctor } from '../../../../assets/img/index';
import { ClientApi } from "../../../../api/api";
import { Button, Image, Modal, Spin } from "antd";
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Header from "../../../../layout/website/Header/Header";
import { decryptString, myMoment } from "../../../../utils/helper";
import { useTranslation } from "react-i18next";
import Stripe from "./Stripe";
import Paypal from "./Paypal";
import StripeWrapper from "./Wrappers/StripeWrapper";
import PaypalWrapper from "./Wrappers/PaypalWrapper";

const Booking = () => {

    const { token } = useParams();
    const { t } = useTranslation();

    const navigate = useNavigate();
    const authToken = useSelector((state: AppState) => state.client.Token);

    const [data, setData] = useState<any>({})
    const [client, setClient] = useState({ clientSecret: null, clientName: null, clientEmail: null, paymentRecord: null })
    const [paymentStatus, setPaymentStatus] = useState(0)
    const [decodedData, setDecodedData] = useState({ consultant_id: null, bookingDate: '' })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                let decoded = await decryptString(token);
                decoded = JSON.parse(decoded);
                setDecodedData({ ...decoded, bookingDate: decoded.bookingDate })
                let res = await ClientApi.getMyProfileConsultantSingle(`get-single-consultant-record-2?userId=${decoded.consultant_id}`, authToken)
                setData(res);
                setClient({ clientSecret: null, clientName: null, clientEmail: null, paymentRecord: null });
                setIsLoading(false)
            } catch (err: any) {
                openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message || `Something Went Wrong..!!` });
                navigate('/our-experts');
            }
        })()
    }, [token, navigate, authToken]);

    return (
        <>
            <Spin spinning={isLoading}>
                <Header />
                <section className="min-vh-100" style={{ backgroundColor: "#E3E3E3" }}>
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="card">
                                    <div className="card-body bg-white h-100">
                                        <h4 className="text-center my-2"> <VideoCameraOutlined /> {t('payment.video-call-appointment')}</h4>
                                        <h5 className="d-flex flex-wrap justify-content-around h6">
                                            <span> <CalendarOutlined /> On {myMoment(decodedData.bookingDate, data?.timezone).format('MMMM Do YYYY,  dddd')}</span>
                                            <span> <ClockCircleOutlined /> At {myMoment(decodedData.bookingDate, data?.timezone).format('hh:mm A | z')}</span>
                                        </h5>
                                        <div className='d-flex flex-wrap justify-content-center'>
                                            <div className="p-3">
                                                <Image
                                                    src={`${process.env.REACT_APP_API_BASE_URL}${data?.ProfileAndKeyword?.profile_img}`}
                                                    style={{ width: 180, height: 180, objectFit: 'cover' }}
                                                    alt='Consultant Picture'
                                                    className="rounded-2"
                                                    fallback={Doctor}
                                                />
                                            </div>
                                            <div className='d-flex flex-column gap-2 text-align-left px-4'>
                                                <div className='h4 fw-bold mb-0'>{data?.title} {data?.given_name}</div>
                                                <p className='m-0 p-0 fs-6'>{data?.BasicDetails?.profession}</p>
                                                <p className='m-0 p-0 fs-6'>{data?.BasicDetails?.year_of_experience} years of experience</p>
                                                <p className='m-0 p-0 fs-6'>
                                                    <b>{t('language')} :  </b> {data?.BasicDetails?.SpokenLanguage?.length > 0 ? data?.BasicDetails?.SpokenLanguage?.join(', ') : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <StripeWrapper>
                                    <Stripe
                                        decodedData={decodedData}
                                        client={client}
                                        setClient={setClient}
                                        setPaymentStatus={setPaymentStatus}
                                        setIsLoading={setIsLoading} />
                                </StripeWrapper>
                                <PaypalWrapper>
                                    <Paypal
                                        decodedData={decodedData}
                                        client={client}
                                        setClient={setClient}
                                        setPaymentStatus={setPaymentStatus}
                                        setIsLoading={setIsLoading} />
                                </PaypalWrapper>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin >

            <Modal
                open={[1, 2].includes(paymentStatus)}
                footer={null}
                closeIcon={null}
                maskClosable={false}
                className='d-flex justify-content-center'
            >
                <div className='p-5 mx-auto'>
                    <div className='text-center'>
                        {paymentStatus === 1 && <CheckCircleOutlined style={{ fontSize: '80px', color: 'green' }} />}
                        {paymentStatus === 2 && <CloseCircleOutlined style={{ fontSize: '80px', color: 'red' }} />}
                    </div>
                    <div className='my-3 h5'>
                        {paymentStatus === 1 && 'Payment Successsful.!!'}
                        {paymentStatus === 2 && 'Payment Failed..!!'}
                    </div>
                    <div className='text-center'>
                        <Button onClick={() => {
                            navigate('/client/my-booking')
                        }}>Okay</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Booking