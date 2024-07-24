import { useAdminGetDisorderList } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import DisorderTable from './DisorderTable';
const pageData: IPageData = {
  title: 'View Disorder',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'View Disorder'
    }
  ]
};

const ViewDisorderPage = () => {
  usePageData(pageData);
  const [ViewDisorder] = useAdminGetDisorderList('disorders/index');
  return <DisorderTable viewDisorder={ViewDisorder} />;
};

export default ViewDisorderPage;
