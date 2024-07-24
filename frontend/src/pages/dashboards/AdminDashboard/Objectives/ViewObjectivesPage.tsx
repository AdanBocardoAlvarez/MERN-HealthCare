import { useGetObjectives } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import ObjectivesTable from './ObjectivesTable';
const pageData: IPageData = {
  title: 'View Objectives',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Objectives'
    }
  ]
};

const ViewObjectivesPage = () => {
  usePageData(pageData);
  const [ViewObjectives] = useGetObjectives('objectives/index');
  return <ObjectivesTable viewObjectives={ViewObjectives} />;
};

export default ViewObjectivesPage;
