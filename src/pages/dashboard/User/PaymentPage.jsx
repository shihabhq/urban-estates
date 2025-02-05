import React from "react";
import Heading from "../../../shared/Heading";
import { useLocation } from "react-router";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const PaymentPage = () => {
  const { state } = useLocation();

  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

  return (
    <div>
      <Heading largeHead={"Payment"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm state={state} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
