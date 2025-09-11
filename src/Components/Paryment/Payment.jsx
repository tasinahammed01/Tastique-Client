import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckOut from "../../Pages/CheckOut";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);

  const serverBaseUrl = "http://localhost:5000";

  useEffect(() => {
    const envKey =
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
      import.meta.env.VITE_STRIPE_KEY;

    if (envKey && typeof envKey === "string") {
      setStripePromise(loadStripe(envKey));
      return;
    }

    if (!serverBaseUrl) return;

    // Fallback: fetch from backend config
    fetch(`${serverBaseUrl}/stripe/config`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        }
      })
      .catch(() => {
        // Swallow; UI will render without Stripe until key provided
      });
  }, [serverBaseUrl]);

  if (!stripePromise) {
    return <div>Loading payment...</div>;
  }

  // Provide appearance theme to help with dark mode rendering in Stripe elements
  const appearance = { theme: "stripe" };

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <CheckOut />
    </Elements>
  );
};

export default Payment;
