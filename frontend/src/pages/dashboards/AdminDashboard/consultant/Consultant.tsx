import { usePageData } from '../../../../hooks/usePage';
import ConsultantTable from './ConsultantTable';
import { IPageData } from '../../../../interfaces/page';
import { useAdminGetApi } from '../../../../hooks/Admin/useAdminConsultant';

const pageData: IPageData = {
	title: 'Consultants',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Consultants'
		}
	]
};

const ConsultantPage = () => {
	const [Consultant] = useAdminGetApi('consultant/view');
	usePageData(pageData);
	return <ConsultantTable patients={Consultant} />
};

export default ConsultantPage;
