import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
const pageData: IPageData = {
  title: 'View Trash Complaint',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Complaint'
    }
  ]
};

const ViewComplaintTrashPage = () => {
  usePageData(pageData);
  // const [ComplaintTrash] = useGetComplaint('Complaint/get-trashed-record');
  // return <ComplaintTrashTable complaintTrash={ComplaintTrash} />;
};

export default ViewComplaintTrashPage;
