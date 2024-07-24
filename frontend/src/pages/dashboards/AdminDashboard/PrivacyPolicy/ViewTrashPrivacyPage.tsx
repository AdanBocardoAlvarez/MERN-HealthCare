import {
  useAdminGetDisorderList,
} from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import PrivacyPolicyTrashTable from './PrivacyTrashTable';

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

const ViewTrashPrivacyPage = () => {
  usePageData(pageData);
  const [PrivacyPolicyTrash] = useAdminGetDisorderList('privacy-policy/get-trashed-record');
  return <PrivacyPolicyTrashTable PrivacyPolicyTrash={PrivacyPolicyTrash} />;
};

export default ViewTrashPrivacyPage;
