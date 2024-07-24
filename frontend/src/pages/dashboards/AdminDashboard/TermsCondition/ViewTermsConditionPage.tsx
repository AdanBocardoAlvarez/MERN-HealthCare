import { useAdminGetDisorderList } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import TermsConditionTable from './TermsConditionTable';

const pageData: IPageData = {
	title: 'View Terms and Condition',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'View Terms and Condition'
		}
	]
};

const ViewTermsConditionPage = () => {
	usePageData(pageData);
	const [ViewPrivacy] = useAdminGetDisorderList('terms-and-conditions/index');
	return <TermsConditionTable ViewPrivacy={ViewPrivacy} />;
};

export default ViewTermsConditionPage;
