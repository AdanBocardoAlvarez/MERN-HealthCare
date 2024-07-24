import { usePageData } from '../../../hooks/usePage';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin Dashboards',
      route: 'dashboard'
    },
    {
      title: 'Default'
    }
  ]
};

const DashboardPage = () => {
  usePageData(pageData);
  return (
    <></>
  );
};

export default DashboardPage;
