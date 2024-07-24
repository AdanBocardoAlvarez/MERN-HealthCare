import { useGetLanguages } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import CountryTrashTable from './CountryTrashTable';
const pageData: IPageData = {
    title: 'View Trash Country',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Add Trash Country'
        }
    ]
};

const ViewCountryTrashPage = () => {
    usePageData(pageData);
    const [CountryTrash] = useGetLanguages('country/get-trashed-record');

    return <CountryTrashTable countryTrash={CountryTrash} />;
};

export default ViewCountryTrashPage;
