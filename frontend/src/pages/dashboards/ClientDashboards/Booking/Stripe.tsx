import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { ClientApi } from "../../../../api/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppState } from "../../../../redux/store";
import { openNotificationWithIcon } from "../../../components/Toast";
import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type IErrors = {
    card: boolean | string,
    cvc: boolean | string,
    expiry: boolean | string
}

const options = {
    style: {
        base: {
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#9e2146'
        }
    }
};


const Stripe = ({ decodedData, client, setClient, setPaymentStatus, setIsLoading }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { t } = useTranslation();

    const authToken = useSelector((state: AppState) => state.client.Token);
    const [errors, setErrors] = useState<IErrors>({ card: false, cvc: false, expiry: false });

    const getClientSecret = async () => {
        let res = await ClientApi.simplePost(decodedData, `create-payment-intent`, authToken)
        setClient(res);
        return res?.clientSecret;
    }

    const SubmitData = async (e) => {
        try {
            e.preventDefault();

            let checkError = false;
            for (const [key, value] of Object.entries(errors))
                if (value === false || value) {
                    setErrors(prev => ({ ...prev, [key]: value || `Please enter ${key}.` }));
                    checkError = true;
                }

            if (checkError) { return false; }

            if (!stripe || !elements) { return false; }

            // Trigger form validation and wallet collection
            const { error: submitError } = await elements.submit();
            if (submitError) {
                openNotificationWithIcon({ type: 'error', message: `Error :: ${submitError.message}` });
                return false;
            }

            setIsLoading(true);
            let clientSecretCode = client?.clientSecret;
            if (!clientSecretCode) { clientSecretCode = await getClientSecret(); }

            if (!clientSecretCode) {
                setIsLoading(false);
                openNotificationWithIcon({ type: 'error', message: `Something Went Wrong..!!` });
            }

            const result = await stripe.confirmCardPayment(clientSecretCode, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        email: client?.clientEmail,
                        name: client?.clientName,
                    },
                }
            });

            if (result.error) {
                if (result.error?.type !== 'validation_error') {
                    await ClientApi.simplePut(result.error?.payment_intent, `update-payment-intent`, authToken)
                }

                openNotificationWithIcon({ type: 'error', message: result.error?.message });
                setIsLoading(false);
                return false;
            }

            let res = await ClientApi.simplePut(result.paymentIntent, `update-payment-intent`, authToken)
            setPaymentStatus(res.status ? 1 : 2);
            openNotificationWithIcon({ type: res.status ? 'success' : 'error', message: res.message });
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            openNotificationWithIcon({ type: 'error', message: error.response?.data?.message || error.message || `Something Went Wrong..!!` });
        }
    }

    return (
        <div className="card">
            <div className="card-body bg-white h-100">
                <h4 className="text-center my-2">{t('payment.book-appointment')}</h4>
                <form onSubmit={SubmitData}>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label className='text-md mb-0 ms-2'>{t('payment.card-number')}</label>
                            <CardNumberElement onChange={(e) => {
                                setErrors(prev => ({ ...prev, card: e.error?.code ? e.error.message : null }))
                            }} options={{ ...options, showIcon: true }} className='p-3 m-1 rounded text-base cardborder' id='cardborder' />
                            {errors?.card && <span className="text-danger">{errors?.card}</span>}
                        </div>
                        <div className="col-6 mb-2">
                            <label className='text-md mb-0 ms-2'>{t('payment.expiration')}</label>
                            <CardExpiryElement options={{ ...options }} onChange={(e) => {
                                setErrors(prev => ({ ...prev, expiry: e.error?.code ? e.error.message : null }))
                            }} className='p-3 m-1 rounded text-base cardborder' id='cardborder' />
                            {errors?.expiry && <span className="text-danger">{errors?.expiry}</span>}
                        </div>
                        <div className="col-6 mb-2">
                            <label className='text-md mb-0 ms-2'>CVC</label>
                            <div className="position-relative">
                                <CardCvcElement options={{ ...options }} onChange={(e) => {
                                    setErrors(prev => ({ ...prev, cvc: e.error?.code ? e.error.message : null }))
                                }} className='p-3 m-1 rounded text-base cardborder' id='cardborder' />
                                <LockOutlined className="position-absolute fs-4" style={{ top: 12, right: 20 }} />
                            </div>
                            {errors?.cvc && <span className="text-danger">{errors?.cvc}</span>}
                        </div>
                        <div className="col-12 mt-3 mb-2 text-center">
                            <button className='btn btn-dark btn-lg px-5' id='submit' disabled={!stripe || !elements} >{t('payment.pay-now')}</button>
                            <Link className='btn btn-link btn-lg px-5' to="/our-experts">{t('go-back')}</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Stripe