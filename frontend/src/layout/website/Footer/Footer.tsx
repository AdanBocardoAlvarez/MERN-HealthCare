import { useTranslation } from 'react-i18next';
import Footerlink, { FooterLinksBottom } from '../../../pages/components/Footerlink';
import { FooterLinksSpeciality, Objectives, FooterLinksTherapy } from '../../../utils/main-page-utils';
import SubForm from './SubForm';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {

    const { t } = useTranslation();
    return (
        <footer className='footers'>
            <div className='container-lg'>
                <div className='row justify-content-between'>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>{t('footer.frequent-research')}</div>
                            <Footerlink items={FooterLinksTherapy} />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>{t('footer.experts-specialities')}</div>
                            <Footerlink items={FooterLinksSpeciality} />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>{t('footer.objectives')}</div>
                            <Footerlink items={Objectives} />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>{t('footer.links')}</div>
                            <ul className='menu-footer ps-2'>
                                <li><NavLink to="/about-us">{t('footer-keys.about')}</NavLink></li>
                                <li><NavLink to="/">{t('footer-keys.faq')}</NavLink></li>
                                <li><Link target='_blank' rel="noopener noreferrer" to={`${process.env.PUBLIC_URL}${t('footer.terms-doc')}`} >{t('footer-keys.terms')}</Link></li>
                                <li><Link target='_blank' rel="noopener noreferrer" to={`${process.env.PUBLIC_URL}${t('footer.privacy-doc')}`} >{t('footer-keys.privacy')}</Link></li>
                                <li><NavLink to="/sdg-media">{t('footer-keys.media')}</NavLink></li>
                                <li><NavLink to="/about-us">{t('footer-keys.team-vision')}</NavLink></li>
                                <li><NavLink to="/contact-us">{t('footer-keys.contact-us')}</NavLink></li>
                            </ul>
                        </div>

                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <Link target='_blank' rel="noopener noreferrer" to="https://lavhealthy.com">
                                <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>
                                    {t('footer.blog')}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='footer-heading text-left'>
                            <div className='text-uppercase footer-heading_h2' style={{ fontSize: '16px' }}>{t('footer.newsletter')}</div>
                            <SubForm />
                        </div>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <FooterLinksBottom />
                        </div>
                        <div className="col-12 mt-3">
                            <p className='my-1 py-1 fs--1'>{t('footer.privacy-policy-1')}</p>
                            <p className='my-1 py-1 fs--1'>{t('footer.privacy-policy-2')}</p>
                        </div>
                        <div className='col-xl-12'>
                            <p>© {new Date().getFullYear()} {t('footer.rights-reserved-with')} {t('vhealthy')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
