import { IRoute } from '../interfaces/routing';
import NotFound from '../pages/sessions/404';
import InternalError from '../pages/sessions/500';
import AdminSign from '../pages/sessions/AdminSign-in';
import ClientSignUp from '../pages/sessions/Client-Sign-up';
import ConsultantSign from '../pages/sessions/ConsultantSign-in';
import SignIn from '../pages/sessions/Sign-in';
import SignUp from '../pages/sessions/ConsultantSign-up';
import ForgetPasswordPage from '../pages/sessions/Client/ForgetPasswordPage';
import ResetPasswordPage from '../pages/sessions/Client/ResetPasswordPage';
import ForgetPasswordPage2 from '../pages/sessions/Consultant/ForgetPasswordPage';
import ResetPasswordPage2 from '../pages/sessions/Consultant/ResetPasswordPage';
import ForgetPasswordPage3 from '../pages/sessions/Admin/ForgetPasswordPage';
import ResetPasswordPage3 from '../pages/sessions/Admin/ResetPasswordPage';

import ClientSignInn from '../pages/sessions/ClientSignInn';

export const sessionRoutes: IRoute[] = [
    {
        path: 'page-404',
        component: NotFound
    },
    {
        path: 'page-500',
        component: InternalError
    },
    {
        path: 'sign-in',
        component: SignIn
    },
    {
        path: 'admin/sign-in',
        component: AdminSign
    },
    {
        path: 'admin/forget-password',
        component: ForgetPasswordPage3
    },
    {
        path: 'admin/verify/:reset_password_token/:email',
        component: ResetPasswordPage3
    },
    {
        path: 'client/sign-up',
        component: ClientSignUp
    },
    {
        path: 'client/sign-in',
        component: ClientSignInn
    },
    {
        path: 'client/forget-password',
        component: ForgetPasswordPage
    },
    {
        path: 'client/verify/:reset_password_token/:email',
        component: ResetPasswordPage
    },


    {
        path: 'sign-up',
        component: SignUp
    },
    {
        path: 'consultant/sign-in',
        component: ConsultantSign
    },
    {
        path: 'consultant/sign-up',
        component: SignUp
    },
    {
        path: 'consultant/forget-password',
        component: ForgetPasswordPage2
    },
    {
        path: 'consultant/verify/:reset_password_token/:email',
        component: ResetPasswordPage2
    }
];
