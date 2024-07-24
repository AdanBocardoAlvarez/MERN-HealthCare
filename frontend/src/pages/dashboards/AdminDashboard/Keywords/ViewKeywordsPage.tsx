import {  useGetKeywords } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import KeywordsTable from './KeywordsTable';
const pageData: IPageData = {
  title: 'View Keywords',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Keywords'
    }
  ]
};

const ViewKeywordsPage = () => {
  usePageData(pageData);
  const [ViewKeywords] = useGetKeywords('keywords/index');
  return <KeywordsTable viewKeywords={ViewKeywords} />;
};

export default ViewKeywordsPage;
