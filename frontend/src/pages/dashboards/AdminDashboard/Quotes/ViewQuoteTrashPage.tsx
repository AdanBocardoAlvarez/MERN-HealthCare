import { useGetQuotes } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import QuoteTrashTable from './QuoteTrashTable';
// import BlogTable from './QuoteTable';
const pageData: IPageData = {
  title: 'View Trash Quote',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Quote'
    }
  ]
};

const ViewQuoteTrashPage = () => {
  usePageData(pageData);
  const [state] = useGetQuotes('quote/get-trashed-record');

  return <QuoteTrashTable QuoteTrash={state} />;
};

export default ViewQuoteTrashPage;
