import { useAdminGetDisorderList } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import PrivacyTable from './PrivacyTable';

const pageData: IPageData = {
	title: 'View Privacy Policy',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'View Privacy Policy'
		}
	]
};

const ViewPrivacyPolicyPage = () => {
	usePageData(pageData);
	const [ViewPrivacy] = useAdminGetDisorderList('privacy-policy/index');
	return <PrivacyTable ViewPrivacy={ViewPrivacy} />;
};

export default ViewPrivacyPolicyPage;
