import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./Routes/Routes.jsx";
import { CartProvider } from "./Provider/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={routes}></RouterProvider>
    </CartProvider>
  </StrictMode>
);
