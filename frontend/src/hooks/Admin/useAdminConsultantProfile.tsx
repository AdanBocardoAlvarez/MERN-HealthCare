import { AdminApi } from '../../api/api';
import { useState, useEffect, useCallback } from 'react';
import { IConsultantProfile } from '../../interfaces/Consultant/consultantprofile';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { IClientSIngleProfile } from '../../interfaces/Consultant/clientProfile';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useConsultantSingleGetApi(
	url: string
): [IConsultantProfile[], React.Dispatch<any>] {
	const [state, setState] = useState<IConsultantProfile[]>([]);
	const token = useSelector((state: AppState) => state.admin.Token);
	useEffect(() => {
		const Fetch = async () => {
			await AdminApi.getConsultantProfile(url, token)
				.then((res) => {
					if (res) { setState(res); }
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

export function useClientSingleGetApi(url: string): {
	state: IClientSIngleProfile;
	setState: React.Dispatch<React.SetStateAction<IClientSIngleProfile>>;
	refreshData: () => Promise<void>;
} {
	const [state, setState] = useState<IClientSIngleProfile>();
	const token = useSelector((state: AppState) => state.admin.Token);
	const fetchData = useCallback(async () => {
		AdminApi.getClientProfile(url, token)
			.then((res) => {
				setState(res);
			})
			.catch((err) => {
				const message = err?.response?.data?.message || err.message;
				openNotificationWithIcon({ type: 'error', message: message });
			});
	}, [url, token]);

	useEffect(() => { fetchData() }, [fetchData]);

	return { state, setState, refreshData: fetchData };
}
