import { useGetLanguages } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import CityTrashTable from './CityTrashTable';
const pageData: IPageData = {
    title: 'View Trash City',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Add Trash City'
        }
    ]
};

const ViewCityTrashPage = () => {
    usePageData(pageData);
    const [CityTrash] = useGetLanguages('city/get-trashed-record');

    return <CityTrashTable cityTrash={CityTrash} />;
};

export default ViewCityTrashPage;
