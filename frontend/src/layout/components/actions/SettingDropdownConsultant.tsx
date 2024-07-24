import { NavLink } from 'react-router-dom';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { resetConstultantTokenData } from '../../../redux/consultant-token/actions';
import { Lotus } from './../../../assets/img/index';
import { useTranslation } from 'react-i18next';

const SettingsDropdown = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accountConsultantItems = [
        { text: 'home', icon: 'icofont-ui-home', route: '/' },
        { text: 'change-password', icon: 'icofont-ui-settings', route: 'change-password' },
        { text: 'log-out', icon: 'icofont-logout', route: '/', onclick: () => dispatch(resetConstultantTokenData()) }
    ];

    const accountMenu = () => <ul className='actions-menu' style={{ minWidth: '180px' }}>
        {accountConsultantItems.map((item, index) => (
            <li className='action-item' key={index}>
                <NavLink onClick={item?.onclick} className='d-flex w-100' to={item.route} replace>
                    <span className={`icon mr-3 ${item.icon}`} />
                    <span className='text'>{t(item.text)}</span>
                </NavLink>
            </li>
        ))}
    </ul>

    return (
        <Dropdown dropdownRender={accountMenu} trigger={['click']} placement='bottomRight'>
            <div className='item'>
                <img className='mr-1' src={Lotus} style={{ width: '80px', objectFit: 'contain' }} alt='avatarImage' />
                <span className='icofont-simple-down' />
            </div>
        </Dropdown>
    );
};

export default SettingsDropdown;
