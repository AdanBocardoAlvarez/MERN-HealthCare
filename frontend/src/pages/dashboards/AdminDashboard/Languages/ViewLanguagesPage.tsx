import {   useGetLanguages } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import LanguagesTable from './LanguagesTable';
const pageData: IPageData = {
  title: 'View Languages',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Languages'
    }
  ]
};

const ViewLanguagesPage = () => {
  usePageData(pageData);
  const [ViewLanguages] = useGetLanguages('languages/index');
  return <LanguagesTable viewLanguages={ViewLanguages} />;
};

export default ViewLanguagesPage;
