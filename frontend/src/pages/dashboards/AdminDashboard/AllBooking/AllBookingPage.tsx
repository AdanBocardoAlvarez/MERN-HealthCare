import { useAllBooking } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import AllBookingTable from './AllBookingTable';

const pageData: IPageData = {
    title: 'All Booking List',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Consultants',
            route: 'dashboard'
        },
        {
            title: 'All Booking List'
        }
    ]
};

const AllBookingPage = () => {
    const [Booking] = useAllBooking('setting/get-all-booking');
    usePageData(pageData);
    return <AllBookingTable myBooking={Booking} />
};

export default AllBookingPage;
