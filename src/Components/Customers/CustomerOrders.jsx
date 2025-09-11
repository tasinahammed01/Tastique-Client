import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

const CustomerOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const serverBaseUrl = useMemo(() => "http://localhost:5000", []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          `${serverBaseUrl}/orders/user/${user.id}`
        );
        setOrders(res.data || []);
      } catch (e) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [serverBaseUrl, user?.id]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <p className="mt-4 text-red-600">{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <p className="mt-4">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div key={order._id || order.orderId || idx} className="border rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Order ID:</span> {order.orderId}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border">
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Placed:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Product ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 text-sm text-gray-700">{item.productId || "—"}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">${item.price}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Ship to:</span> {order.address}
              </div>
              <div className="text-lg font-bold">Total: ${order.totalAmount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;