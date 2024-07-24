import { useGetKeywords } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import KeywordsTrashTable from './KeywordsTrashTable';
const pageData: IPageData = {
  title: 'View Trash Keywords',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Keywords'
    }
  ]
};

const ViewKeywordsTrashPage = () => {
  usePageData(pageData);
  const [KeywordsTrash] = useGetKeywords('keywords/get-trashed-record');
  return <KeywordsTrashTable keywordsTrash={KeywordsTrash} />;
};

export default ViewKeywordsTrashPage;
