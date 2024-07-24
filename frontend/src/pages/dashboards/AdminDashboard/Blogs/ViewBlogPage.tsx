import { useGetBlog } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';

import BlogTable from './BlogTable';
const pageData: IPageData = {
  title: 'View Blog',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Blog'
    }
  ]
};

const ViewBlogPage = () => {
  usePageData(pageData);
  const { state, refreshData } = useGetBlog('blog/index');
  return (
    <>
      <BlogTable Type='View' refreshData={refreshData} state={state} />
    </>
  );
};

export default ViewBlogPage;
