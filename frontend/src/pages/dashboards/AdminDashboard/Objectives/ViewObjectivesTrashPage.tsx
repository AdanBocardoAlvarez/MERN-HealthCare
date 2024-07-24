import {  useGetObjectives } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import ObjectivesTrashTable from './ObjectivesTrashTable';
const pageData: IPageData = {
  title: 'View Trash Objectives',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Objectives'
    }
  ]
};

const ViewObjectivesTrashPage = () => {
  usePageData(pageData);
  const [ObjectivesTrash] = useGetObjectives('objectives/get-trashed-record');
  return <ObjectivesTrashTable objectivesTrash={ObjectivesTrash} />;
};

export default ViewObjectivesTrashPage;
