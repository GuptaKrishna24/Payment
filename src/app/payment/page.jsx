"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51LaHT0A6u1us1yHEmObdTnNDgyg3XGMfLMtzFhaOo2jSwkm7XyMLqV7x4EHldsaxPdEnVR46coj4gAqIkvvfisFw00wQgijTp6");

function PaymentPage() {
  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const session = await response.json();

    // Redirect to the Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>Pay with Stripe</button>
    </div>
  );
}

export default PaymentPage;
