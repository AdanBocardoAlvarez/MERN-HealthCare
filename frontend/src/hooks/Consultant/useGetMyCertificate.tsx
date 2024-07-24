import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { ConsultantApi } from '../../api/api';
import { useEffect, useState } from 'react';
import { IGetMyAllCerificate } from '../../interfaces/Consultant/consultantprofile';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useGetAllCertificate(
	url: string
): [IGetMyAllCerificate[], React.Dispatch<IGetMyAllCerificate[]>] {
	const [state, setState] = useState<IGetMyAllCerificate[]>([]);
	const token = useSelector((state: AppState) => state.consultant.Token);
	useEffect(() => {
		ConsultantApi.getAllMyCertificate(url, token)
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
