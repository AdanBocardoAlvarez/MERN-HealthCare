import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import WaitForApprove from './Screens/WaitForApprove';
import AfterApproved from './Screens/AfterApproved';
import { ConsultantApi } from '../../../api/api';
import { openNotificationWithIcon } from '../../components/Toast';
import { useTranslation } from 'react-i18next';


const ConsultantDashboardPage = () => {

    const { t } = useTranslation();
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [data, setData] = useState({
        client_count: 0,
        today_session_count: 0,
        next_week_sessions: [],
        next_appointment: null,
        user: {
            title: "",
            family_name: "",
            given_name: "",
            user_id: "",
            unique_code: "",
            email_id: "",
            contact_number: "",
            gender: "Male",
            verified_status: null,
            active_status: null,
        },
    });

    useEffect(() => {
        ConsultantApi.getDashbaord('get-dashboard', token)
            .then((res) => {
                setData(prev => ({ ...prev, ...res }));
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [token]);

    return (
        <>
            {data?.user?.active_status === 0 && <WaitForApprove />}
            {data?.user?.active_status === 1 && <AfterApproved data={data} />}
            {data?.user?.active_status === null && <div className='row'>
                <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: 250 }}>
                        <h3 className=''>{t('loading')}...</h3>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ConsultantDashboardPage;
