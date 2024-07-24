import {
  useAdminGetDisorderList,
} from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import DisorderTrashTable from './DisorderTrashTable';
const pageData: IPageData = {
  title: 'View Trash Disorder',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Disorder'
    }
  ]
};

const ViewDisorderTrashPage = () => {
  usePageData(pageData);
  const [NationalityTrash] = useAdminGetDisorderList('disorders/get-trashed-record');
  return <DisorderTrashTable nationalityTrash={NationalityTrash} />;
};

export default ViewDisorderTrashPage;
