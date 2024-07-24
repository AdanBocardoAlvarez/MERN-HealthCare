import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { useAdminGetApi } from '../../../../hooks/Admin/useAdminConsultant';
import ClientTable from './ClientTable';

const pageData: IPageData = {
  title: 'Client',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Client List'
    }
  ]
};

const ClientPage = () => {
  const [Client] = useAdminGetApi('client/view');
  usePageData(pageData);
  return (
    <>
      <ClientTable patients={Client} />
    </>
  );
};

export default ClientPage;
