import './App.scss';
import './assets/css/icofont.min.css'
import { Routes, Route } from 'react-router-dom';
import ConfigProvider from 'antd/es/config-provider';
import { sessionRoutes, adminRoutes, consulatntRoutes, clientRoutes } from './routing';
import { useHideLoader } from './hooks/useHideLoader';
import PrivateRoutesAdmin from './utils/PrivateRouteAdmin';
import PrivateRoutesCounsultant from './utils/PrivateRouteCounsultant';
import ConsultantLayout from './layout/consultant/Consultant';
import AdminLayout from './layout/admin/Admin';
import MainPage from './pages/Website/MainPage/MainPage';
import FilterPage from './pages/Website/FilterPage/FilterPage';
import ClientLayout from './layout/client/Client';
import PrivateRoutesClient from './utils/PrivateRouteClient';
import ConsultantSingleProfilePage from './pages/Website/FilterPage//MyProfile/ConsultantMyProfile';
import AboutPage from './pages/Website/About/AboutPage';
import LifestyleProducts from './pages/Website/Lifestyle&Products/LifestyleProducts';
import TermsConditions from './pages/Website/Terms&Privacy/TermsConditions';
import PrivacyPolicy from './pages/Website/Terms&Privacy/PrivacyPolicy';
import { useSelector } from 'react-redux';
import { AppState } from './redux/store';
import { useEffect } from 'react';
import { AdminApi } from './api/api';
import TraditionalMedicinePage from './pages/Website/Traditional Medicine/TraditionalMedicinePage';
import SDG from './pages/Website/SDG/SDG';
import { openNotificationWithIcon } from './pages/components/Toast';
import ScrollToTop from './pages/components/ScrollToTop';
import Booking from './pages/dashboards/ClientDashboards/Booking/Booking';
import Room from './pages/components/Room/Room';
import NotFound from './pages/sessions/404';
import ContactUs from './pages/Website/ContactUs/ContactUs';
import { useDispatch } from 'react-redux';
import { setWebSettingData } from './redux/webSetteing/actions';
import i18n from './i18n';
import { AnyAction } from 'redux';

const App = () => {

    const dispatch = useDispatch();
    const state = useSelector((state: AppState) => state.consultant.Token);
    const webSettings = useSelector((state: AppState) => state.webSettings);
    const { type } = useSelector((state: AppState) => state.language);

    useEffect(() => { i18n.changeLanguage(type) }, [type])
    useEffect(() => {
        let icons = document.querySelectorAll('link[type="image/jpg"]')
        icons.forEach((row: any) => row.href = webSettings?.fab_icon)
        if (icons.length === 0) {
            const favicon: any = document.createElement('link');
            favicon.href = webSettings?.fab_icon;
            document.head.appendChild(favicon);
        }
    }, [webSettings]);

    useEffect(() => {
        (() => {
            AdminApi.getWebSetting('web-setting/get-record', state)
                .then(async (res) => {
                    const action: AnyAction = setWebSettingData(res);
                    dispatch(action);
                }).catch((err) => {
                    openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message });
                });
        })();
    }, [state, dispatch]);

    useHideLoader();

    return <>
        <ScrollToTop />
        <ConfigProvider theme={{ token: { fontFamily: "'Lato', sans-serif" } }} 	>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/about-us' element={<AboutPage />} />
                <Route path='/alternative-medicine' element={<TraditionalMedicinePage />} />
                <Route path='/sdg-media' element={<SDG />} />
                <Route path='/our-experts/:search?' element={<FilterPage />} />
                <Route path='/our-experts/details/:id' element={<ConsultantSingleProfilePage />} />
                <Route path='/lifestyle-product' element={<LifestyleProducts />} />

                <Route path='/terms-conditions' element={<TermsConditions />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />

                <Route path='/booking/:token' element={<PrivateRoutesClient > <Booking /> </PrivateRoutesClient>} />
                <Route path='/chat-room/:roomid' element={<Room />} />

                <Route path='/contact-us' element={<ContactUs />} />

                <Route path='/public/*' element={<LayoutRoutes routes={sessionRoutes} />} />
                <Route path='/consultant/*' element={<LayoutRoutesConsultant routes={consulatntRoutes} />} />
                <Route path='/admin/*' element={<LayoutRoutesAdmin routes={adminRoutes} />} />
                <Route path='/client/*' element={<LayoutRoutesClient routes={clientRoutes} />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </ConfigProvider>
    </>
};

const LayoutRoutes = ({ routes }) => <Routes>
    {routes.map((route, index) => <Route key={index} path={`/${route.path}`} element={<route.component />} />)}
</Routes>

const LayoutRoutesAdmin = ({ routes }) => <AdminLayout>
    <Routes>
        {routes.map((route, index) => <Route key={index} path={`/${route.path}`} element={<PrivateRoutesAdmin><route.component /></PrivateRoutesAdmin>} />)}
    </Routes>
</AdminLayout>

const LayoutRoutesClient = ({ routes }) => <ClientLayout>
    <Routes>
        {routes.map((route, index) => <Route key={index} path={`/${route.path}`} element={<PrivateRoutesClient><route.component /> </PrivateRoutesClient>} />)}
    </Routes>
</ClientLayout>

const LayoutRoutesConsultant = ({ routes }) => <ConsultantLayout>
    <Routes>
        {routes.map((route, index) => <Route key={index} path={`/${route.path}`} element={<PrivateRoutesCounsultant><route.component /></PrivateRoutesCounsultant>} />)}
    </Routes>
</ConsultantLayout>

export default App;
