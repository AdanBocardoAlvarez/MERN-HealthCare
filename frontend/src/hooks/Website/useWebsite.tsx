import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IConsultantProfile } from '../../interfaces/Consultant/consultantprofile';
import { AppState } from '../../redux/store';
import { ClientApi } from '../../api/api';
import { IDigitalProduct } from '../../interfaces/Admin/digitalProduct';
import { IOTPVerification } from '../../interfaces/main-page';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useConsultantProfileWeb(
    url: string
): [IConsultantProfile, React.Dispatch<IConsultantProfile>] {
    const [state, setState] = useState<IConsultantProfile>();
    const token = useSelector((state: AppState) => state.consultant.Token);
    useEffect(() => {
        ClientApi.getMyProfileConsultantSingle(url, token)
            .then((res) => { setState(res); })
            .catch((err) => { openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message }); });
    }, [url, token]);

    return [state, setState];
}

export function useTermsCondition(url: string): [IDigitalProduct[], React.Dispatch<any>] {
    const [state, setState] = useState<IDigitalProduct[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        ClientApi.getLifestyleList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => { openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message }); });
    }, [url, token]);

    return [state, setState];
}

export function useVerifyApi(url: string): [IOTPVerification, React.Dispatch<any>] {
    const [state, setState] = useState<IOTPVerification>();
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        const Fetch = async () => {
            await ClientApi.getVerifyClient(url, token)
                .then((res) => {
                    if (res) {
                        setState(res);
                    }
                })
                .catch((err) => { openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message }); });
        };
        Fetch();
    }, [url, token]);

    return [state, setState];
}
