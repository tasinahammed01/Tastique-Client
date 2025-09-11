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
      
      // Fetch orders from the new orders endpoint
      const ordersRes = await axios.get("http://localhost:5000/orders");
      const newOrders = ordersRes.data;
      console.log("New orders:", newOrders);

      // Fetch users to get orders from the old structure
      const usersRes = await axios.get("http://localhost:5000/users");
      const users = usersRes.data;
      console.log("Users data:", users);

      // Extract orders from users (old structure)
      const oldOrders = [];
      users.forEach((user) => {
        if (user.orders) {
          // Handle both array and object formats
          const ordersArray = Array.isArray(user.orders) ? user.orders : [user.orders];
          
          ordersArray.forEach((order, index) => {
            // Only process if order has meaningful data (not empty object)
            if (order && (order.items || order.totalAmount || order.status)) {
              oldOrders.push({
                ...order,
                userId: user._id,
                userName: user.name,
                orderIndex: index, // Add index for deletion
              });
            }
          });
        }
      });
      console.log("Old orders:", oldOrders);

      // Combine both old and new orders
      const allOrders = [...oldOrders, ...newOrders];
      console.log("All orders combined:", allOrders);

      // Get user information for new orders that don't have userName
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
  const handleDelete = async (userId, orderId, orderIndex) => {
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
      // Check if this is an old order (no orderId) or new order (has orderId)
      if (!orderId) {
        // This is an old order stored within user document
        // We need to remove it from the user's orders array using the index
        const userRes = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = userRes.data;
        
        // Remove the order at the specified index
        const updatedOrders = user.orders.filter((order, index) => index !== orderIndex);
        
        await axios.put(`http://localhost:5000/users/${userId}`, {
          orders: updatedOrders
        });
      } else {
        // This is a new order stored as separate document
        await axios.delete(
          `http://localhost:5000/orders/delete/${userId}/${orderId}`
        );
      }
      
      Swal.fire("Deleted!", "Order has been deleted.", "success");
      fetchOrders();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  // Update order status
  const handleStatusChange = async (userId, orderId, newStatus, orderIndex) => {
    try {
      console.log("Updating order:", { userId, orderId, newStatus, orderIndex });
      
      // Check if this is an old order (no orderId) or new order (has orderId)
      if (!orderId) {
        console.log("Updating legacy order (stored in user document)");
        // This is an old order stored within user document
        // We need to update it in the user's orders array
        const userRes = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = userRes.data;
        
        console.log("Current user orders:", user.orders);
        
        // Update only the specific order in the user's orders array
        const updatedOrders = user.orders.map((order, index) => 
          index === orderIndex 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        );
        
        console.log("Updated orders:", updatedOrders);
        
        await axios.put(`http://localhost:5000/users/${userId}`, {
          orders: updatedOrders
        });
      } else {
        console.log("Updating new order (separate document)");
        // This is a new order stored as separate document
        await axios.put(
          `http://localhost:5000/orders/update/${userId}/${orderId}`,
          { status: newStatus }
        );
      }

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
                Items
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
                  {order.items?.map(
                    (
                      item,
                      i // ✅ safe mapping
                    ) => (
                      <div key={i} className="mb-1">
                        <span className="font-semibold">{item.name}</span> ×{" "}
                        {item.quantity} (${item.price})
                      </div>
                    )
                  )}
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
                    onClick={() => handleDelete(order.userId, order.orderId, order.orderIndex)}
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
