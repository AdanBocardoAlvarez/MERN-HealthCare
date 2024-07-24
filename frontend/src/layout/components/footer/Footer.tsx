import classNames from '../../../utils/class-names';
import { IBreadcrumb } from '../../../interfaces/page';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

type Props = {
    loaded?: boolean;
    boxed: boolean;
    layout: string;
    routerView: string;
    breadcrumbs: IBreadcrumb[];
    openModal: () => void;
};

const Footer = ({ boxed, loaded = false, layout, breadcrumbs, openModal, routerView }: Props) => {

    const { t } = useTranslation()
    let footerClasses = classNames({ loaded, boxed });

    return (
        <div className={`footer ${footerClasses}`}>
            <div className='footer-wrap'>
                <div className='row align-items-center' style={{ height: '100%' }}>
                    <div className='col-12 col-md-6 d-none d-md-block'>
                        <p className="mb-0 pb-0">{t('copyright-text', { year: new Date().getFullYear() })}</p>
                        {/* <Breadcrumbs layout={layout} routerView={routerView} breadcrumbs={breadcrumbs} /> */}
                    </div>
                    <div className='col-12 col-md-6 text-right'>
                        <div className='d-flex align-items-center justify-content-center justify-content-md-end'>
                            <span>{t('vhealthy')}</span>
                        </div>
                    </div>
                </div>

                <div className='footer-skeleton'>
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-6 d-none d-md-block'>
                            <ul className='page-breadcrumbs'>
                                <li className='item bg-1 animated-bg' />
                                <li className='item bg animated-bg' />
                            </ul>
                        </div>

                        <div className='col-12 col-md-6'>
                            <div className='info justify-content-center justify-content-md-end'>
                                <div className='version bg animated-bg' />
                                <div className='settings animated-bg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
