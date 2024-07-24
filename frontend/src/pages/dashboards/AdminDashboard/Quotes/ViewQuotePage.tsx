import { useGetQuotes } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import QuoteTable from './QuoteTable';
const pageData: IPageData = {
  title: 'View Quote',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Quote'
    }
  ]
};

const ViewQuotePage = () => {
  usePageData(pageData);
  const [state] = useGetQuotes('quote/index');
  return <QuoteTable quote={state} />;
};

export default ViewQuotePage;
