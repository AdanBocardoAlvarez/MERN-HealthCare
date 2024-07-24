import { useTranslation } from 'react-i18next';
import { useConsultantMyBooking } from '../../../../hooks/Consultant/useConsulatantMyBooking';
import PageHeader from '../../../components/PageHeader';
import BookingTable from './BookingTable';

const MyBookingPage = () => {

    const { t } = useTranslation();
    const [Booking] = useConsultantMyBooking('get-my-booking');

    return <>
        <PageHeader title={t('cnt.my-booking')} />
        <BookingTable myBooking={Booking} />
    </>
};

export default MyBookingPage;
