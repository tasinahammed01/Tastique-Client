import React from "react";
import { useCart } from "../Provider/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const CheckOut = () => {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Order placed successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
    clearCart(); // clear cart after placing order
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

          {/* See All Foods Button */}
          <div className="mt-6">
            <Link to="/cart">
              <motion.button
                className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-15 py-3  rounded-full font-medium transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                See All Foods
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="p-6 rounded-2xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Shipping Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            <h4 className="text-lg font-semibold mt-6">Payment Info</h4>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold mt-6 border hover:shadow-md transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
