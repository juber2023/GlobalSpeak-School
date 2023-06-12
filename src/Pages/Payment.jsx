import { Elements } from "@stripe/react-stripe-js";
import CheckoutPayment from "./CheckoutPayment";
import { useLoaderData, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_pk_stripe);
const Payment = () => {
    const selectedClass=useLoaderData()
    const {_id}=selectedClass
    console.log(_id);

    return (
        <div >
            <div>
            <Elements stripe={stripePromise}>
            <CheckoutPayment selectedClass={selectedClass} _id={_id}></CheckoutPayment>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;