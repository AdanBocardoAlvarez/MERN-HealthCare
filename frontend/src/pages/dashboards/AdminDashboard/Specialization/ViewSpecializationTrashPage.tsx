import { useGetSpecialization } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import SpecializationTrashTable from './SpecializationTrashTable';
const pageData: IPageData = {
  title: 'View Trash Specialization',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Specialization'
    }
  ]
};

const ViewSpecializationTrashPage = () => {
  usePageData(pageData);
  const [SpecializationTrash] = useGetSpecialization('specialization/get-trashed-record');
  return <SpecializationTrashTable specializationTrash={SpecializationTrash} />;
};

export default ViewSpecializationTrashPage;
