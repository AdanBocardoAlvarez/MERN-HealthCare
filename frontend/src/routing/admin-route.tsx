import { IRoute } from '../interfaces/routing';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import ConsultantPage from '../pages/dashboards/AdminDashboard/consultant/Consultant';
import ConsultantSingleProfile from '../pages/dashboards/AdminDashboard/consultant/ConsultantSingleProfile';
// import AdminAppointmentPage from '../pages/dashboards/AdminDashboard/Appointments/AdminAppointmentPage';
// import TransactionsDetailsPage from '../pages/dashboards/AdminDashboard/Transactions/TransactionsDetailsPage';
import AddBlogPage from '../pages/dashboards/AdminDashboard/Blogs/AddBlogPage';
import ViewBlogPage from '../pages/dashboards/AdminDashboard/Blogs/ViewBlogPage';
import AddQuotePage from '../pages/dashboards/AdminDashboard/Quotes/AddQuotePage';
import ViewQuotePage from '../pages/dashboards/AdminDashboard/Quotes/ViewQuotePage';
import EditQuotePage from '../pages/dashboards/AdminDashboard/Quotes/EditQuotePage';
import ViewQuoteTrashPage from '../pages/dashboards/AdminDashboard/Quotes/ViewQuoteTrashPage';
import EditBlogPage from '../pages/dashboards/AdminDashboard/Blogs/EditBlogPage';
import ViewBlogTrashPage from '../pages/dashboards/AdminDashboard/Blogs/ViewBlogTrashPage';
import AddKeywordPage from '../pages/dashboards/AdminDashboard/Keywords/AddKeywordsPage';
import AddSpecializationPage from '../pages/dashboards/AdminDashboard/Specialization/AddSpecializationPage';
import AddNationalityPage from '../pages/dashboards/AdminDashboard/Nationality/AddNationalityPage';
import AddDisordersPage from '../pages/dashboards/AdminDashboard/Disorders/AddDisordersPage';
import AddObjectivesPage from '../pages/dashboards/AdminDashboard/Objectives/AddObjectivesPage';
import AddLanguagesPage from '../pages/dashboards/AdminDashboard/Languages/AddLanguagesPage';
import ViewKeywordsPage from '../pages/dashboards/AdminDashboard/Keywords/ViewKeywordsPage';
import EditKeywordsPage from '../pages/dashboards/AdminDashboard/Keywords/EditKeywordsPage';
import ViewKeywordsTrashPage from '../pages/dashboards/AdminDashboard/Keywords/ViewKeywordsTrashPage';
import EditLanguagesPage from '../pages/dashboards/AdminDashboard/Languages/EditLanguagesPage';
import ViewLanguagesPage from '../pages/dashboards/AdminDashboard/Languages/ViewLanguagesPage';
import ViewLanguagesTrashPage from '../pages/dashboards/AdminDashboard/Languages/ViewLanguagesTrashPage';
import EditNationalityPage from '../pages/dashboards/AdminDashboard/Nationality/EditNationalityPage';
import ViewNationalityPage from '../pages/dashboards/AdminDashboard/Nationality/ViewNationalityPage';
import ViewNationalityTrashPage from '../pages/dashboards/AdminDashboard/Nationality/ViewNationalityTrashPage';
import EditObjectivesPage from '../pages/dashboards/AdminDashboard/Objectives/EditObjectivesPage';
import ViewObjectivesPage from '../pages/dashboards/AdminDashboard/Objectives/ViewObjectivesPage';
import ViewObjectivesTrashPage from '../pages/dashboards/AdminDashboard/Objectives/ViewObjectivesTrashPage';
import EditSpecializationPage from '../pages/dashboards/AdminDashboard/Specialization/EditSpecializationPage';
import ViewSpecializationPage from '../pages/dashboards/AdminDashboard/Specialization/ViewSpecializationPage';
import ViewSpecializationTrashPage from '../pages/dashboards/AdminDashboard/Specialization/ViewSpecializationTrashPage';
import ViewComplaintPage from '../pages/dashboards/AdminDashboard/Complaint/ViewComplaintPage';
import ViewComplaintTrashPage from '../pages/dashboards/AdminDashboard/Complaint/ViewComplaintTrashPage';
import AddComplaintTypePage from '../pages/dashboards/AdminDashboard/ComplaintType/AddComplaintTypePage';
import ViewComplaintTypePage from '../pages/dashboards/AdminDashboard/ComplaintType/ViewComplaintTypePage';
import ViewComplaintTypeTrashPage from '../pages/dashboards/AdminDashboard/ComplaintType/ViewComplaintTypeTrashPage';
import EditComplaintTypePage from '../pages/dashboards/AdminDashboard/ComplaintType/EditComplaintTypePage';
import ViewDisorderPage from '../pages/dashboards/AdminDashboard/Disorders/ViewDisorderPage';
import AllBookingPage from '../pages/dashboards/AdminDashboard/AllBooking/AllBookingPage';
import ViewComplaintClientPage from '../pages/dashboards/AdminDashboard/Complaint/ComplaintClientPage';
import EditComplaintPage from '../pages/dashboards/AdminDashboard/Complaint/EditComplaintPage';
import ChangePasswordPage from '../pages/dashboards/AdminDashboard/ChangePassword/ChangePasswordPage';
import EditDisorderPage from '../pages/dashboards/AdminDashboard/Disorders/EditDisorderPage';
import ViewDisorderTrashPage from '../pages/dashboards/AdminDashboard/Disorders/ViewDisorderTrashPage';
import AddDigitalProduct from '../pages/dashboards/AdminDashboard/DigitalProduct/AddDigitalProduct';
import ViewDigitalProductPage from '../pages/dashboards/AdminDashboard/DigitalProduct/ViewDigitalProductPage';
import ViewDigitalProductTrashPage from '../pages/dashboards/AdminDashboard/DigitalProduct/ViewDigitalProductTrashPage';
import EditDigitalProductPage from '../pages/dashboards/AdminDashboard/DigitalProduct/EditDigitalProductPage';
import AddPrivacyPolicyPage from '../pages/dashboards/AdminDashboard/PrivacyPolicy/AddPrivacyPoilcy';
import ViewPrivacyPolicyPage from '../pages/dashboards/AdminDashboard/PrivacyPolicy/ViewPrivacyPolicyPage';
import ViewTrashPrivacyPage from '../pages/dashboards/AdminDashboard/PrivacyPolicy/ViewTrashPrivacyPage';
import AddTermsConditionPage from '../pages/dashboards/AdminDashboard/TermsCondition/AddTermsConditionPage';
import ViewTermsConditionPage from '../pages/dashboards/AdminDashboard/TermsCondition/ViewTermsConditionPage';
import ClientPage from '../pages/dashboards/AdminDashboard/ClientList/Client';
import ClientSingleProfile from '../pages/dashboards/AdminDashboard/ClientList/ClientSingleProfile';
import WebSettingPage from '../pages/dashboards/AdminDashboard/webSetting/WebSettingPage';
import ViewUserWaitingList from '../pages/dashboards/AdminDashboard/UserWaitingList/ViewUserWaitingList';
import ContactUsList from '../pages/dashboards/AdminDashboard/UserWaitingList/ContactUsList';
import AddCountryPage from '../pages/dashboards/AdminDashboard/Country/AddCountryPage';
import EditCountryPage from '../pages/dashboards/AdminDashboard/Country/EditCountryPage';
import ViewCountryPage from '../pages/dashboards/AdminDashboard/Country/ViewCountryPage';
import ViewCountryTrashPage from '../pages/dashboards/AdminDashboard/Country/ViewCountryTrashPage';
import AddCityPage from '../pages/dashboards/AdminDashboard/City/AddCityPage';
import EditCityPage from '../pages/dashboards/AdminDashboard/City/EditCityPage';
import ViewCityPage from '../pages/dashboards/AdminDashboard/City/ViewCityPage';
import ViewCityTrashPage from '../pages/dashboards/AdminDashboard/City/ViewCityTrashPage';

