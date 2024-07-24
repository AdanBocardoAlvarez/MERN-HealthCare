import { useGetComplaintType } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import ComplaintTypeTrashTable from './ComplaintTypeTrashTable';

const pageData: IPageData = {
  title: 'View Trash Complaint Type',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Complaint Type'
    }
  ]
};

const ViewComplaintTypeTrashPage = () => {
  usePageData(pageData);
  const [ComplaintTypeTrash] = useGetComplaintType('complaint-type/get-trashed-record');
  return <ComplaintTypeTrashTable complaintTypeTrash={ComplaintTypeTrash} />;
};

export default ViewComplaintTypeTrashPage;
