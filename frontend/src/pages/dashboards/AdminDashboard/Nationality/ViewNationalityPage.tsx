import { useGetNationality } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import NationalityTable from './NationalityTable';
const pageData: IPageData = {
  title: 'View Nationality',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Nationality'
    }
  ]
};

const ViewNationalityPage = () => {
  usePageData(pageData);
  const [ViewNationality] = useGetNationality('nationality/index');
  return <NationalityTable viewNationality={ViewNationality} />;
};

export default ViewNationalityPage;
