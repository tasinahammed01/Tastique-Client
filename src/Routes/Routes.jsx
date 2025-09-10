import { createBrowserRouter } from "react-router";
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
import Dashboard from "../SharedComponents/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/reservation",
        element: <Reservation></Reservation>,
      },
      {
        path: "/menu/:id",
        element: <SingleMenu></SingleMenu>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog></SingleBlog>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut></CheckOut>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          
        ],
      },
    ],
  },
]);

export default routes;
