import { useGetBlog } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import BlogTable from './BlogTable';
const pageData: IPageData = {
  title: 'View Trash Blog',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Blog'
    }
  ]
};

const ViewBlogTrashPage = () => {
  usePageData(pageData);
  const { state, refreshData } = useGetBlog('blog/get-trashed-record');
  return (
    <>
      <BlogTable refreshData={refreshData} Type='Trash' state={state} />
    </>
  );
};

export default ViewBlogTrashPage;
