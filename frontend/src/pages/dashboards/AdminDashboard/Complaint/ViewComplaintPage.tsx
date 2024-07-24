import { Link } from 'react-router-dom';
import { useGetComplaint } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import ComplaintTable from './ComplaintTable';
import { ArrowLeftOutlined } from '@ant-design/icons';

const pageData: IPageData = {
  title: 'View All Consultant Complaint',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'View All Consultant Complaint'
    }
  ]
};

const ViewComplaintPage = () => {
  usePageData(pageData);
  const [ViewComplaint] = useGetComplaint('complaint/index');
  return (
    <>
      <Link
        style={{ gap: '10px', color: '#626364' }}
        className='d-flex align-items-center paragraph-text mb-3'
        to='../dashboard'
        aria-label='Dashboard'
      >
        <ArrowLeftOutlined style={{ fontSize: '100%' }} />
        <span className='text-md'>Dashboard</span>
      </Link>
      <ComplaintTable Type='Consultant' viewComplaint={ViewComplaint} />;
    </>
  );
};

export default ViewComplaintPage;
