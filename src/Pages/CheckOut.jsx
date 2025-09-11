import React, { useContext, useMemo, useState } from "react";
import { useCart } from "../Provider/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../Provider/AuthContext";

const CheckOut = () => {
  const { cart, clearCart } = useCart();
  const { user } = useContext(AuthContext); // get logged-in user
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [address, setAddress] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const amountInCents = useMemo(() => Math.round(total * 100), [total]);
  const serverBaseUrl = "http://localhost:5000";

  const isDarkMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const cardElementStyle = useMemo(
    () => ({
      base: {
        color: "#fbbf24",
        iconColor: isDarkMode ? "#F9FAFB" : "#111827",
        fontSize: "16px",
        fontFamily: "inherit",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: isDarkMode ? "#9CA3AF" : "#6B7280",
        },
        ":-webkit-autofill": {
          color: isDarkMode ? "#F9FAFB" : "#111827",
        },
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    }),
    [isDarkMode]
  );

 

  const handleSeeAllFoods = (e) => {
    if (cart.length === 0) {
      e.preventDefault();
      Swal.fire({
        title: "Your cart is empty!",
        text: "Please add some items before proceeding.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Redirecting to menu...",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCardError("");

    if (!stripe || !elements) return;

    if (!address) {
      Swal.fire({ title: "Address required", icon: "warning" });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      setIsProcessing(true);

      // Create payment intent
      const paymentRes = await fetch(
        `${serverBaseUrl}/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountInCents, currency: "usd" }),
        }
      );
      const paymentData = await paymentRes.json();
      if (!paymentRes.ok || !paymentData.clientSecret) {
        throw new Error(
          paymentData.message || "Failed to create PaymentIntent"
        );
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        setCardError(error.message || "Payment failed");
        Swal.fire({
          title: "Payment failed",
          text: error.message,
          icon: "error",
        });
        return;
      }


      if (paymentIntent && paymentIntent.status === "succeeded") {
        const orderData = {
          userId: user?.id,
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
          address,
        };

        const orderRes = await fetch(`${serverBaseUrl}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const orderResult = await orderRes.json();
        if (!orderRes.ok) {
          throw new Error(orderResult.message || "Failed to create order");
        }

        Swal.fire({
          title: "Payment successful!",
          text: "Order created successfully",
          icon: "success",
        });
        clearCart();
        navigate("/dashboard/customer/orders");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment error";
      setCardError(message);
      Swal.fire({ title: "Error", text: message, icon: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="px-6 md:px-16 py-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10">Checkout</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart Summary */}
        <div className="md:col-span-2 p-6 rounded-2xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-6 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <Link to="/cart">
              <motion.button
                onClick={handleSeeAllFoods}
                className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-15 py-3 rounded-full font-medium transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Go to Cart
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="p-6 rounded-2xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold">Address</h4>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold">Payment Info</h4>
              <div className="p-3 border rounded-lg">
                <CardElement
                  options={{ hidePostalCode: true, style: cardElementStyle }}
                />
              </div>
              {cardError && (
                <p className="text-red-600 text-sm mt-2">{cardError}</p>
              )}
            </div>

            <button
              disabled={!stripe || isProcessing || cart.length === 0}
              type="submit"
              className="w-full py-3 rounded-lg cursor-pointer font-semibold mt-2 border hover:shadow-md transition disabled:opacity-60"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
