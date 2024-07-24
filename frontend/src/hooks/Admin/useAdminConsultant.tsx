/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { AdminApi } from '../../api/api';
import { IAuthor, IBlogGet, IDisorder } from '../../interfaces/Admin/blog';
import { IQuote } from '../../interfaces/Admin/quote';
import { IConsultant } from '../../interfaces/Consultant/consultant';
import { useState, useEffect } from 'react';
import { AppState } from '../../redux/store';
import { IAdminAllComplaint, IAdminPanel, IWaitingUserlist } from '../../interfaces/Admin/keyword';
// import { IDisorderList } from '../../interfaces/Admin/disorder';
import { AllBooking } from '../../interfaces/Admin/allbooking';
import { IComplaintTypeClient } from '../../interfaces/Client/client';
import { IDigitalProduct } from '../../interfaces/Admin/digitalProduct';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useAdminGetApi(url: string): [IConsultant[], React.Dispatch<any>] {
    const [state, setState] = useState<IConsultant[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getConsultantList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetAuthor(url: string): [IAuthor[], React.Dispatch<any>] {
    const [state, setState] = useState<IAuthor[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getAuthorList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetConsultantName(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetComplaintType(url: string): [IComplaintTypeClient[], React.Dispatch<any>] {
    const [state, setState] = useState<IComplaintTypeClient[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetClientName(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetDisorder(url: string): [IDisorder[], React.Dispatch<any>] {
    const [state, setState] = useState<IDisorder[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetBlog(url: string): {
    state: IBlogGet[];
    setState: React.Dispatch<React.SetStateAction<IBlogGet[]>>;
    refreshData: () => Promise<void>;
} {
    const [state, setState] = useState<IBlogGet[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    const fetchData = async () => {
        AdminApi.getBlogList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return { state, setState, refreshData: fetchData };
}

export function useGetDigitalProduct(url: string): {
    state: IDigitalProduct[];
    setState: React.Dispatch<React.SetStateAction<IDigitalProduct[]>>;
    refreshData: () => Promise<void>;
} {
    const [state, setState] = useState<IDigitalProduct[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    const fetchData = async () => {
        AdminApi.getBlogDigitalProduct(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return { state, setState, refreshData: fetchData };
}

export function useGetKeywords(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetLanguages(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetNationality(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetCountry(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetCity(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetObjectives(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetSpecialization(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetWatingUser(url: string): [IWaitingUserlist[], React.Dispatch<any>] {
    const [state, setState] = useState<IWaitingUserlist[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getCommanWating(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}



export function useGetFees(url: string, id: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComman(`${url}?id=${id}`, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useAdminGetDisorderList(url: string): [IAdminPanel[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminPanel[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    const fetchData = async () => {
        AdminApi.getComman(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return [state, setState];
}

export function useGetQuotes(url: string): [IQuote[], React.Dispatch<any>] {
    const [state, setState] = useState<IQuote[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    const fetchData = async () => {
        AdminApi.getQuotesList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return [state, setState];
}

export function useAllBooking(url: string): [AllBooking[], React.Dispatch<any>] {
    const [state, setState] = useState<AllBooking[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getMyAllBookingList(url, token)
            .then((res) => {
                setState(res);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}

export function useGetComplaint(url: string): [IAdminAllComplaint[], React.Dispatch<any>] {
    const [state, setState] = useState<IAdminAllComplaint[]>([]);
    const token = useSelector((state: AppState) => state.admin.Token);
    useEffect(() => {
        AdminApi.getComplaintList(url, token)
            .then((res) => {
                if (res.length !== 0) {
                    setState(res);
                } else setState([]);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }, []);

    return [state, setState];
}
