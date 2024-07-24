import { useTranslation } from 'react-i18next';
import { useClientMyBooking } from '../../../../hooks/Client/UseClient';
import PageHeader from '../../../components/PageHeader';
import ClientBookingTable from './ClientBookingTable';

const ClientMyBookingPage = () => {

    const { t } = useTranslation();
    const [Booking] = useClientMyBooking('get-booking-details');

    return <>
        <PageHeader title={t('cnt.my-booking')} />
        <ClientBookingTable myBooking={Booking} />
    </>
};

export default ClientMyBookingPage;
