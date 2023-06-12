import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CheckoutPayment = ({selectedClass , _id}) => {
    const {price}=selectedClass
    console.log(price);

    const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Payment Method:", paymentMethod);
      // Handle the successful payment

      axios.put(`http://localhost:5000/payment/${_id}`,{enroll:'enrolled'})
        .then((response) => {
          console.log("Payment Success:", response.data);
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Payment Successful',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/student/dashboard')
          // Handle the successful payment
        })
        .catch((error) => {
          console.log("Payment Error:", error);
          alert('Wrong information')
        });
    
    }

    setLoading(false);
  };
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700 font-bold mb-2">
          Card Details
        </label>
        <CardElement id="card-element" options={{}} className="border border-gray-300 rounded-md p-2" />
      </div>
      <div className="flex justify-between">
        <div className="text-lg font-bold">${price}</div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn"
        >
          Pay
        </button>
      </div>
    </form>
        </div>
    );
};

export default CheckoutPayment;