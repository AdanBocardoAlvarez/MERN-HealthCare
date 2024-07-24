import {  useGetSpecialization } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import SpecializationTable from './SpecializationTable';
const pageData: IPageData = {
  title: 'View Specialization',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Specialization'
    }
  ]
};

const ViewSpecializationPage = () => {
  usePageData(pageData);
  const [ViewSpecialization] = useGetSpecialization('Specialization/index');
  return <SpecializationTable viewSpecialization={ViewSpecialization} />;
};

export default ViewSpecializationPage;
