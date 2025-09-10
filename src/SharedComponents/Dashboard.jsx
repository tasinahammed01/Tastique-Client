import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-neutral">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

      {/* Show admin panel if user is admin */}
      {user.role === "admin" ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin/manage-users"
                className="text-blue-500 hover:underline"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-orders"
                className="text-blue-500 hover:underline"
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-menu"
                className="text-blue-500 hover:underline"
              >
                Manage Menu Items
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        // Customer dashboard
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customer Dashboard</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard/orders"
                className="text-blue-500 hover:underline"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/cart"
                className="text-blue-500 hover:underline"
              >
                My Cart
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="text-blue-500 hover:underline"
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
