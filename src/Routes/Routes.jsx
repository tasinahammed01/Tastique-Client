import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/HomePage";
import Blogs from "../Pages/Blogs";
import SingleBlog from "../Pages/SingleBlog";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import Gallery from "../Pages/Gallery";
import Menu from "../Pages/Menu";
import Reservation from "../Pages/Reservation";
import CheckOut from "../Pages/CheckOut";
import SingleMenu from "../Pages/SingleMenu";
import Cart from "../Pages/Cart";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

import ProtectedRoute from "./ProtectedRoute";

// --- Dashboard Pages ---
import Users from "../Components/AdminDashboard/Users";
import Orders from "../Components/AdminDashboard/Orders";
import Analytics from "../Components/AdminDashboard/Analytics";
import CustomerOrders from "../Components/Customers/CustomerOrders";
import CustomerProfile from "../Components/Customers/CustomerProfile";
import DashboardLayout from "../Layout/DashboardLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <Menu /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/menu/:id", element: <SingleMenu /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blogs/:id", element: <SingleBlog /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          // ✅ Admin Dashboard Routes
          { path: "admin/users", element: <Users /> },
          { path: "admin/orders", element: <Orders /> },
          { path: "admin/analytics", element: <Analytics /> },

          // ✅ Customer Dashboard Routes
          { path: "customer/orders", element: <CustomerOrders /> },
          { path: "customer/profile", element: <CustomerProfile /> },
        ],
      },
    ],
  },
]);

export default routes;