export const adminRoutes: IRoute[] = [
    {
        path: 'change-password',
        component: ChangePasswordPage
    },
    {
        path: 'consultant',
        component: ConsultantPage
    },
    {
        path: 'client',
        component: ClientPage
    },
    {
        path: 'websetting',
        component: WebSettingPage
    },
    {
        path: 'client/client-profile/:id',
        component: ClientSingleProfile
    },
    {
        path: 'dashboard',
        component: DashboardPage
    },
    // {
    // 	path: 'appointmnents',
    // 	component: AdminAppointmentPage
    // },
    // {
    // 	path: 'transactions',
    // 	component: TransactionsDetailsPage
    // },
    {
        path: 'add-blog',
        component: AddBlogPage
    },
    {
        path: 'edit-blog/:id',
        component: EditBlogPage
    },
    {
        path: 'view-blog',
        component: ViewBlogPage
    },
    {
        path: 'view-trash-blog',
        component: ViewBlogTrashPage
    },
    {
        path: 'add-quote',
        component: AddQuotePage
    },
    {
        path: 'edit-quote/:id/:author_name/:quote_title',
        component: EditQuotePage
    },
    {
        path: 'view-quote',
        component: ViewQuotePage
    },
    {
        path: 'view-trash-quote',
        component: ViewQuoteTrashPage
    },
    {
        path: 'consultant/consultant-profile/:id',
        component: ConsultantSingleProfile
    },

    {
        path: 'add-disorders',
        component: AddDisordersPage
    },
    {
        path: 'edit-disorders/:id/:name',
        component: EditDisorderPage
    },
    {
        path: 'view-trash-disorders',
        component: ViewDisorderTrashPage
    },
    {
        path: 'add-keyword',
        component: AddKeywordPage
    },
    {
        path: 'edit-keywords/:id/:name',
        component: EditKeywordsPage
    },
    {
        path: 'view-keywords',
        component: ViewKeywordsPage
    },
    {
        path: 'view-trash-keywords',
        component: ViewKeywordsTrashPage
    },
    {
        path: 'add-languages',
        component: AddLanguagesPage
    },
    {
        path: 'edit-languages/:id/:name',
        component: EditLanguagesPage
    },
    {
        path: 'view-languages',
        component: ViewLanguagesPage
    },
    {
        path: 'view-trash-languages',
        component: ViewLanguagesTrashPage
    },
    {
        path: 'add-nationality',
        component: AddNationalityPage
    },
    {
        path: 'edit-nationality/:id/:name',
        component: EditNationalityPage
    },
    {
        path: 'view-nationality',
        component: ViewNationalityPage
    },
    {
        path: 'view-trash-nationality',
        component: ViewNationalityTrashPage
    },

    {
        path: 'add-country',
        component: AddCountryPage
    },
    {
        path: 'edit-country/:id',
        component: EditCountryPage
    },
    {
        path: 'view-country',
        component: ViewCountryPage
    },
    {
        path: 'view-trash-country',
        component: ViewCountryTrashPage
    },

    {
        path: 'add-city',
        component: AddCityPage
    },
    {
        path: 'edit-city/:id',
        component: EditCityPage
    },
    {
        path: 'view-city',
        component: ViewCityPage
    },
    {
        path: 'view-trash-city',
        component: ViewCityTrashPage
    },

    {
        path: 'view-disorders',
        component: ViewDisorderPage
    },
    {
        path: 'add-objectives',
        component: AddObjectivesPage
    },
    {
        path: 'edit-objectives/:id/:name',
        component: EditObjectivesPage
    },
    {
        path: 'view-objectives',
        component: ViewObjectivesPage
    },
    {
        path: 'view-trash-objectives',
        component: ViewObjectivesTrashPage
    },
    {
        path: 'add-specialization',
        component: AddSpecializationPage
    },
    {
        path: 'edit-specialization/:id/:name',
        component: EditSpecializationPage
    },
    {
        path: 'view-specialization',
        component: ViewSpecializationPage
    },
    {
        path: 'view-trash-specialization',
        component: ViewSpecializationTrashPage
    },
    {
        path: 'view-complaint-consultant',
        component: ViewComplaintPage
    },
    {
        path: 'view-complaint-client',
        component: ViewComplaintClientPage
    },
    {
        path: 'view-trash-complaint',
        component: ViewComplaintTrashPage
    },
    {
        path: 'edit-complaint/:id',
        component: EditComplaintPage
    },
    {
        path: 'add-complaintType',
        component: AddComplaintTypePage
    },
    {
        path: 'edit-ComplaintType/:id/:name',
        component: EditComplaintTypePage
    },
    {
        path: 'view-ComplaintType',
        component: ViewComplaintTypePage
    },
    {
        path: 'view-trash-ComplaintType',
        component: ViewComplaintTypeTrashPage
    },
    {
        path: 'all-booking',
        component: AllBookingPage
    },
    {
        path: 'add-privacy-policy',
        component: AddPrivacyPolicyPage
    },
    {
        path: 'add-terms-condition',
        component: AddTermsConditionPage
    },
    {
        path: 'view-terms-condition',
        component: ViewTermsConditionPage
    },
    {
        path: 'view-privacy-policy',
        component: ViewPrivacyPolicyPage
    },
    {
        path: 'view-trash-privacy-policy',
        component: ViewTrashPrivacyPage
    },
    {
        path: 'add-digital-product',
        component: AddDigitalProduct
    },
    {
        path: 'edit-digital-product/:id',
        component: EditDigitalProductPage
    },
    {
        path: 'view-digital-product',
        component: ViewDigitalProductPage
    },
    {
        path: 'view-trash-digital-product',
        component: ViewDigitalProductTrashPage
    },
    {
        path: 'view-user-waiting-list',
        component: ViewUserWaitingList
    },
    {
        path: 'view-contact-us-list',
        component: ContactUsList
    }
];