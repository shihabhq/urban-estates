import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AuthContext from "../../../../contexts/AuthContexts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CheckoutForm = ({ state }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const { image, title, amount, id, location } = state;

  useEffect(() => {
    axiosSecure.post("/payment-intent", { price: state.amount }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    //confirm payment
    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymouns",
            name: user?.displayName || "anonymouns",
          },
        },
      }
    );

    if (cardError) {
      console.log(cardError);
    } else {
      if (paymentIntent.status === "succeeded") {
        const res = await axiosSecure.patch(`/offer-payment/${id}`, {
          status: "bought",
          paymentId: paymentIntent.id,
        });
        if (res.status === 200) {
          toast.success("paid Successfully");
          navigate("/dashboard/bought");
        } else {
          toast.error("Unsuccessful payment unfortunately");
        }
      }
    }
  };

  return (
    <div className="payment-page mx-auto p-4 max-w-xl">
      {Object.keys(state).length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <div className="mb-4">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={image}
              alt={title}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{location}</p>
            <p className="text-lg font-bold mt-2">Amount to Pay: ${amount}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-2">Card Payment</h3>
            <CardElement className="p-2 border rounded-md mb-4" />

            {/* Pay button should always be visible but disabled if Stripe or clientSecret isn't available */}
            <button
              type="submit"
              disabled={!stripe || !clientSecret}
              className="w-full bg-inherit border border-btncol text-base font-bold text-btncol py-2 rounded-md hover:bg-btncol transition hover:text-white">
              Pay ${amount}
            </button>
          </form>

          <p className="text-sm text-red-500 font-medium">{error}</p>
        </>
      ) : (
        <p className="text-red-500">No payment details available.</p>
      )}
    </div>
  );
};

export default CheckoutForm;
