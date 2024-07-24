import { NavLink } from 'react-router-dom';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { Lotus } from './../../../assets/img/index';
import { resetClientTokenData } from '../../../redux/client/actions';
import { useTranslation } from 'react-i18next';

const SettingDropdownClient = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accountConsultantItems = [
        { text: 'home', icon: 'icofont-ui-home', route: '/' },
        { text: 'change-password', icon: 'icofont-ui-settings', route: 'change-password' },
        { text: 'log-out', icon: 'icofont-logout', route: '/', onclick: () => dispatch(resetClientTokenData()) }
    ];

    const accountMenu = () => <ul className='actions-menu' style={{ minWidth: '180px' }}>
        {accountConsultantItems.map((item, index) => (
            <li className='action-item' key={index}>
                <NavLink onClick={item?.onclick} className='d-flex w-100' to={item.route}>
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

export default SettingDropdownClient;
