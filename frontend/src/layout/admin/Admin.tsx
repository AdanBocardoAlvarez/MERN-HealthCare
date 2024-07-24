import BaseLayout from '../base/BaseLayout';
import Navbar from '../components/navbar/Navbar';
import Actions from '../components/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/settings/actions';
import { IAppState } from '../../interfaces/app-state';
import menuData from '../../utils/admin-menu';
import MyMenu from '../components/my-menu/MyMenu';
import WebLogo from '../components/logo/WebLogo';

type Props = {
    children: any;
};

const AdminLayout = ({ children }: Props) => {

    const dispatch = useDispatch();
    const settings = useSelector((state: IAppState) => state.settings);

    const handleCloseMenu = () => dispatch(toggleSidebar());

    const nav = (
        <Navbar orientation='horizontal' color={settings.topbarColor} background={settings.topbarBg} boxed={settings.boxed} >
            <button className='no-style navbar-toggle d-lg-none' onClick={handleCloseMenu}>
                <span />
                <span />
                <span />
            </button>

            <WebLogo showLang={false} />
            <Actions />
        </Navbar>
    );

    const additionalNav = (
        <Navbar minHeight={40} boxed={settings.boxed} color={settings.sidebarColor} background={settings.sidebarBg} opened={settings.sidebarOpened} onClickOutside={handleCloseMenu} orientation='horizontal-vertical' >
            <div className='navbar-mobile-header'>
                <WebLogo showLang={false} />
                <button onClick={handleCloseMenu} className='no-style navbar-close icofont-close-line d-lg-none ml-2' />
            </div>
            <MyMenu onCloseSidebar={handleCloseMenu} opened={settings.sidebarOpened} orientation='horizontal' routingview='admin' data={menuData} />
        </Navbar>
    );

    return <BaseLayout orientation='horizontal' nav={nav} topNav={additionalNav}>{children}</BaseLayout>
};

export default AdminLayout;
