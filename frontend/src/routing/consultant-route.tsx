import { IRoute } from '../interfaces/routing';
import EditAccountPage from '../pages/services/EditAccounPage';
import BasicProfilePage from '../pages/services/BasicProfilePage';
import AddressDetailsPage from '../pages/services/AddressDetailsPage';
import EducationDetailsPage from '../pages/services/EducationDetailsPage';
import BankDetailsPage from '../pages/services/BankDetailsPage';
import ProfileDetailsPage from '../pages/services/ProfileDetailsPage';
import AddTimingPage from '../pages/dashboards/ConsultantDashboard/AddTiming/AddTimingPage';
import CertificateDetailPage from '../pages/services/CertificateDetailPage';
import MyBookingPage from '../pages/dashboards/ConsultantDashboard/Mybooking/MyBookingPage';
import ChangePasswordPage from '../pages/dashboards/ConsultantDashboard/ChangePassword/ChangePasswordPage';
import ConsultantMyProfilePage from '../pages/dashboards/ConsultantDashboard/MyProfile/ConsultantMyProfile';
import Room from '../pages/components/Room/Room';
import AddConsultantComplaintPage from '../pages/dashboards/ConsultantDashboard/Complaint/AddConsultantComplaintPage';
import ViewConsultantComplaintPage from '../pages/dashboards/ConsultantDashboard/Complaint/ViewConsultantComplaintPage';
import ViewConsultantComplaintAgainstPage from '../pages/dashboards/ConsultantDashboard/Complaint/ViewConsultantComplainstAgainstPage';
import ViewCertificateDetailsPage from '../pages/services/AddCertificate';
import EditCertificateForm from '../pages/services/EditCertificatePage';
import AddNotePage from '../pages/dashboards/ConsultantDashboard/Mybooking/AddNotePage';
import ConsultantDashboardPage from '../pages/dashboards/dashboard/ConsultantDashboard';
import DocumentPage from '../pages/services/DocumentPage';

export const consulatntRoutes: IRoute[] = [
    {
        path: 'dashboard',
        component: ConsultantDashboardPage
    },
    {
        path: 'my-profile',
        component: ConsultantMyProfilePage
    },
    {
        path: 'edit-account',
        component: EditAccountPage
    },
    {
        path: 'edit-account/basic-profile',
        component: BasicProfilePage
    },
    {
        path: 'edit-account/address-detail',
        component: AddressDetailsPage
    },
    {
        path: 'edit-account/education-detail',
        component: EducationDetailsPage
    },
    {
        path: 'edit-account/bank-detail',
        component: BankDetailsPage
    },
    {
        path: 'edit-account/profile-detail',
        component: ProfileDetailsPage
    },
    {
        path: 'edit-account/document',
        component: DocumentPage
    },
    {
        path: 'add-complaint',
        component: AddConsultantComplaintPage
    },
    {
        path: 'view-complaint-by-me',
        component: ViewConsultantComplaintPage
    },
    {
        path: 'view-complaint-against',
        component: ViewConsultantComplaintAgainstPage
    },
    {
        path: 'add-timing',
        component: AddTimingPage
    },
    {
        path: 'my-booking',
        component: MyBookingPage
    },
    {
        path: 'my-booking/add-note/:sessionId?/:clientId?',
        component: AddNotePage
    },
    {
        path: 'change-password',
        component: ChangePasswordPage
    },
    {
        path: 'edit-account/certificate-detail',
        component: CertificateDetailPage,
    },
    {
        path: 'edit-account/certificate-detail/all-certificate',
        component: CertificateDetailPage,
    },
    {
        path: 'edit-account/add-certificate',
        component: ViewCertificateDetailsPage
    },
    {
        path: 'edit-account/certificate-detail/edit/:id',
        component: EditCertificateForm
    },
    {
        path: 'room/:roomid',
        component: Room
    }
];
