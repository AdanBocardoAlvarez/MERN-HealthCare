import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ClientApi, ConsultantApi } from '../../../api/api';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { openNotificationWithIcon } from '../Toast';
import { randomID } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

const Room = () => {

    const { roomid } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const userName = 'Your Name';

    const clientToken = useSelector((state: AppState) => state.client.Token);
    const ConsultantToken = useSelector((state: AppState) => state.consultant.Token);

    const onError = useCallback((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });

        if (clientToken) navigate('/client/my-booking');
        if (ConsultantToken) navigate('/consultant/my-booking');
        navigate('/public/sign-in');
    }, [clientToken, ConsultantToken, navigate]);

    const onSuccess = useCallback((data) => {
        // 
    }, [])

    useEffect(() => {

        if (!clientToken && !ConsultantToken) {
            openNotificationWithIcon({ type: 'error', message: "Unauthorized access..!!" });
            navigate('/public/sign-in');
        }

        if (clientToken) ClientApi.simpleGet(`/get-zego-token/${roomid}`, clientToken).then(onSuccess).catch(onError);
        if (ConsultantToken) ConsultantApi.simpleGet(`/get-zego-token/${roomid}`, ConsultantToken).then(onSuccess).catch(onError);
    }, [navigate, clientToken, roomid, ConsultantToken, onSuccess, onError])

    let meetRef = async (element: HTMLDivElement) => {

        // generate Kit Token
        const appID = parseInt(process.env.REACT_APP_ZEGOCLOUD_APPID);
        const serverSecret = process.env.REACT_APP_ZEGOCLOUD_SERVERSECRET;

        var user_id = randomID(10)
        if (clientToken) user_id = `${roomid}_client`
        if (ConsultantToken) user_id = `${roomid}_consultant`

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid, user_id, userName);
        // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, serverSecret, user_id, roomid, userName);

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            showRoomTimer: true,
            // sharedLinks: [{ name: 'Personal Link', url: window.location.href }],
            scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
            onJoinRoom: () => {
                const formattedTime = new Date().toLocaleTimeString();
                console.log('join time', formattedTime);
            },
            onLeaveRoom: () => {
                const formattedTime = new Date().toLocaleTimeString();
                console.log('leave time', formattedTime);
            },
            onUserJoin: () => {
                console.log('user join');
            },
        });
    };

    return <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
        <div className="myCallContainer" ref={meetRef}>
            <button className='btn btn-lg btn-primary' onClick={() => window.location.reload()}>{t('please-click-here')}</button>
        </div>
        {clientToken && <Link className='btn btn-link mt-3' to="/client/my-booking"> <ArrowLeftOutlined /> {t('go-back')}</Link>}
        {ConsultantToken && <Link className='btn btn-link mt-3' to="/consultant/my-booking"> <ArrowLeftOutlined /> {t('go-back')}</Link>}
    </div>
}

export default Room