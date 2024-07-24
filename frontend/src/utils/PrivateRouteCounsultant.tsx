import { Navigate } from 'react-router-dom';
import store from '../redux/store';

const PrivateRoutesCounsultant = ({ children }) => {
	const ConsultantToken = store.getState().consultant;
	return ConsultantToken.Token !== '' && ConsultantToken.status ? children : <Navigate to='/' />;
};

export default PrivateRoutesCounsultant;
