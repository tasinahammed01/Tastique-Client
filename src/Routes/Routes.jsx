import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/HomePage";
import Blogs from "../Pages/Blogs";
import SingleBlog from "../Pages/SingleBlog";

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
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog></SingleBlog>,
      },
    ],
  },
]);

export default routes;
