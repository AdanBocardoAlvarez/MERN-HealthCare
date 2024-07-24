import { useGetCountry } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import CountryTable from './CountryTable';
const pageData: IPageData = {
    title: 'View Country',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Add Country'
        }
    ]
};

const ViewCountryPage = () => {
    usePageData(pageData);
    const [ViewCountry] = useGetCountry('country/index');
    return <CountryTable viewCountry={ViewCountry} />;
};

export default ViewCountryPage;
