import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';
import className from '../../utils/class-names';
import { IAppSettings } from '../../interfaces/settings';
import { IAppState } from '../../interfaces/app-state';
import { IPageData } from '../../interfaces/page';
import './Horizontal.scss';
import './BaseLayout.scss';
import { useLocation } from 'react-router-dom';


type Props = {
    nav: ReactNode;
    sideNav?: ReactNode;
    topNav?: ReactNode;
    children: ReactNode;
    orientation: 'vertical' | 'horizontal' | 'admin';
};

const BaseLayout = ({ nav, topNav, sideNav, orientation, children }: Props) => {
    const [showSettings, setShowSettings] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const sidebarOpened = useSelector<IAppState, boolean>((state) => state.settings.sidebarOpened);
    const settings = useSelector<IAppState, IAppSettings>((state) => state.settings);
    const pageData = useSelector<IAppState, IPageData>((state) => state.pageData);

    const handleScroll = (event) => {
        setScrolled(event.target.scrollTop > 0);
    };

    const mainContentClasses = className({
        'main-content': true,
        loaded: pageData.loaded,
        fulfilled: pageData.fulFilled
    });

    const mainContentWrapClasses = className({ 'main-content-wrap': true });

    const toggleSettings = () => setShowSettings(!showSettings);

    const contentOverlay = <div className={className({ 'content-overlay': true, show: sidebarOpened })} />

    const { pathname } = useLocation();
    const url_1 = pathname.split('/')[1];
    const url_2 = pathname.split('/')[2];

    let currentRoute;
    if (['client', 'admin', 'consultant'].includes(url_1)) {
        currentRoute = url_1;
    } else if (['client', 'admin', 'consultant'].includes(url_2)) {
        currentRoute = url_2;
    }

    return (
        <div className={`layout ${orientation}`}>
            <div className={`app-container ${settings.boxed && 'boxed'} ${scrolled && 'scrolled'}`}>
                {nav}
                {topNav}
                {sideNav}
                <main onScroll={handleScroll} className={mainContentClasses}>
                    <div className='app-loader'>
                        <i className='icofont-spinner-alt-4 rotate' />
                    </div>
                    <div className={mainContentWrapClasses}>
                        {currentRoute === 'admin' && pageData && !!pageData.title && (
                            <header className='page-header'>
                                <div className='mb-3'>
                                    <h1 className='page-title mb-0'>{pageData.title}</h1>
                                    {pageData.subTitle && <p className='text-900'>{pageData.subTitle}</p>}
                                </div>
                            </header>
                        )}
                        {children}
                    </div>
                </main>
                <Footer routerView={currentRoute} breadcrumbs={pageData.breadcrumbs} layout={settings.layout} boxed={settings.boxed} loaded={pageData.loaded} openModal={toggleSettings} />
                {contentOverlay}
            </div>
        </div>
    );
};

export default BaseLayout;
