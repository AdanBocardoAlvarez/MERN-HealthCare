import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/store';
import { useEffect } from 'react';
import { AuthBg } from '../../assets/img/index';
import { useSelector } from 'react-redux';
import WebLogo from '../../layout/components/logo/WebLogo';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
    const ClientToken = useSelector((state: AppState) => state.client.Token);
    const ConsultantToken = useSelector((state: AppState) => state.consultant.Token);
    const AdminToken = useSelector((state: AppState) => state.admin.Token);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (AdminToken) {
            navigate('/admin/dashboard');
        } else if (ConsultantToken) {
            navigate('/consultant/dashboard');
        } else if (ClientToken) {
            navigate('/client/dashboard');
        }
    }, [AdminToken, ConsultantToken, ClientToken, navigate]);

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-7 vh-100">
                    <div className="row justify-content-center align-items-center- h-100">
                        <div className="col-lg-8">
                            <div className="w-100">
                                <div className='my-5'><WebLogo /></div>
                                <h1 className='h4 mt-0 mb-2 text-color-900'>{t('auth.login')}</h1>
                                <p className='text-color-200 my-2'>{t('auth.login-to-access-your-account')}</p>
                                <div className='w-100 mb-3 mt-5'>
                                    <Link className='btn auth-page-btn gradent-border' to='/public/consultant/sign-in' aria-label='Login As Consultant'>
                                        {t('auth.login-as-consultant')}
                                    </Link>
                                </div>
                                <div className='w-100'>
                                    <Link className='btn auth-page-btn gradent-border' to='/public/client/sign-in' aria-label='Login As User'>
                                        {t('auth.login-as-user')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 vh-100 d-none d-lg-block">
                    <img className='w-100 h-100' src={AuthBg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
