import { useState, useEffect } from 'react';
import { ClientApi } from '../../api/api';
import { IClienttBooking } from '../../interfaces/Client/client-state';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { INationality } from '../../interfaces/Consultant/consultant-step1';
import { IComplaintTypeClient, IGetClientComplaintList } from '../../interfaces/Client/client';
import { IGetClientListConsultant } from '../../interfaces/Consultant/consultant';
import { IDigitalProduct } from '../../interfaces/Admin/digitalProduct';
import { IBlogList } from '../../interfaces/main-page';
import { openNotificationWithIcon } from '../../pages/components/Toast';
export function useGetConsultantApi(url: string): [any[], React.Dispatch<any>] {
    const [state, setState] = useState([]);
    const token = useSelector((state: AppState) => state.client.Token);
    useEffect(() => {
        ClientApi.getConsultantAll(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useClientMyBooking(url: string): [IClienttBooking[], React.Dispatch<any>] {
    const [state, setState] = useState<IClienttBooking[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        ClientApi.getMyBookingList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useLifestyleProduct(url: string): [IDigitalProduct[], React.Dispatch<any>] {
    const [state, setState] = useState<IDigitalProduct[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        ClientApi.getLifestyleList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useDisplayBlog(url: string): [IBlogList[], React.Dispatch<any>] {
    const [state, setState] = useState<IBlogList[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        ClientApi.getDisplayBlog(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useBlogSingleGetApi(url: string): [IBlogList[], React.Dispatch<any>] {
    const [state, setState] = useState<IBlogList[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        const Fetch = async () => {
            await ClientApi.getBlogProfile(url, token)
                .then((res) => {
                    if (res) {
                        setState(res);
                    }
                })
                .catch((err) => {
                    const message = err?.response?.data?.message || err.message;
                    openNotificationWithIcon({ type: 'error', message: message });
                });
        };
        Fetch();
    }, [url, token]);

    return [state, setState];
}

export function useGetComplaintClientType(
    url: string
): [IComplaintTypeClient[], React.Dispatch<any>] {
    const [state, setState] = useState<IComplaintTypeClient[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);
    useEffect(() => {
        ClientApi.getComplaintTypeList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}
export function useGetConsultantNameClient(
    url: string
): [IGetClientListConsultant[], React.Dispatch<IGetClientListConsultant[]>] {
    const [state, setState] = useState<IGetClientListConsultant[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        ClientApi.getConsultantName(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useGetNationality(url: string): [INationality[], React.Dispatch<any>] {
    const [state, setState] = useState<INationality[]>([]);
    const token = useSelector((state: AppState) => state.consultant.Token);
    useEffect(() => {
        ClientApi.getNationality(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}

export function useGetComplaintClientList(
    url: string
): [IGetClientComplaintList[], React.Dispatch<IGetClientComplaintList[]>] {
    const [state, setState] = useState<IGetClientComplaintList[]>([]);
    const token = useSelector((state: AppState) => state.client.Token);
    useEffect(() => {
        ClientApi.getComplaintClientList(url, token)
            .then((res) => {
                if (Array.isArray(res)) setState(res)
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, [url, token]);

    return [state, setState];
}
