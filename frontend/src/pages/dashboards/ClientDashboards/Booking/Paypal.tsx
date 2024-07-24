import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ClientApi } from "../../../../api/api";
import { openNotificationWithIcon } from "../../../components/Toast";
import { useEffect } from "react";

const Paypal = ({ decodedData, setPaymentStatus, client, setClient, setIsLoading }) => {

    const [{ isPending }] = usePayPalScriptReducer();
    const authToken = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        setIsLoading(isPending);
    }, [setIsLoading, isPending])


    const onCreateOrder = async (data, actions) => {
        try {
            let res = await ClientApi.simplePost(decodedData, `create-payment-intent-paypal`, authToken);
            if (res?.orderID) {
                return res.orderID;
            } else {
                throw new Error(res.message);
            }
        } catch (error: any) {
            setIsLoading(false);
            openNotificationWithIcon({ type: 'error', message: error.response?.data?.message || error.message || `Something Went Wrong..!!` });
        }
    }

    const onApproveOrder = async (data, actions) => {
        try {
            setIsLoading(true);
            let res = await ClientApi.simplePut(data, `update-payment-intent-paypal`, authToken);
            setPaymentStatus(res.status ? 1 : 2);
            openNotificationWithIcon({ type: res.status ? 'success' : 'error', message: res.message });
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            openNotificationWithIcon({ type: 'error', message: error.response?.data?.message || error.message || `Something Went Wrong..!!` });
        }
    }

    const onCancel = (data) => {
        setIsLoading(false);
        openNotificationWithIcon({ type: 'error', message: "Cancelleted by User." });
    }

    const onError = (data) => {
        setIsLoading(false);
        if (data.message !== 'Expected an order id to be passed') {
            openNotificationWithIcon({ type: 'error', message: data.message });
        }
    }

    return (
        <div className="card">
            <div className="card-body bg-white h-100">
                <div className="row">
                    <div className="col-12 mt-3">
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={onCreateOrder}
                            onApprove={onApproveOrder}
                            onCancel={onCancel}
                            onError={onError}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paypal