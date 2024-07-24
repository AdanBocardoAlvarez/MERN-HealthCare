import { useGetLanguages } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import LanguagesTrashTable from './LanguagesTrashTable';
const pageData: IPageData = {
  title: 'View Trash Languages',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Languages'
    }
  ]
};

const ViewLanguagesTrashPage = () => {
  usePageData(pageData);
  const [LanguagesTrash] = useGetLanguages('Languages/get-trashed-record');
  return <LanguagesTrashTable languagesTrash={LanguagesTrash} />;
};

export default ViewLanguagesTrashPage;
