import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./Routes/Routes.jsx";
import { CartProvider } from "./Provider/CartContext.jsx";
import AuthProvider from "./Provider/AuthContext.jsx";

createRoot(document.getElementById("root")).render(


  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
