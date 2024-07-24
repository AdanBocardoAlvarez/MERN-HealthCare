import { ConsultantApi } from '../../api/api';
import { useState, useEffect } from 'react';
import { IConsultantBooking } from '../../interfaces/Consultant/consultant';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useConsultantMyBooking(url: string): [IConsultantBooking[], React.Dispatch<any>] {
	const [state, setState] = useState<IConsultantBooking[]>([]);
	const token = useSelector((state: AppState) => state.consultant.Token);
	useEffect(() => {
		ConsultantApi.getMyBookingList(url, token)
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
