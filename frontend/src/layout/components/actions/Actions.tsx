import './Actions.scss';
import SettingsDropdown from './SettingsDropdown';
import SettingDropdownConsultant from './SettingDropdownConsultant';
import SettingDropdownClient from './SettingDropdownClient';
import { useLocation } from 'react-router-dom';
import ToggleLang from '../logo/ToggleLang';

const Actions = () => {

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
        <div className='actions'>
            <ToggleLang />
            {currentRoute === 'admin' && <SettingsDropdown />}
            {currentRoute === 'consultant' && <SettingDropdownConsultant />}
            {currentRoute === 'client' && <SettingDropdownClient />}
        </div>
    );
};

export default Actions;
