import { useConsultantMyBooking } from '../../../../hooks/Consultant/useConsulatantMyBooking';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import TransactionsTable from './TransactionsTable';

const pageData: IPageData = {
  title: 'Transactions',
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
      title: 'Transactions'
    }
  ]
};

const TransactionsDetailsPage = () => {
  const [Booking] = useConsultantMyBooking('get-my-booking');

  usePageData(pageData);

  return (
    <>
      <TransactionsTable myBooking={Booking} />
    </>
  );
};

export default TransactionsDetailsPage;
