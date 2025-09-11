import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const statusStyles = {
  pending: "border-yellow-500 text-yellow-700",
  shipped: "border-blue-500 text-blue-700",
  delivered: "border-green-500 text-green-700",
  cancelled: "border-red-500 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from both orders endpoint and users endpoint
  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      
      // Fetch orders from the orders endpoint (single source of truth)
      const ordersRes = await axios.get("http://localhost:5000/orders");
      const allOrders = ordersRes.data;

      // Attach userName for each order
      const ordersWithUserInfo = await Promise.all(
        allOrders.map(async (order) => {
          if (order.userName) {
            return order; // Already has userName from old structure
          }
          
          try {
            const userRes = await axios.get(`http://localhost:5000/users/${order.userId}`);
            return {
              ...order,
              userName: userRes.data.name,
            };
          } catch (err) {
            console.error(`Failed to fetch user info for order ${order.orderId}:`, err);
            return {
              ...order,
              userName: "Unknown User",
            };
          }
        })
      );

      console.log("Final orders with user info:", ordersWithUserInfo);
      
      // Debug: Log each order individually
      ordersWithUserInfo.forEach((order, index) => {
        console.log(`Order ${index}:`, {
          userName: order.userName,
          items: order.items,
          totalAmount: order.totalAmount,
          status: order.status,
          address: order.address
        });
      });
      
      setOrders(ordersWithUserInfo);
    } catch (err) {
      console.error("Error fetching orders:", err);
      Swal.fire("Error", "Failed to fetch orders", "error");
    }
  };

  // Delete order
  const handleDelete = async (_userId, orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      
      Swal.fire("Deleted!", "Order has been deleted.", "success");
      fetchOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  // Update order status
  const handleStatusChange = async (_userId, orderId, newStatus) => {
    try {
      console.log("Updating order:", { orderId, newStatus });
      
      await axios.put(`http://localhost:5000/orders/${orderId}`, { status: newStatus });

      Swal.fire("Updated!", "Order status updated.", "success");
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center underline decoration-gray-400">
        Manage Orders
      </h2>
      
      
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="p-3 border-r text-left font-semibold italic">
                User Name
              </th>
              <th className="p-3 border-r text-left font-semibold italic">
                Items (Product ID • Name • Price • Qty)
              </th>
              <th className="p-3 border-r text-left font-semibold italic">
                Total Amount
              </th>
              <th className="p-3 border-r text-left font-semibold italic">
                Status
              </th>
              <th className="p-3 border-r text-left font-semibold italic">
                Address
              </th>
              <th className="p-3 border-r text-left font-semibold italic">
                Created At
              </th>
              <th className="p-3 text-left font-semibold italic">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.orderId || order._id || index} // ✅ fallback key
                className="border-b hover:shadow-sm transition"
              >
                <td className="p-3 font-medium border-r">{order.userName}</td>
                <td className="p-3 border-r">
                  {order.items?.map((item, i) => (
                    <div key={i} className="mb-1">
                      <div className="text-sm">
                        <span className="text-gray-600">{item.productId || "—"}</span>
                        {" • "}
                        <span className="font-semibold">{item.name}</span>
                        {" • $"}
                        {item.price}
                        {" • Qty: "}
                        {item.quantity}
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-3 font-semibold border-r">
                  ${order.totalAmount}
                </td>
                <td className="p-3 border-r">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                        statusStyles[order.status] ||
                        "border-gray-400 text-gray-600"
                      }`} // ✅ fallback style
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : "Unknown"}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.userId,
                          order.orderId,
                          e.target.value,
                          order.orderIndex
                        )
                      }
                      className="ml-2 p-1 border rounded text-sm cursor-pointer bg-neutral"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
                <td className="p-3 border-r">{order.address}</td>
                <td className="p-3 border-r">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "—"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(order.userId, order.orderId)}
                    className="px-4 py-2 rounded border cursor-pointer hover:shadow-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
