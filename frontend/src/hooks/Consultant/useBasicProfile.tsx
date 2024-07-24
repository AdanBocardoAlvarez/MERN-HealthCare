import { useEffect, useState } from 'react';
import { ConsultantApi } from '../../api/api';
import { ICountry, ILang, ICity } from '../../interfaces/Consultant/consultant-step1';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useGetApi(url: string): [ILang[], React.Dispatch<any>] {
	const [state, setState] = useState<ILang[]>([]);
	const token = useSelector((state: AppState) => state.consultant.Token);
	useEffect(() => {
		ConsultantApi.getLang(url, token)
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

export function useGetCountry(url: string): [ICountry[], React.Dispatch<any>] {
	const [state, setState] = useState<ICountry[]>([]);
	const token = useSelector((state: AppState) => state.consultant.Token);
	useEffect(() => {
		ConsultantApi.getCountry(url, token)
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

export function useGetCity(url: string): [ICity[], React.Dispatch<any>] {
	const [state, setState] = useState<ICity[]>([]);
	const token = useSelector((state: AppState) => state.consultant.Token);
	useEffect(() => {
		ConsultantApi.getCity(url, token)
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
