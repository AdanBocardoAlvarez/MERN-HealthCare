import ProdEnvironment from './prod.env';
import DevEnvironment from './dev.env';
import LocalEnvironment from './local.env';

export interface Environment {
    db_url: string,
    jwt_secret_admin: string,
    jwt_secret_consultant: string,
    jwt_secret_client: string,
    image_base_url: string,
    backend_admin_url: string,
    backend_base_url: string,
    front_base_url: string,
    SMS_API_URL: string
    PAYMENT_PUBLIC_KEY: string,
    PAYMENT_SECREAT_KEY: string,
    ZEGOCLOUD_APPID: number,
    ZEGOCLOUD_SERVERSECRET: string,
    API_KEY: string,
    PAYPAL_MODE: string,
    PAYPAL_CLIENT_ID: string,
    PAYPAL_CLIENT_SECRET: string,
}

export const getEnv = () => {
    if (process.env.NODE_ENV === 'production') {
        return ProdEnvironment;
    } if (process.env.NODE_ENV === 'local') {
        return LocalEnvironment;
    } else {
        return DevEnvironment;
    }
}
