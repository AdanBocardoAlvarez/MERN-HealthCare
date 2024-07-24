import { useGetCity } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import CityTable from './CityTable';
const pageData: IPageData = {
    title: 'View City',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Add City'
        }
    ]
};

const ViewCityPage = () => {
    usePageData(pageData);
    const [ViewCity] = useGetCity('city/index');
    return <CityTable viewCity={ViewCity} />;
};

export default ViewCityPage;
