import { useGetComplaintType } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import ComplaintTypeTable from './ComplaintTypeTable';
const pageData: IPageData = {
  title: 'View Complaint Type',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Complaint Type'
    }
  ]
};

const ViewComplaintTypePage = () => {
  usePageData(pageData);
  const [ViewComplaintType] = useGetComplaintType('complaint-type/index');
  return <ComplaintTypeTable viewComplaintType={ViewComplaintType} />;
};

export default ViewComplaintTypePage;
