import { useGetDigitalProduct } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import DigitalProductTable from './DigitalProductTable';
const pageData: IPageData = {
  title: 'View Trash Digital Product',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Trash Digital Product'
    }
  ]
};

const ViewDigitalProductTrashPage = () => {
  usePageData(pageData);
  const { state, refreshData } = useGetDigitalProduct('digital-product/get-trashed-record');
  return (
    <>
      {/* <BlogTable refreshData={refreshData} Type='Trash' state={state} /> */}
      <DigitalProductTable refreshData={refreshData} Type='Trash' state={state} />
    </>
  );
};

export default ViewDigitalProductTrashPage;
