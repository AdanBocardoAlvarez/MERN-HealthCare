import { useConsultantMyBooking } from '../../../../hooks/Consultant/useConsulatantMyBooking';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import AppointmentTable from './AppointmentTable';

const pageData: IPageData = {
	title: 'Appointments',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Admin',
			route: 'dashboard'
		},
		{
			title: 'My Appointments'
		}
	]
};

const AdminAppointmentPage = () => {
	const [Booking] = useConsultantMyBooking('get-my-booking');

	usePageData(pageData);
	return <AppointmentTable myBooking={Booking} />
};

export default AdminAppointmentPage;
