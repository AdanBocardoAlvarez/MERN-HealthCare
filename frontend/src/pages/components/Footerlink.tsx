import { Link } from 'react-router-dom';
import { MailOutlined, LinkedinFilled, InstagramFilled, GlobalOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Twitter from '../../assets/img/twitter-x.png'
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const Footerlink = ({ items }) => {
    const { t } = useTranslation();
    return <ul className='menu-footer ps-2'>
        {items?.map(({ id, link, translateKey, outsideURL = false }) => (
            <li key={id}> {outsideURL ? <a href={link} target='_blank' rel="noopener noreferrer">{t(translateKey)}</a> : <NavLink to={link}>{t(translateKey)}</NavLink>}</li>
        ))}
    </ul>
};

const FooterLinksBottom = () => {

    const webSettings = useSelector((state: AppState) => state.webSettings);

    return (
        <div className='follow text-center'>
            <ul className='social-icon'>
                <li>
                    <Link to='/'>
                        <GlobalOutlined className='social_icon_style' />
                        <span>Etherna Global OÜ</span>
                    </Link>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={`tel:+33674259234`}>Call +33674259234</a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href='mailto:ingrid@vhealthy.fr'>
                        <MailOutlined className='social_icon_style ' />
                        ingrid@vhealthy.fr
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={webSettings.web_tw}>
                        <img src={Twitter} alt="" width={16} className='mb-2' />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={webSettings.web_linkedin}>
                        <LinkedinFilled className='social_icon_style' />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={webSettings.web_insta}>
                        <InstagramFilled className='social_icon_style' />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footerlink;
export { FooterLinksBottom };
