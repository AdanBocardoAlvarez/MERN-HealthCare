import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY);
const StripeWrapper = ({ children }) => process.env.REACT_APP_PAYMENT_GATEWAY_STRIPE === 'true' ? <Elements stripe={stripePromise}>{children}</Elements> : null;

export default StripeWrapper;