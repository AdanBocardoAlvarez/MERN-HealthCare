import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "EUR"
};

const PaypalWrapper = ({ children }) => process.env.REACT_APP_PAYMENT_GATEWAY_PAYPAL === 'true' ? <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider> : null;
export default PaypalWrapper;