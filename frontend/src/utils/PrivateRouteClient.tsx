import { Navigate, useLocation } from 'react-router-dom';
import store from '../redux/store';

const PrivateRoutesClient = ({ children }) => {
    const TokenClient = store.getState().client;
    const location = useLocation();

    let check = false;
    if (TokenClient.Token !== '' && TokenClient.status) { check = true; }

    if (!check) { localStorage.setItem('redirectUrl', location.pathname); }

    return check ? children : <Navigate to='/public/client/sign-in' />;
};

export default PrivateRoutesClient;
