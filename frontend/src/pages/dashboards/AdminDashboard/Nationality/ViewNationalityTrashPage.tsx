import { useGetLanguages } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import NationalityTrashTable from './NationalityTrashTable';
const pageData: IPageData = {
  title: 'View Trash Nationality',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Nationality'
    }
  ]
};

const ViewNationalityTrashPage = () => {
  usePageData(pageData);
  const [NationalityTrash] = useGetLanguages('nationality/get-trashed-record');

  return <NationalityTrashTable nationalityTrash={NationalityTrash} />;
};

export default ViewNationalityTrashPage;
