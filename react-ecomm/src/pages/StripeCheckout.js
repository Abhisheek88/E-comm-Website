import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const data = process.env.REACT_APP_PUBLIC_KEY;
const stripePromise = loadStripe(`${data}`);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({  totalAmount: currentOrder.totalAmount, orderId:currentOrder.id }),
      headers: { "content-type": "application/json" },
      credentials: "include",
    
    })
      .then((res) => res.json()
        )
      .then((data) => {
         
        setClientSecret(data.clientSecret)
           
      });
  }, []);






  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}








