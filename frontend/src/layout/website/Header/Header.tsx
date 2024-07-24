import './menu.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons/lib';
import WebLogo from '../../components/logo/WebLogo';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../../components/logo/ToggleLang';
const Header = () => {

    const ClientToken = useSelector((state: AppState) => state.client.Token);
    const consultantToken = useSelector((state: AppState) => state.consultant.Token);
    const adminToken = useSelector((state: AppState) => state.admin.Token);

    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [showShadow, setshowShadow] = useState(false)

    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            setshowShadow(true)
        } else {
            setshowShadow(false)
        }
    };

    return (
        <>
            <nav className={`navbar fixed-top navbar-expand-lg bg-body-tertiary ${showShadow ? 'nav-shadow' : ''}`}>
                <div className="container align-items-center align-items-lg-end">
                    <WebLogo className='navbar-brand' showLang={false} />
                    <button className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
                        onClick={() => {
                            setIsChanging(true);
                            setTimeout(() => {
                                setIsChanging(false)
                                setIsOpen(!isOpen);
                            }, 100);
                        }}
                        style={{ borderColor: '#666262e5' }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        aria-controls="navbar"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation">
                        <span className="fs-3"><MenuUnfoldOutlined /></span>
                    </button>
                    <div className={`navbar-collapse ${isChanging ? 'collapsing' : 'collapse'} ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-3 mb-lg-0 gap-0 gap-lg-2">
                            <li className='nav-item mb-0 mb-lg-2'>
                                <Link className='fw-bold nav-link navlink' to='/about-us'>{t("header.about-us")}</Link>
                            </li>
                            <li className='nav-item mb-0 mb-lg-2'>
                                <Link className='fw-bold nav-link navlink' to='/our-experts'>{t('header.our-experts')}</Link>
                            </li>
                            <li className='nav-item mb-0 mb-lg-2'>
                                <Link className='fw-bold nav-link navlink' to='/alternative-medicine'>{t('header.alternative-medicine')}</Link>
                            </li>
                            <li className='nav-item mb-0 mb-lg-2'>
                                <Link className='fw-bold nav-link navlink' to='/sdg-media'>{t('header.sdg-media')}</Link>
                            </li>
                            <li className='nav-item mb-0 mb-lg-2'>
                                <Link className='fw-bold nav-link navlink' to='/lifestyle-product'>{t('header.lifestyle-product')}</Link>
                            </li>
                            <li className='nav-item mb-0 mb-lg-2'>
                                <div className='d-flex gap-3'>
                                    {ClientToken && <Link to='/client/dashboard' className='ms-3 px-1 nav-link login-btn-header login-header-btn'>{t('header.profile')} </Link>}
                                    {consultantToken && <Link to='/consultant/dashboard' className='ms-3 px-1 nav-link login-btn-header login-header-btn'>{t('header.profile')} </Link>}
                                    {adminToken && <Link to='/admin/dashboard' className='ms-3 px-1 nav-link login-btn-header login-header-btn'>{t('header.profile')} </Link>}
                                    {!ClientToken && !consultantToken && !adminToken && <Link to='/public/sign-in' className='nav-link  login-btn-header-web login-header-btn navbar-nav'><UserOutlined /></Link>}

                                    <ToggleLang />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ marginBottom: 100 }}></div>
        </>
    );
};

export default Header;
