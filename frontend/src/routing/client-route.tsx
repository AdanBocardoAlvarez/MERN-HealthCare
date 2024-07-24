import { IRoute } from '../interfaces/routing';
import Room from '../pages/components/Room/Room';
import ChangePasswordPage from '../pages/dashboards/ClientDashboards/ChangePassword/ChangePasswordPage';
import AddClientComplaintPage from '../pages/dashboards/ClientDashboards/Complaint/AddClientComplaintPage';
import ViewClientComplaintAgainstPage from '../pages/dashboards/ClientDashboards/Complaint/ViewClientComplaintAgainstPage';
import ViewClientComplaintPage from '../pages/dashboards/ClientDashboards/Complaint/ViewClientComplaintPage';
import Favorite from '../pages/dashboards/ClientDashboards/Favorites/Favorite';
import ConsentFormDoc from '../pages/dashboards/ClientDashboards/GeneralInfomation/ConsentFormDoc';
import GeneralInfo from '../pages/dashboards/ClientDashboards/GeneralInfomation/GeneralInfo';
import HealthAssessmentDoc from '../pages/dashboards/ClientDashboards/GeneralInfomation/HealthAssessmentDoc';
import HealthAssesment from '../pages/dashboards/ClientDashboards/HealthAssesment/HealthAssesment';
import ClientMyBookingPage from '../pages/dashboards/ClientDashboards/MyBooking/ClientMyBooking';
import ClientDashboardPage from '../pages/dashboards/dashboard/ClientDashboard';

export const clientRoutes: IRoute[] = [
    {
        path: 'dashboard',
        component: ClientDashboardPage,
    },
    {
        path: 'favorite',
        component: Favorite
    },
    {
        path: 'my-booking',
        component: ClientMyBookingPage
    },
    {
        path: 'room/:roomid',
        component: Room
    },
    {
        path: 'add-complaint',
        component: AddClientComplaintPage
    },
    {
        path: 'view-complaint-by-me',
        component: ViewClientComplaintPage
    },
    {
        path: 'view-complaint-against',
        component: ViewClientComplaintAgainstPage
    },
    {
        path: 'general-info',
        component: GeneralInfo
    },
    {
        path: 'consent-form-doc',
        component: ConsentFormDoc
    },
    {
        path: 'health-assessment-doc',
        component: HealthAssessmentDoc
    },
    {
        path: 'change-password',
        component: ChangePasswordPage
    },
    {
        path: 'health-assesment',
        component: HealthAssesment
    },
];
